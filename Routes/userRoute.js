import express from "express";
import {
  forgotPassword,
  getUser,
  loginUser,
  registerUser,
  resetPassword,
} from "../Controllers/userController.js";
import { authMiddleware } from "../Middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getUser", authMiddleware, getUser);
router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword/:id/:token", resetPassword);

export default router;
