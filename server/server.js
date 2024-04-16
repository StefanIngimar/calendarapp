import {MongoClient} from 'mongodb'
const express = require('express')
const app = express()

app.get("/calendar", (req, res) => {
    res.json()
})

app.listen(3000, () => {console.log("Server started on port 3000")})
