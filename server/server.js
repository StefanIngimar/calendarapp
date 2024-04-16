import { MongoClient } from 'mongodb';
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '../.env') });
console.log(process.env.DB);
const app = express();

const uri = process.env.DB;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

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

app.listen(3000, () => {
    console.log("Server started on port 3000");
});
