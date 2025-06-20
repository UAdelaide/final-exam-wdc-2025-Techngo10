const express = require('express');
const path = require('path');
const logger = require('morgan');
const db = require('./db');

const dogsRouter = require('./routes/dogs');
const walkrequestsRouter = require('./routes/walkrequests');
const walkersRouter = require('./routes/walkers');


const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use(logger('dev'));
app.use(express.json());

// Routes
app.use('/api/dogs', dogsRouter);
app.use('/api/walkrequests/open', walkrequestsRouter);
app.use('/api/walkers/summary', walkersRouter);

// Sample data insertion
(async () => {
  try {
    await db.query(`INSERT IGNORE INTO Users (username, email, password_hash, role) VALUES
      ('alice123', 'alice@example.com', 'hashed123', 'owner'),
      ('bobwalker', 'bob@example.com', 'hashed456', 'walker'),
      ('carol123', 'carol@example.com', 'hashed789', 'owner')`);

    await db.query(`INSERT IGNORE INTO Dogs (name, size, owner_id)
      SELECT 'Max', 'medium', user_id FROM Users WHERE username = 'alice123'
      UNION ALL
      SELECT 'Bella', 'small', user_id FROM Users WHERE username = 'carol123'`);

    await db.query(`INSERT IGNORE INTO WalkRequests (dog_id, requested_time, duration_minutes, location, status)
      SELECT d.dog_id, '2025-06-10 08:00:00', 30, 'Parklands', 'open'
      FROM Dogs d WHERE d.name = 'Max'
      UNION ALL
      SELECT d.dog_id, '2025-06-10 09:30:00', 45, 'Beachside Ave', 'accepted'
      FROM Dogs d WHERE d.name = 'Bella'`);

  } catch (err) {
    console.error("Error inserting sample data:", err);
  }
})();

app.get('/', (req, res) => {
  res.send('DogWalkService API is running!');
});

module.exports = app;
