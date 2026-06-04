import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./src/config/db.js";

import authRoutes from "./src/routes/authRoutes.js";
import urlRoutes from "./src/routes/urlRoutes.js";
import analyticsRoutes from "./src/routes/analyticsRoutes.js";
import { redirectUrl } from "./src/controllers/urlController.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(
  "/api/analytics",
  analyticsRoutes
);
// Database Connection
connectDB();

// Health Check
app.get("/", (req, res) => {
  res.send("SmartURL Backend Running 🚀");
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/url", urlRoutes);

// Redirect Route
app.get("/:shortCode", redirectUrl);

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});