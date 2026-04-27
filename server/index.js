const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const Token = require("./models/Token");
const User = require("./models/User");   
const Queue = require("./models/Queue"); 

const app = express();

app.use(cors());
app.use(express.json());

// ✅ MongoDB Connection (VERY IMPORTANT)
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Home route
app.get("/", (req, res) => {
    res.send("Queue Seva API Running");
});

// Token route
//const Token = require("./models/Token");

app.get("/tokens", async (req, res) => {
    try {
        const data = await Token.find()
    .select("tokenNumber status")
    .populate("userId", "name")
    .populate("queueId", "name")
    .lean();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start server
app.listen(5000, () => {
    console.log("Server running on port 5000");
});