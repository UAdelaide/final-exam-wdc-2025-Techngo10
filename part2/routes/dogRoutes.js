const express = require('express');
const router = express.Router();
const db = require('../models/db');

// Route to get all dogs, similar to part1's dogs.js
router.get('/', async (req, res) => {
  try {
    const connection = await db.getConnection();
    connection.release();

    // Query the database to get the list of dogs
    const query = 'SELECT dog_id, name, size, owner_id FROM Dogs';
    const [result] = await db.query(query);

    if (result.length === 0) {
      return res.status(404).send('No dogs found');
    }

    // Send the dogs data as a response
    res.json(result);
  } catch (err) {
    // Log detailed error for debugging
    console.error('Error fetching dogs:', err);

    // Send error response to client
    res.status(500).send('Error fetching dogs');
  }
});

module.exports = router;
