require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Basic Route
app.get("/", (req, res) => {
  res.send("Queue Seva Backend Running");
});

// 🔹 Token APIs 🔹

// Generate Token
app.post("/generate-token", (req, res) => {
  const { locationId, serviceType } = req.body;
  
  // Placeholder Logic
  // Planned logic: QR Scan → Identify Location → Generate Token → Store → Return Data
  res.json({
    tokenNumber: 24,
    peopleAhead: 5,
    estimatedWait: 15
  });
});

// Get Token by ID
app.get("/token/:id", (req, res) => {
  res.json({ message: `Status for token ${req.params.id}` });
});


// 🔹 Queue APIs 🔹

// Get Queue Status
app.get("/queue-status", (req, res) => {
  res.json({ message: "Queue status data" });
});

// Get People Ahead
app.get("/people-ahead", (req, res) => {
  res.json({ message: "Number of people ahead" });
});


// 🔹 Location/Service APIs 🔹

// Get Services
app.get("/services", (req, res) => {
  res.json({ services: ["General", "Premium", "VIP"] });
});

// Get Location by ID
app.get("/location/:id", (req, res) => {
  res.json({ message: `Location details for ${req.params.id}` });
});


// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
