import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//register user
export const createUser = createAsyncThunk("auth/createUser", async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:5050/api/v1/auth/register",
      data,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

//login user
export const loginUser = createAsyncThunk("auth/loginUser", async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:5050/api/v1/auth/login",
      data,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

//logout user
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  try {
    const response = await axios.post(
      "http://localhost:5050/api/v1/auth/logout",
      "",
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// get logget in user
export const loggedInUser = createAsyncThunk("auth/loggedInUser", async () => {
  try {
    const response = await axios.get("http://localhost:5050/api/v1/auth/me", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// Update user
export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async ({ name, email, id }) => {
    try {
      const response = await axios.patch(
        `http://localhost:5050/api/v1/mamu/${id}`,
        { name, email },
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
