
const express = require('express');
const axios = require('axios');
const EventModel = require('./models/EventModel'); 

const router = express.Router();

router.get('/import-events', async (req, res) => {
  const apiKey = 'your_api_key_here';
  try {
    const response = await axios.get(`https://www.thesportsdb.com/api/v1/json/${apiKey}/eventsnext.php?id=134728`);
    if (response.data && response.data.events) {
      const events = response.data.events.map(event => ({
        leagueId: event.idLeague,
        teamId: event.idHomeTeam,
      }));
      await EventModel.insertMany(events);
      res.send({ message: 'Events imported successfully', count: events.length });
    } else {
      res.status(404).send({ message: 'No events found to import' });
    }
  } catch (error) {
    console.error('Failed to import events:', error);
    res.status(500).send({ message: 'Failed to import events', error: error.message });
  }
});

module.exports = router;
