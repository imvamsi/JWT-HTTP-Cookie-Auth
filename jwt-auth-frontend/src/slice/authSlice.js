// authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // Holds the user data, null means no user is logged in
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload; // Set user data after login
    },
    logout: (state) => {
      state.user = null; // Clear user data when logged out
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
