import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const sendSignUpData = createAsyncThunk(
  "users/sendSignUpData",

  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/signup",
        userData,
        { withCredentials: true }
      );
      console.log("Signup successful, cookie should be set now");
      console.log("Cookies:", document.cookie);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || "Something went wrong");
    }
  }
);

const signUpSlice = createSlice({
  name: "signUpSlice",
  initialState: {
    userData: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    //pending state--
    builder.addCase(sendSignUpData.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      //fullfilled
      sendSignUpData.fulfilled,
      (state, action) => {
        (state.loading = false), (state.userData = action.payload);
      }
    );
    builder.addCase(sendSignUpData.rejected, (state, action) => {
      //rejected
      state.loading = false;
      state.error = action.payload || "Failed to fetch user data";
    });
  },
});

export default signUpSlice.reducer;
