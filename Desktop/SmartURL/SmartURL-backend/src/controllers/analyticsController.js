import Analytics from "../models/Analytics.js";
import Url from "../models/Url.js";
import mongoose from "mongoose";
// ======================================
// Get URL Analytics
// ======================================
export const getUrlAnalytics = async (
  req,
  res
) => {
  try {
    const { urlId } = req.params;

    const url = await Url.findById(urlId);

    if (!url) {
      return res.status(404).json({
        success: false,
        message: "URL not found",
      });
    }

    const analytics =
      await Analytics.find({
        url: urlId,
      }).sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      totalClicks: analytics.length,
      data: analytics,
    });
  } catch (error) {
    console.error(
      "Analytics Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ======================================
// Browser Statistics
// ======================================
export const getBrowserStats = async (
    req,
    res
  ) => {
    try {
      const { urlId } = req.params;
  
      const stats =
        await Analytics.aggregate([
          {
            $match: {
              url: new mongoose.Types.ObjectId(
                urlId
              ),
            },
          },
          {
            $group: {
              _id: "$browser",
              count: { $sum: 1 },
            },
          },
        ]);
  
      res.status(200).json({
        success: true,
        data: stats,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  // ======================================
// Device Statistics
// ======================================
export const getDeviceStats = async (
    req,
    res
  ) => {
    try {
      const { urlId } = req.params;
  
      const stats =
        await Analytics.aggregate([
          {
            $match: {
              url: new mongoose.Types.ObjectId(
                urlId
              ),
            },
          },
          {
            $group: {
              _id: "$device",
              count: { $sum: 1 },
            },
          },
        ]);
  
      res.status(200).json({
        success: true,
        data: stats,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  // ======================================
// Country Statistics
// ======================================
export const getCountryStats = async (
    req,
    res
  ) => {
    try {
      const { urlId } = req.params;
  
      const stats = await Analytics.aggregate([
        {
          $match: {
            url: new mongoose.Types.ObjectId(
              urlId
            ),
          },
        },
        {
          $group: {
            _id: "$country",
            count: { $sum: 1 },
          },
        },
      ]);
  
      res.status(200).json({
        success: true,
        data: stats,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  // ======================================
// Dashboard Summary
// ======================================
export const getDashboardSummary = async (
    req,
    res
  ) => {
    try {
      const totalUrls = await Url.countDocuments({
        user: req.user._id,
      });
  
      const userUrls = await Url.find({
        user: req.user._id,
      });
  
      const urlIds = userUrls.map(
        (url) => url._id
      );
  
      const totalClicks =
        await Analytics.countDocuments({
          url: { $in: urlIds },
        });
  
      const browserStats =
        await Analytics.aggregate([
          {
            $match: {
              url: { $in: urlIds },
            },
          },
          {
            $group: {
              _id: "$browser",
              count: { $sum: 1 },
            },
          },
          {
            $sort: {
              count: -1,
            },
          },
          {
            $limit: 1,
          },
        ]);
  
      const deviceStats =
        await Analytics.aggregate([
          {
            $match: {
              url: { $in: urlIds },
            },
          },
          {
            $group: {
              _id: "$device",
              count: { $sum: 1 },
            },
          },
          {
            $sort: {
              count: -1,
            },
          },
          {
            $limit: 1,
          },
        ]);
  
      res.status(200).json({
        success: true,
        summary: {
          totalUrls,
          totalClicks,
          topBrowser:
            browserStats[0]?._id || "N/A",
          topDevice:
            deviceStats[0]?._id || "N/A",
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  // ======================================
// City Statistics
// ======================================
export const getCityStats = async (
    req,
    res
  ) => {
    try {
      const { urlId } = req.params;
  
      const stats = await Analytics.aggregate([
        {
          $match: {
            url: new mongoose.Types.ObjectId(
              urlId
            ),
          },
        },
        {
          $group: {
            _id: "$city",
            count: { $sum: 1 },
          },
        },
      ]);
  
      res.status(200).json({
        success: true,
        data: stats,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  // ======================================
// Top URLs
// ======================================
export const getTopUrls = async (
    req,
    res
  ) => {
    try {
      const urls = await Url.find({
        user: req.user._id,
      })
        .sort({
          clicks: -1,
        })
        .limit(5);
  
      res.status(200).json({
        success: true,
        data: urls,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  // ======================================
// Recent Clicks
// ======================================
export const getRecentClicks = async (
    req,
    res
  ) => {
    try {
      const clicks =
        await Analytics.find()
          .sort({
            createdAt: -1,
          })
          .limit(10)
          .populate(
            "url",
            "shortCode originalUrl"
          );
  
      res.status(200).json({
        success: true,
        data: clicks,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  // ======================================
// Daily Click Trends
// ======================================
export const getDailyTrends = async (
    req,
    res
  ) => {
    try {
      const trends =
        await Analytics.aggregate([
          {
            $group: {
              _id: {
                $dateToString: {
                  format:
                    "%Y-%m-%d",
                  date:
                    "$createdAt",
                },
              },
              clicks: {
                $sum: 1,
              },
            },
          },
          {
            $sort: {
              _id: 1,
            },
          },
        ]);
  
      res.status(200).json({
        success: true,
        data: trends,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };