CREATE TABLE paintings (
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

CREATE TABLE commission_requests (
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

CREATE TABLE reference_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    commission_id INT NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (commission_id) REFERENCES commission_requests(id)
);
