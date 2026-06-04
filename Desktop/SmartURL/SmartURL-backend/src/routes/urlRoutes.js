import express from "express";

import {
  createShortUrl,
  getMyUrls,
  updateUrl,
  deleteUrl,
  redirectUrl,
  getPublicStats,
} from "../controllers/urlController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Create URL
router.post(
  "/create",
  protect,
  createShortUrl
);

// Get User URLs
router.get(
  "/myurls",
  protect,
  getMyUrls
);

// Update URL
router.put(
  "/update/:id",
  protect,
  updateUrl
);

// Delete URL
router.delete(
  "/delete/:id",
  protect,
  deleteUrl
);

// Public URL Statistics
router.get(
  "/public/:shortCode",
  getPublicStats
);

// Redirect URL
router.get(
  "/redirect/:shortCode",
  redirectUrl
);

export default router;