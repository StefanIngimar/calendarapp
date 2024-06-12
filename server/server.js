import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import axios from 'axios';

dotenv.config({ path: path.resolve(process.cwd(), '../.env') });
console.log(process.env.DB);

const app = express();
app.use(cors());
app.use(bodyParser.json());
const uri = 'mongodb+srv://stefan:helloworld97@users.ixmf0ot.mongodb.net/?retryWrites=true&w=majority&appName=Users'

mongoose.connect(uri)
  .then(() => {
    console.log('MongoDB connected successfully');
    app.listen(3000, () => {
      console.log("Server started on port 3000");
    });
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
  });

const Event = mongoose.model('EventModel', new mongoose.Schema({
  leagueId: String,
  teamId: String,
}));

const UserPreferences = mongoose.model('UserPreferences', new mongoose.Schema({
  userId: String,
  favouriteLeagues: Array,
  favouriteTeams: Array
}));

const router = express.Router();

router.get("/calendar", async (req, res) => {
  const { userId } = req.query;
  if (!userId) {
    console.log("No user ID provided");
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const userPreferences = await UserPreferences.findOne({ userId });
    if (!userPreferences) {
      console.log(`No preferences found for user ID: ${userId}`);
      return res.status(404).json({ message: "No preferences found for this user" });
    }

    console.log(`User preferences found: ${JSON.stringify(userPreferences)}`);

    const events = await Event.find({
      $or: [
        { leagueId: { $in: userPreferences.favouriteLeagues.map(league => league.idLeague) } },
        { teamId: { $in: userPreferences.favouriteTeams.map(team => team.idTeam) } }
      ]
    });

    console.log(`Events found: ${events.length}`);
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: "Failed to fetch events", error: error.message });
  }
});

router.post('/api/savePreferences', async (req, res) => {
  const { userId, leagues, teams } = req.body;
  console.log("Received data:", req.body);
  try {
    let preferences = await UserPreferences.findOne({ userId });
    if (!preferences) {
      preferences = new UserPreferences({ userId, favouriteLeagues: leagues, favouriteTeams: teams });
    } else {
      preferences.favouriteLeagues = leagues;
      preferences.favouriteTeams = teams;
    }
    await preferences.save();
    res.status(200).json({ message: 'Preferences saved successfully', data: preferences });
  } catch (error) {
    console.error('Error saving preferences:', error);
    res.status(500).send('Failed to save preferences');
  }
});

router.get('/import-events', async (req, res) => {
  const apiKey = process.env.API;
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

app.use(router);

app.listen(3001, () => {
    console.log("Server started on port 3001");
});