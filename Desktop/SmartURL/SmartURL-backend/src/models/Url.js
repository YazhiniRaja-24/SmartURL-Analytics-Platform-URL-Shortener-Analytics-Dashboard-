import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    originalUrl: {
      type: String,
      required: true,
    },

    shortCode: {
      type: String,
      required: true,
      unique: true,
    },

    shortUrl: {
      type: String,
    },

    clicks: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["Active", "Expired"],
      default: "Active",
    },

    expiryDate: {
      type: Date,
      default: null,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Url = mongoose.model("Url", urlSchema);

export default Url;