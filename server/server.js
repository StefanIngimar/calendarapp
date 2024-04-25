import { MongoClient } from 'mongodb';
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
app.use(cors());

async function connectToMongo() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Could not connect to MongoDB", error);
    }
}

connectToMongo();

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
    try {
        const { userId, leagues } = req.body;
        const preferences = await UserPreferences.findOneAndUpdate({ userId }, { leagues }, { new: true, upsert: true });
        res.send({ message: 'Preferences saved successfully', preferences });
    } catch (error) {
        console.error('Failed to save preferences', error);
        res.status(500).send('Failed to save preferences');
    }
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});
