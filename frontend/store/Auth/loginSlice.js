import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const sendLogInData = createAsyncThunk(
  "auth/logInData",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/login",
        userData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      if (!error.response) {
        // Handle network error
        return rejectWithValue("Network error. Please check your connection.");
      }
      return rejectWithValue(error.response.data || "Something went wrong");
    }
  }
);

const logInSlice = createSlice({
  name: "auth",
  initialState: {
    userData: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(sendLogInData.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(sendLogInData.fulfilled, (state, action) => {
      state.loading = false;
      state.userData = action.payload;
    });
    builder.addCase(sendLogInData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Login failed";
    });
  },
});

export default logInSlice.reducer;
