import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const sendCode = createAsyncThunk(
  "auth/SendCode",
  async (code, email, { rejectWithValue }) => {
    try {
      const response = axios.post(
        "http://localhost:3000/api/v1/auth/emailVerify",
        code,
        email
      );
      return (await response).data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "something went wrong");
    }
  }
);

const VerifyCodeSlice = createSlice({
  name: "verifyCode",
  initialState: {
    data: null,
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    // 1
    builder.addCase(sendMail.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    //2
    builder.addCase(sendMail.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });

    //3

    builder.addCase(sendMail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload; // Custom error message from rejectWithValue
    });
  },
});

export default VerifyCodeSlice.reducer;
