import { createSlice } from "@reduxjs/toolkit";
import {
  createUser,
  loggedInUser,
  loginUser,
  logoutUser,
  updateUser,
} from "./authApiSlice";

//create auth slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
    error: null,
    message: null,
  },
  reducers: {
    setMessageEmpty: (state, payload) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.message = action.payload.message;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.user = action.payload.user;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.user = null;
        localStorage.removeItem("user");
      })
      .addCase(loggedInUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.user = null;
      })
      .addCase(loggedInUser.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      });
  },
});

//selectors
export const getAuthData = (state) => state.auth;

//actions
export const { setMessageEmpty } = authSlice.actions;

//export
export default authSlice.reducer;
