import express from "express";
import {
  register,
  login,
  adminLogin,
  loginWithGoogle,
  resetPassword,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/admin-login", adminLogin);
router.post("/google", loginWithGoogle);
router.post("/reset-password", resetPassword);

export default router;
