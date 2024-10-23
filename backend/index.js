import express, { json } from "express";
import cors from "cors";
import morgan from "morgan";
import { connectDB } from "./models/connection.js";
import authRouter from "../backend/routes/auth.js";
import formSubmissionRouter from "../backend/routes/eventSubmission.js";
import cookieParser from "cookie-parser";
import { protectedRoute } from "./middilware/jwtAuthrization.js";
import multer from "multer";
import upload from "./middilware/fileUpload/multerUpload.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(json());
// app.use(cors());
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
    credentials: true, // Allow cookies (credentials) to be sent
  })
);
app.use(morgan("dev"));
app.use(cookieParser());
// Routes
app.get("/", protectedRoute, (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1/auth", authRouter);

app.use(
  "/api/v1/eventformpage",
  protectedRoute,
  upload.single("image"),
  formSubmissionRouter
);

// Start Server
connectDB();
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT} `);
});
