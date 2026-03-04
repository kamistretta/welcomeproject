#!/bin/bash
set -e

# Ensure database tables exist
mysql -u xc_app -pxc_password jones_county_xc <<'SQL'
CREATE TABLE IF NOT EXISTS paintings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    style VARCHAR(50) NOT NULL,
    medium VARCHAR(100),
    image_url VARCHAR(500) NOT NULL,
    size VARCHAR(50),
    price DECIMAL(10,2),
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS commission_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(20),
    style VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    special_requests TEXT,
    status VARCHAR(20) DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS reference_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    commission_id INT NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (commission_id) REFERENCES commission_requests(id)
);
SQL
echo "Database tables verified"

# Find the active Nginx config file
NGINX_CONF=""
for f in /etc/nginx/sites-available/default /etc/nginx/sites-enabled/default; do
    if [ -f "$f" ]; then
        NGINX_CONF="$f"
        break
    fi
done

if [ -z "$NGINX_CONF" ]; then
    echo "Warning: Could not find Nginx config file"
    exit 0
fi

# Add API proxy if not already configured
if ! sudo grep -q 'location /api' "$NGINX_CONF" 2>/dev/null; then
    sudo sed -i '/location \/ {/i\    location /api/ {\n        proxy_pass http://127.0.0.1:8080;\n        proxy_set_header Host $host;\n        proxy_set_header X-Real-IP $remote_addr;\n    }\n' "$NGINX_CONF"
    sudo nginx -t && sudo systemctl reload nginx
    echo "Nginx API proxy configured"
else
    echo "Nginx API proxy already configured"
fi
