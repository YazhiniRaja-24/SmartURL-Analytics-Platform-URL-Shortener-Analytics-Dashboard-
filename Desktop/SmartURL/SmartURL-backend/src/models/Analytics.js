import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema(
  {
    url: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Url",
      required: true,
    },

    browser: {
      type: String,
      default: "Unknown",
    },

    device: {
      type: String,
      default: "Desktop",
    },

    os: {
      type: String,
      default: "Unknown",
    },

    country: {
      type: String,
      default: "Unknown",
    },

    city: {
      type: String,
      default: "Unknown",
    },

    ipAddress: {
      type: String,
    },

    clickedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Analytics = mongoose.model(
  "Analytics",
  analyticsSchema
);

export default Analytics;