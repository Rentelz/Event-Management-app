import jwt from "jsonwebtoken"; // Ensure this is imported
import dotenv from "dotenv";
dotenv.config();
export async function generateAndSendJWT(req, res, userId) {
  try {
    const payload = { userId };
    const secretKey = process.env.TOKEN_SECRET;
    if (!secretKey) {
      throw new Error("Token secret key is not defined.");
    }
    const options = { expiresIn: "1h" };
    const token = jwt.sign(payload, secretKey, options);

    // Set the JWT token in a cookie
    // res.cookie("jwt", token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production", // Uncomment if using HTTPS
    //   // secure: false,
    //   maxAge: 3600000,
    // });
    res.cookie("jwt", token, {
      httpOnly: false, // Change this to false for testing
      secure: false, // Set to false if not using HTTPS
      sameSite: "lax", // Add this line
      maxAge: 3600000,
    });
    console.log("Cookie set:", token);
  } catch (error) {
    console.error("Error generating or sending JWT:", error);
    throw error; // Rethrow to be caught in the calling function
  }
}
