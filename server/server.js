import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fetchAllSports, fetchNextEvents } from './sportsAPI.js';
import cors from 'cors'

dotenv.config({ path: path.resolve(process.cwd(), '../.env') });
console.log(process.env.DB);
const app = express();
const uri = process.env.DB;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect(process.env.DB, {useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyParser.json());

const UserPreferences = mongoose.model('UserPreferences', new mongoose.Schema({
  userId: String,
  favouriteLeagues: Array
}));

app.get("/calendar", async (req, res) => {
    try {
        const collection = client.db("test").collection("events");
        const events = await collection.find({}).toArray();
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch events" });
    }
});

app.get('/api/sports', async (req, res) => {
    try {
      const sports = await fetchAllSports();
      res.json(sports);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch sports data", error });
    }
  });
  
  app.get('/api/events/:leagueId', async (req, res) => {
    try {
      const { leagueId } = req.params;
      const events = await fetchNextEvents(leagueId);
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch events", error });
    }
  });

  app.post('/api/savePreferences', async (req, res) => {
    const {userId, leagues} = req.body;
    try {
        let preferences = await UserPreferences.findOne({userId: userId});
        if(!preferences){
          preferences = new UserPreferences({userId, leagues});
        } else{
          preferences.leagues = leagues;
        }
        await preferences.save();
        res.status(200).json({message: 'Preferences saved successfully', data: preferences});
    } catch (error) {
        console.error('Failed to save preferences', error);
        res.status(500).send('Failed to save preferences');
    }
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});