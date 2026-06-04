import express from "express";

import {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  changePassword,
} from "../controllers/authController.js";

import protect from "../middleware/authMiddleware.js";

import validateRequest from "../middleware/validateRequest.js";

import {
  registerValidation,
  loginValidation,
} from "../middleware/authValidation.js";

const router = express.Router();

router.post(
  "/register",
  registerValidation,
  validateRequest,
  registerUser
);

router.post(
  "/login",
  loginValidation,
  validateRequest,
  loginUser
);

router.get(
  "/profile",
  protect,
  getProfile
);
router.put(
  "/update-profile",
  protect,
  updateProfile
);

router.put(
  "/change-password",
  protect,
  changePassword
);

export default router;