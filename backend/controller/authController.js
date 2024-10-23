// const express = require("express");
import bcrypt from "bcryptjs";
import { z } from "zod";
import User from "../models/schema/signUpSchema.js";
import { generateAndSendJWT } from "../middilware/jwtGenrator.js";
import { sendVerificationMail } from "../middilware/otpVerification/otpVerifcationNodemailer.js";
// Zod schema for validation
const signupSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const signUp = async (req, res) => {
  console.log(req.body);

  try {
    const { username, email, password } = signupSchema.parse(req.body);

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    // console.log(user);

    // Call generateAndSendJWT without expecting it to send a response
    await generateAndSendJWT(req, res, user._id.toString());
    console.log("Cookies being sent:", res.getHeaders()["set-cookie"]);

    // Now safely send the final response
    res.status(201).json({ message: "User signed up successfully" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    // Validate input

    const { email, password } = loginSchema.parse(req.body);
    console.log(req.body);

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Call generateAndSendJWT without expecting it to send a response
    await generateAndSendJWT(req, res, user._id.toString());

    // Send a success response
    res.status(200).json({
      message: "Login successful",
      loggedUserMail: { email: email, id: user.id },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    res.status(500).json({ error: "Internal server error" });
  }
};

export const verifyEmail = async (req, res, next) => {
  const { email } = req.body;
  console.log(email);

  // Check if email is provided
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    // Await sending the verification email
    await sendVerificationMail(email);
    return res.status(200).json({ message: "Verification email sent!" });
  } catch (error) {
    console.error("Error sending email: ", error);
    return res
      .status(500)
      .json({ error: "Failed to send verification email." });
  }
};

export const logOut = (req, res) => {
  try {
    // Clear the JWT token by setting the cookie's expiration to a past date
    //input --
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    // Send a success response
    //output--
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
