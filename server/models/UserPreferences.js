const mongoose = require('mongoose');

const UserPreferencesSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  favoriteLeagues: [{
    idLeague: String,
    strLeague: String,
    strSport: String
  }],
  favouriteTeams: [{
    idTeam: String,
    strTeam: String,
    strTeamShort: String,
    idLeague: String,
    strTeamBadge: String
  }]
});

module.exports = mongodb.model('UserPreferences', UserPreferencesSchema);
