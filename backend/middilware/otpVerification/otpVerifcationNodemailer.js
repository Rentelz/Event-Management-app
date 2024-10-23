import nodemailer from "nodemailer";
import dotenv from "dotenv";
import User from "../../models/schema/signUpSchema.js";

dotenv.config();
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.APP_USER,
    pass: process.env.APP_PASSWORD,
  },
});

const generateCode = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

export const sendVerificationMail = async (clientMail) => {
  const verificationCode = generateCode();

  const mailOptions = {
    from: process.env.APP_USER,
    to: clientMail,
    subject: "Your Verification Code",
    text: `Your verification code is: ${verificationCode}`,
    html: `<b>Your verification code is: ${verificationCode}</b>`,
  };

  try {
    // Perform email sending and database update concurrently
    // using promise.all for improving speed
    const [emailResult] = await Promise.all([
      transporter.sendMail(mailOptions),
      User.findOneAndUpdate(
        { email: clientMail },
        { $set: { verificationCode } },
        { new: true }
      ),
    ]);

    console.log("Message sent: %s", emailResult.messageId);
    console.log(`Verification code updated for user: ${clientMail}`);

    // setting timeout for deleting the code after 1 min
    setTimeout(async () => {
      await User.updateOne(
        { email: clientMail },
        { $unset: { verificationCode: 1, verificationCodeExpires: 1 } }
      );
      console.log("code deleted ");
    }, 10000);
  } catch (error) {
    console.error("Error sending email or updating user: ", error);
    throw error;
  }
};

export const sendVerificationCode = async (code) => {
  try {
    let verify = await User.findOne({ verificationCode: code });
    if (verify) {
      console.log(
        "true",
        "user is authorized his mail is valid  you can procceed to login"
      );
    }
  } catch (error) {
    console.error("Error in verifying the user or code: ", error);
    throw error;
  }
};
