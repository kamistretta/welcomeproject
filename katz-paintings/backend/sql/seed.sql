-- Seed paintings table with all 56 paintings
-- Only run if the table is empty (checked in setup-server.sh)

-- Animal Portraits
INSERT INTO paintings (title, description, style, medium, image_url, size, featured) VALUES
('Best Friends', 'A dog and cat side by side — the ultimate duo painted on a warm pink background.', 'Animal Portrait', 'Acrylic on Canvas', '/images/animal-portraits/best-friends.png', '16x20', TRUE),
('Best Friends (In Progress)', 'Work-in-progress shot showing the painting process — dog fully rendered, cat still in pencil sketch.', 'Animal Portrait', 'Acrylic on Canvas', '/images/animal-portraits/best-friends-wip.png', '16x20', TRUE),
('Lucy in a Hoodie', 'A joyful black lab named Lucy wearing a bright orange hoodie against a sky-blue background.', 'Animal Portrait', 'Acrylic on Canvas', '/images/animal-portraits/lucy-in-hoodie.png', '16x20', TRUE),
('Lucy Close-Up', 'A closer crop of Lucy in her orange hoodie — all smiles and personality.', 'Animal Portrait', 'Acrylic on Canvas', '/images/animal-portraits/lucy-closeup.png', '16x20', TRUE),
('Wine Cat', 'An orange tabby cat lounging beside a bottle of wine, a glass, cheese, and poker chips — living the good life.', 'Animal Portrait', 'Acrylic on Canvas', '/images/animal-portraits/wine-cat.png', '16x20', TRUE),

-- Graphics
('Colorful Portrait I', 'Bold pop-color portrait with blue, yellow, and purple color blocking on a pink background.', 'Graphic', 'Acrylic on Canvas', '/images/graphics/colorful-portrait-i.png', '16x20', TRUE),
('Colorful Portrait II', 'A second angle of the bold pop-color portrait — vivid blues and yellows against pink.', 'Graphic', 'Acrylic on Canvas', '/images/graphics/colorful-portrait-ii.png', '16x20', TRUE),
('High on Life', 'A vibrant graffiti-style piece covered in doodles — smiley faces, flowers, peace signs, hearts, and positive vibes.', 'Graphic', 'Acrylic on Canvas', '/images/graphics/high-on-life.png', '18x24', TRUE),
('Billiards', 'A hand lining up a pool shot — rings gleaming, cue stick ready, billiard balls scattered on blue felt.', 'Graphic', 'Acrylic on Canvas', '/images/graphics/billiards.png', '16x20', TRUE),
('Call Me If You Get Lost', 'A figure in a pink suit carrying suitcases with retro typography — inspired by travel and adventure.', 'Graphic', 'Acrylic on Canvas', '/images/graphics/call-me.png', '16x20', TRUE),
('Revolver', 'A graphic-style hand gripping a revolver rendered in bold ink lines on a pink gradient background.', 'Graphic', 'Acrylic on Canvas', '/images/graphics/revolver.png', '16x20', TRUE),
('Dr. Feelgood', 'The iconic Motley Crue Dr. Feelgood album cover — winged serpent caduceus with skull on a mint background.', 'Graphic', 'Acrylic on Canvas', '/images/graphics/dr-feelgood.png', '16x20', TRUE),
('Gunna', 'A monochrome silver portrait with bold sunglasses and an iced-out chain.', 'Graphic', 'Acrylic on Canvas', '/images/graphics/gunna.png', '16x20', TRUE),
('Nikes', 'A pair of Nike sneakers dangling in the sky — moody blues and grays with a cloudy atmosphere.', 'Graphic', 'Acrylic on Canvas', '/images/graphics/nikes.png', '16x20', TRUE),
('Purple Haze', 'A woman with flowing brown hair and a cigarette, surrounded by a dreamy purple haze.', 'Graphic', 'Acrylic on Canvas', '/images/graphics/purple-haze.png', '16x20', TRUE),

-- Nature
('Mountain Lake', 'Misty mountain peaks reflected in a calm alpine lake, framed by dark pine trees.', 'Nature', 'Acrylic on Canvas', '/images/nature/mountain-lake.png', '18x24', TRUE),
('Mountain Lake II', 'A slightly different perspective of the mountain lake scene with lush greenery in the foreground.', 'Nature', 'Acrylic on Canvas', '/images/nature/mountain-lake-ii.png', '18x24', TRUE),
('Red Barn at Sunset', 'A classic red barn on a green hillside under a golden-orange sunset sky.', 'Nature', 'Acrylic on Canvas', '/images/nature/red-barn-sunset.png', '18x24', TRUE),
('Classic Cars on the Ridge', 'Three vintage muscle cars cruising along a mountain road with a colorful sky overhead.', 'Nature', 'Acrylic on Canvas', '/images/nature/classic-cars.png', '18x24', TRUE),
('Snow Peak', 'A dramatic snow-covered mountain summit emerging through clouds and blue sky.', 'Nature', 'Acrylic on Canvas', '/images/nature/snow-peak.png', '16x20', TRUE),
('Mountain Sunset', 'A fiery sunset over mountain silhouettes — swirling clouds of purple, orange, pink, and gold.', 'Nature', 'Acrylic on Canvas', '/images/nature/mountain-sunset.png', '16x20', TRUE),
('Night Shore', 'A dark, moody nightscape — stormy sky with hints of blue light over a still shoreline.', 'Nature', 'Acrylic on Canvas', '/images/nature/night-shore.png', '16x20', TRUE),
('Koi Pond', 'Three koi fish swimming through a serene blue and white watercolor-style pond.', 'Nature', 'Watercolor on Paper', '/images/nature/koi-pond.png', '12x16', TRUE),
('Skier', 'A lone skier in a red jacket making their way down a snowy slope with misty mountains behind.', 'Nature', 'Acrylic on Canvas', '/images/nature/skier.png', '16x20', TRUE),
('Blue Sky Birds', 'Birds soaring through a deep blue sky with wispy clouds and a golden horizon below.', 'Nature', 'Acrylic on Canvas', '/images/nature/blue-sky-birds.png', '16x20', TRUE),
('Galaxy Treeline', 'A pine tree silhouette against a vibrant night sky — pink, blue, and deep space with shooting stars.', 'Nature', 'Acrylic on Canvas', '/images/nature/galaxy-treeline.png', '16x16', TRUE),
('Starry Mountains', 'A dark mountain range under a starry night sky with subtle blue nebula clouds.', 'Nature', 'Acrylic on Canvas', '/images/nature/starry-mountains.png', '16x20', TRUE),

-- Pop Art
('Colorful Portrait III', 'Full canvas view of the bold pop-color portrait — vibrant blues, yellows, and purples on pink.', 'Pop Art', 'Acrylic on Canvas', '/images/pop-art/colorful-portrait-iii.png', '16x20', TRUE),
('Colorful Portrait IV', 'Close-up angle of the pop-color portrait series — every brushstroke visible.', 'Pop Art', 'Acrylic on Canvas', '/images/pop-art/colorful-portrait-iv.png', '16x20', TRUE),
('Purple Tears', 'A glowing purple pop-art portrait of a woman with tears — comic-book style on a dark background.', 'Pop Art', 'Acrylic on Canvas', '/images/pop-art/purple-tears.png', '16x20', TRUE),
('The Kiss', 'A classic comic-book kiss — red-haired woman and a man in bold pop-art style with heavy outlines.', 'Pop Art', 'Acrylic on Canvas', '/images/pop-art/the-kiss.png', '18x24', TRUE),
('Sky Kicks', 'A pair of Jordan sneakers dangling against a blue sky with puffy clouds — relaxed and dreamy.', 'Pop Art', 'Acrylic on Canvas', '/images/pop-art/sky-kicks.png', '16x20', TRUE),
('Abstract Shapes', 'Bold Matisse-inspired abstract cutout shapes in purple, blue, red, orange, and teal on black.', 'Pop Art', 'Acrylic on Canvas', '/images/pop-art/abstract-shapes.png', '18x24', TRUE),
('Golden Glow', 'A serene portrait of a woman with closed eyes, bathed in warm golden light.', 'Pop Art', 'Acrylic on Canvas', '/images/pop-art/golden-glow.png', '12x16', TRUE),
('Late Night', 'Two women at a red bar — smoking, wine glasses, and an intimate late-night conversation.', 'Pop Art', 'Acrylic on Canvas', '/images/pop-art/late-night.png', '18x24', TRUE),

-- Trippy
('Neon Skeleton', 'A glowing neon skeleton profile on a black background — purple, green, yellow, and pink highlights.', 'Trippy', 'Acrylic on Canvas', '/images/trippy/neon-skeleton.png', '16x20', TRUE),
('Tame Impala I', 'A psychedelic Tame Impala tribute — swirling eye portal with retro typography in red and purple.', 'Trippy', 'Acrylic on Canvas', '/images/trippy/tame-impala-i.png', '16x20', TRUE),
('Tame Impala II', 'A second version of the Tame Impala piece under blacklight — the UV glow brings out hidden colors.', 'Trippy', 'Acrylic on Canvas', '/images/trippy/tame-impala-ii.png', '16x20', TRUE),
('Neon Embrace', 'A neon-lit silhouette figure in purple and pink tones against a dark background with rainbow accents.', 'Trippy', 'Acrylic on Canvas', '/images/trippy/neon-embrace.png', '16x20', TRUE),
('Dragonfly Kiss', 'A close-up portrait with a dragonfly resting on the nose — delicate and intimate.', 'Trippy', 'Acrylic on Canvas', '/images/trippy/dragonfly-kiss.png', '12x16', TRUE),
('Moonlit Mystic', 'A mystical figure with flowing hair under a crescent moon, holding a glowing sun-faced orb.', 'Trippy', 'Acrylic on Canvas', '/images/trippy/moonlit-mystic.png', '18x24', TRUE),
('Violet Silence', 'A haunting purple-toned portrait — a figure pressing a finger to their lips in shadow.', 'Trippy', 'Acrylic on Canvas', '/images/trippy/violet-silence.png', '16x20', TRUE),
('Cosmic Reach', 'Two hands reaching toward each other through a psychedelic purple mushroom landscape with swirling clouds.', 'Trippy', 'Acrylic on Canvas', '/images/trippy/cosmic-reach.png', '18x24', TRUE),
('Neon Kiss', 'Two glowing figures kissing — one outlined in fiery orange, the other in cool blue, against a dark void.', 'Trippy', 'Acrylic on Canvas', '/images/trippy/neon-kiss.png', '16x20', TRUE),
('Midnight Garden', 'A pink-hued figure sitting in a lush night garden, exhaling smoke that dissolves into the purple sky.', 'Trippy', 'Acrylic on Canvas', '/images/trippy/midnight-garden.png', '16x20', TRUE),
('Smoking Skeleton', 'A blue and purple neon skeleton casually smoking against a vibrant pink-purple galaxy background.', 'Trippy', 'Acrylic on Canvas', '/images/trippy/smoking-skeleton.png', '16x20', TRUE),
('Headless Figure', 'An abstract neon figure with no head — pink, purple, and blue tones against a dark starry background.', 'Trippy', 'Acrylic on Canvas', '/images/trippy/headless-figure.png', '16x20', TRUE),
('Cosmic Astronaut', 'An astronaut floating through a psychedelic universe — mushrooms, flowers, planets, checkerboard patterns, and an all-seeing eye.', 'Trippy', 'Acrylic on Canvas', '/images/trippy/cosmic-astronaut.png', '18x24', TRUE),
('Skeleton Embrace', 'Two colorful skeletons embracing — rendered in warm rainbow tones on a pink background.', 'Trippy', 'Acrylic on Canvas', '/images/trippy/skeleton-embrace.png', '12x16', TRUE),
('Celestial Gaze', 'A woman with glowing eyes and a crescent moon on her forehead — vibrant blues, purples, and warm orange highlights.', 'Trippy', 'Acrylic on Canvas', '/images/trippy/celestial-gaze.png', '16x20', TRUE),
('Cosmic Creator', 'A blue cosmic figure holding the sun, surrounded by orbiting planets — a creation myth in neon.', 'Trippy', 'Acrylic on Canvas', '/images/trippy/cosmic-creator.png', '18x24', TRUE),
('Alien Jungle', 'A dense, otherworldly jungle scene with alien flora, flying creatures, and a distant planet in the sky.', 'Trippy', 'Colored Pencil on Paper', '/images/trippy/alien-jungle.png', '12x16', TRUE),
('Enchanted Mushrooms', 'Red and orange mushrooms in a magical forest clearing with tiny stars and butterflies.', 'Trippy', 'Acrylic on Canvas', '/images/trippy/enchanted-mushrooms.png', '12x16', TRUE),
('Rainbow Mushroom', 'A giant red-capped mushroom radiating rainbow waves on a black-and-white wavy background.', 'Trippy', 'Acrylic on Canvas', '/images/trippy/rainbow-mushroom.png', '16x20', TRUE),
('Celestial Bubbles', 'Planets and bubbles floating above mountains under a deep blue starry sky with orange starbursts.', 'Trippy', 'Acrylic on Canvas', '/images/trippy/celestial-bubbles.png', '12x16', TRUE),
('Divine Lotus', 'A blue-skinned figure with a glowing halo holding a lotus flower — rich blues, purples, and golden light.', 'Trippy', 'Acrylic on Canvas', '/images/trippy/divine-lotus.png', '16x20', TRUE);
