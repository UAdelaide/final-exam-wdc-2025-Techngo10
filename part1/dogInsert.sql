-- Insert Users
INSERT INTO Users (username, email, password_hash, role)
VALUES
('alice123', 'alice@example.com', 'hashed123', 'owner'),
('bobwalker', 'bob@example.com', 'hashed456', 'walker'),
('carol123', 'carol@example.com', 'hashed789', 'owner'),
('daviddoggo', 'david@example.com', 'hashed321', 'walker'),
('emilyowner', 'emily@example.com', 'hashed654', 'owner');

-- Insert Dogs (using subqueries to get owner_id)
INSERT INTO Dogs (name, size, owner_id)
VALUES
('Max', 'medium', (SELECT user_id FROM Users WHERE username = 'alice123')),
('Bella', 'small', (SELECT user_id FROM Users WHERE username = 'carol123')),
('Rocky', 'large', (SELECT user_id FROM Users WHERE username = 'emilyowner')),
('Luna', 'medium', (SELECT user_id FROM Users WHERE username = 'carol123')),
('Milo', 'small', (SELECT user_id FROM Users WHERE username = 'alice123'));

-- Insert WalkRequests (using subqueries to get dog_id)
INSERT INTO WalkRequests (dog_id, requested_time, duration_minutes, location, status)
VALUES
((SELECT dog_id FROM Dogs WHERE name = 'Max'), '2025-06-10 08:00:00', 30, 'Parklands', 'open'),
((SELECT dog_id FROM Dogs WHERE name = 'Bella'), '2025-06-10 09:30:00', 45, 'Beachside Ave', 'accepted'),
((SELECT dog_id FROM Dogs WHERE name = 'Rocky'), '2025-06-11 10:00:00', 60, 'City Park', 'open'),
((SELECT dog_id FROM Dogs WHERE name = 'Luna'), '2025-06-12 14:00:00', 30, 'Suburban Trail', 'open'),
((SELECT dog_id FROM Dogs WHERE name = 'Milo'), '2025-06-13 16:30:00', 20, 'Downtown Plaza', 'completed');
