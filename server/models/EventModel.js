const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  leagueId: String,
  teamId: String,
});

module.exports = mongoose.model('Event', EventSchema);