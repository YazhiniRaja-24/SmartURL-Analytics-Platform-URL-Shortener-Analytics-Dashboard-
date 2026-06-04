import Url from "../models/Url.js";
import generateShortCode from "../utils/generateShortCode.js";
import Analytics from "../models/Analytics.js";
import geoip from "geoip-lite";
import { UAParser } from "ua-parser-js";
// ======================================
// Create Short URL
// ======================================
export const createShortUrl = async (req, res) => {
  try {
    const {
      originalUrl,
      customAlias,
      expiryDate,
    } = req.body;

    // URL Validation
    try {
      new URL(originalUrl);
    } catch {
      return res.status(400).json({
        success: false,
        message: "Invalid URL",
      });
    }

    // Prevent Duplicate URLs
    const existingUrl = await Url.findOne({
      originalUrl,
      user: req.user._id,
    });

    if (existingUrl) {
      return res.status(200).json({
        success: true,
        message: "URL already exists",
        data: existingUrl,
      });
    }

    let shortCode;

    // Custom Alias Validation
    if (customAlias) {
      const aliasRegex =
        /^[a-zA-Z0-9_-]+$/;

      if (!aliasRegex.test(customAlias)) {
        return res.status(400).json({
          success: false,
          message:
            "Alias can contain only letters, numbers, _ and -",
        });
      }

      const aliasExists =
        await Url.findOne({
          shortCode: customAlias,
        });

      if (aliasExists) {
        return res.status(400).json({
          success: false,
          message: "Alias already taken",
        });
      }

      shortCode = customAlias;
    } else {
      shortCode = generateShortCode();
    }

    const shortUrl = `${req.protocol}://${req.get(
      "host"
    )}/${shortCode}`;

    const url = await Url.create({
      originalUrl,
      shortCode,
      shortUrl,
      expiryDate,
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      message:
        "Short URL created successfully",
      data: url,
    });
  } catch (error) {
    console.error(
      "Create URL Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Get My URLs
// ======================================
export const getMyUrls = async (req, res) => {
  try {
    const urls = await Url.find({
      user: req.user._id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: urls.length,
      data: urls,
    });
  } catch (error) {
    console.error(
      "Get URLs Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Update URL
// ======================================
export const updateUrl = async (req, res) => {
  try {
    const {
      originalUrl,
      expiryDate,
    } = req.body;

    const url = await Url.findById(
      req.params.id
    );

    if (!url) {
      return res.status(404).json({
        success: false,
        message: "URL not found",
      });
    }

    if (
      url.user.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    url.originalUrl =
      originalUrl || url.originalUrl;

    url.expiryDate =
      expiryDate || url.expiryDate;

    await url.save();

    res.status(200).json({
      success: true,
      message:
        "URL updated successfully",
      data: url,
    });
  } catch (error) {
    console.error(
      "Update URL Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Delete URL
// ======================================
export const deleteUrl = async (req, res) => {
  try {
    const url = await Url.findById(
      req.params.id
    );

    if (!url) {
      return res.status(404).json({
        success: false,
        message: "URL not found",
      });
    }

    if (
      url.user.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    await Url.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message:
        "URL deleted successfully",
    });
  } catch (error) {
    console.error(
      "Delete URL Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Redirect URL
// ======================================
export const redirectUrl = async (req, res) => {
  try {
    const { shortCode } = req.params;

    const url = await Url.findOne({
      shortCode,
    });

    if (!url) {
      return res.status(404).json({
        success: false,
        message: "Short URL not found",
      });
    }

    // Expiry Check
    if (
      url.expiryDate &&
      new Date() > new Date(url.expiryDate)
    ) {
      url.status = "Expired";

      await url.save();

      return res.status(410).json({
        success: false,
        message: "URL has expired",
      });
    }

    // Increase Click Count
    url.clicks += 1;
    await url.save();

    // ==========================
    // Analytics Tracking
    // ==========================

    const parser = new UAParser(
      req.headers["user-agent"]
    );

    const browser =
      parser.getBrowser().name ||
      "Unknown";

    const os =
      parser.getOS().name ||
      "Unknown";

    const device =
      parser.getDevice().type ||
      "Desktop";

    const ip =
      req.headers["x-forwarded-for"] ||
      req.socket.remoteAddress ||
      "Unknown";

    const geo = geoip.lookup(ip);

    const country =
      geo?.country || "Unknown";

    const city =
      geo?.city || "Unknown";

    await Analytics.create({
      url: url._id,
      browser,
      os,
      device,
      country,
      city,
      ipAddress: ip,
    });

    return res.redirect(
      url.originalUrl
    );
  } catch (error) {
    console.error(
      "Redirect Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ======================================
// Public URL Stats
// ======================================
export const getPublicStats = async (
  req,
  res
) => {
  try {
    const { shortCode } =
      req.params;

    const url = await Url.findOne({
      shortCode: shortCode.trim(),
    });

    if (!url) {
      return res.status(404).json({
        success: false,
        message: "URL not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        originalUrl:
          url.originalUrl,
        shortUrl:
          url.shortUrl,
        clicks: url.clicks,
        status: url.status,
        createdAt:
          url.createdAt,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error.message,
    });
  }
};