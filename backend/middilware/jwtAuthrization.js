import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const protectedRoute = (req, res, next) => {
  try {
    // Retrieve the token from the cookies (assuming it's stored there)
    const token = req.cookies.jwt;

    if (!token) {
      return res
        .status(401)
        .json({ error: "Access denied. No token provided." });
    }

    const secretKey = process.env.TOKEN_SECRET;
    if (!secretKey) {
      throw new Error("Token secret key is not defined.");
    }

    // Verify the token
    const decoded = jwt.verify(token, secretKey);
    req.userId = decoded.userId; // Attach the userId to the request object

    next(); // Continue to the next middleware or route handler
  } catch (error) {
    console.error("Authorization error:", error);
    res.status(403).json({ error: "Invalid or expired token." });
  }
};
