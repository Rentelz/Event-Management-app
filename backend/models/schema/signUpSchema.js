import mongoose from "mongoose";

const { Schema } = mongoose;

// Define the user schema
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,

      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user", // Default role is 'user'
    },

    verificationCode: String,
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
