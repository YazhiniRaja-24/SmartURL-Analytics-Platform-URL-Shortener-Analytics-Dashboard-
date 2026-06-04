import express from "express";

import {
  getUrlAnalytics,
  getBrowserStats,
  getDeviceStats,
  getCountryStats,
  getCityStats,
  getTopUrls,
  getRecentClicks,
  getDailyTrends,
  getDashboardSummary,
} from "../controllers/analyticsController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// =========================
// Dashboard Summary
// =========================
router.get(
  "/summary",
  protect,
  getDashboardSummary
);

// =========================
// Top URLs
// =========================
router.get(
  "/top-urls",
  protect,
  getTopUrls
);

// =========================
// Recent Clicks
// =========================
router.get(
  "/recent-clicks",
  protect,
  getRecentClicks
);

// =========================
// Daily Trends
// =========================
router.get(
  "/daily-trends",
  protect,
  getDailyTrends
);

// =========================
// Browser Stats
// =========================
router.get(
  "/browser/:urlId",
  protect,
  getBrowserStats
);

// =========================
// Device Stats
// =========================
router.get(
  "/device/:urlId",
  protect,
  getDeviceStats
);

// =========================
// Country Stats
// =========================
router.get(
  "/country/:urlId",
  protect,
  getCountryStats
);

// =========================
// City Stats
// =========================
router.get(
  "/city/:urlId",
  protect,
  getCityStats
);

// =========================
// URL Analytics
// KEEP THIS LAST
// =========================
router.get(
  "/:urlId",
  protect,
  getUrlAnalytics
);

export default router;