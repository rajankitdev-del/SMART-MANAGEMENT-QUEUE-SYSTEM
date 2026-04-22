require("dotenv").config();
const express = require("express");
const cors = require("cors");

// Import Routers
const tokenRoutes = require("./src/routes/tokenRoutes");
const queueRoutes = require("./src/routes/queueRoutes");
const userRoutes = require("./src/routes/userRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Basic Route
app.get("/", (req, res) => {
  res.send("Queue Seva Backend Running");
});

// API Routes
app.use("/api/token", tokenRoutes);
app.use("/api/queue", queueRoutes);
app.use("/api/user", userRoutes);

// 🔹 Location/Service APIs (Pending Controller Separation) 🔹
// Keeping these inline for now as they weren't explicitly in the task
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
