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


// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));


// ✅ Home route
app.get("/", (req, res) => {
  res.send("Queue Seva API Running");
});


// ✅ Get all tokens
app.get("/tokens", async (req, res) => {
  try {
    const data = await Token.find()
      .select("_id tokenNumber status")
      .populate("userId", "name")
      .populate("queueId", "name")
      .lean();

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ Queue position + wait time (Week 3 logic)
app.get("/queue/:queueId/position", async (req, res) => {
     console.log("🔥 ROUTE HIT");   // 👈 WRITE HERE (LINE 1 INSIDE)

             // 👈 TEMP TEST

  try {
    const { queueId } = req.params;

    const tokens = await Token.aggregate([
  {
    $match: {
      queueId: new mongoose.Types.ObjectId(queueId),
      status: { $ne: "done" }
    }
  },
  {
    $sort: { tokenNumber: 1 }
  },
  {
    $lookup: {
      from: "users",
      localField: "userId",
      foreignField: "_id",
      as: "user"
    }
  },
  {
  $unwind: {
    path: "$user",
    preserveNullAndEmptyArrays: true
  }
},
  {
    $project: {
      tokenNumber: 1,
      userName: "$user.name"
    }
  }
]);

    const avgTimePerPerson = 5;

    const result = tokens.map((token, index) => {
      return {
        tokenNumber: token.tokenNumber,
        user: token.userName || "Unknown",
        position: index + 1,
        waitTime: index * avgTimePerPerson
      };
    });

    res.json(result);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.get("/token/:id/serve", async (req, res) => {
  try {
    // 👉 Step 1: mark current token as DONE
    const current = await Token.findByIdAndUpdate(
      req.params.id,
      { status: "done" },
      { new: true }
    );
    if (!current) {
  return res.status(404).json({ error: "Token not found" });
}

    // 👉 Step 2: find next waiting token
    const next = await Token.findOne({
      queueId: current.queueId,
      status: "waiting"
    }).sort({ tokenNumber: 1 });

    // 👉 Step 3: make next token SERVING
    if (next) {
      next.status = "serving";
      await next.save();
    }

    // 👉 Step 4: send response
    res.json({
      message: "Next token started",
      current,
      next
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// ✅ Add new token (JOIN QUEUE)
app.post("/token", async (req, res) => {
  try {
    const { userId, queueId } = req.body;

    // 👉 find last token number in this queue
    const lastToken = await Token.findOne({ queueId })
      .sort({ tokenNumber: -1 });

    const newTokenNumber = lastToken ? lastToken.tokenNumber + 1 : 1;

    // 👉 create new token
    const newToken = new Token({
      userId,
      queueId,
      tokenNumber: newTokenNumber,
      status: "waiting"
    });

    await newToken.save();

    res.json({
      message: "Token created",
      token: newToken
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// ✅ Start server (ALWAYS LAST)
app.listen(5000, () => {
  console.log("Server running on port 5000");
});