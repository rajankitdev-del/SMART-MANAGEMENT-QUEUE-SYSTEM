const mongoose = require("mongoose");
require("dotenv").config();

const User = require("./models/User");
const Queue = require("./models/Queue");
const Token = require("./models/Token");

mongoose.connect(process.env.MONGO_URI)
.then(async () => {
    console.log("MongoDB Connected");

    // Delete old data
    await User.deleteMany();
    await Queue.deleteMany();
    await Token.deleteMany();

    // Add Users
    const users = await User.insertMany([
        { name: "Deep", phone: "9999999991" },
        { name: "Rahul", phone: "9999999992" }
    ]);

    // Add Queue
    const queue = await Queue.create({
        name: "Bank Queue",
        service: "Cash Counter"
    });

    // Add Tokens
    await Token.insertMany([
        {
            tokenNumber: 1,
            userId: users[0]._id,
            queueId: queue._id
        },
        {
            tokenNumber: 2,
            userId: users[1]._id,
            queueId: queue._id
        }
    ]);

    console.log("Data Inserted ✅");
    process.exit();
})
.catch(err => console.log(err));