const mongoose = require('mongodb');

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
  }]
});

module.exports = mongodb.model('UserPreferences', UserPreferencesSchema);
