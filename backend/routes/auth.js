import express from "express";
import {
  signUp,
  login,
  logOut,
  verifyEmail,
} from "../controller/authController.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.post("/emailVerify", verifyEmail);
router.post("/logout", logOut);

export default router;
