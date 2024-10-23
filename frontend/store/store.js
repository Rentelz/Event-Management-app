import { configureStore } from "@reduxjs/toolkit";
import signUpReducer from "./Auth/signUpSlice.js";
import loginReducer from "./Auth/loginSlice.js";
import verifyEmailReducer from "./Auth/otpVerification/verifyEmailSlice.js";
export const store = configureStore({
  reducer: {
    signUp: signUpReducer,
    logIn: loginReducer,
    verifyEmail: verifyEmailReducer,
  },
});

export default store;
