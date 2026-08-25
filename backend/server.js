// server.js
//
// This is the entry point of the backend. Running "node server.js" starts
// everything: connects to MongoDB, sets up middleware, and starts listening
// for HTTP requests.

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import landRoutes from "./routes/lands.js";

dotenv.config(); // loads variables from .env into process.env

const app = express();

// --- Middleware ---
// Middleware = functions that run on EVERY request before it reaches your routes.
app.use(cors()); // allows the React frontend (different port) to call this API
app.use(express.json()); // lets Express understand JSON request bodies

// --- Routes ---
// Any request starting with /api/lands gets handled by landRoutes
app.use("/api/lands", landRoutes);

// A simple health-check route to confirm the server is alive
app.get("/", (req, res) => {
  res.send("Landscape India API is running 🌍");
});

// --- Connect to MongoDB, then start the server ---
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/landscape_india";

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
  });
