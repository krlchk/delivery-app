import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
  ILoginResponse,
  ILoginResponseData,
  IRegisterResponse,
  IUser,
} from "./types";
import axios, { isAxiosError } from "axios";

export const registerUser = createAsyncThunk<
  IUser,
  { fullName: string; phoneNumber: string; email: string; password: string }
>(
  "register/registerUser",
  async ({ fullName, phoneNumber, email, password }, thunkAPI) => {
    try {
      const response = await axios.post<IRegisterResponse>(
        "http://localhost:5001/api/register",
        { fullName, phoneNumber, email, password },
      );
      return response.data.user;
    } catch (error: unknown) {
      let message = "Unknown registration error";

      if (isAxiosError(error) && error.response?.data?.message) {
        message = error.response.data.message;
      }

      return thunkAPI.rejectWithValue({ message });
    }
  },
);

export const loginUser = createAsyncThunk<
  ILoginResponseData,
  { email: string; password: string }
>("login/loginUser", async ({ email, password }) => {
  const response = await axios.post<ILoginResponse>(
    "http://localhost:5001/api/login",
    { email, password },
    { headers: { "Content-Type": "application/json" } },
  );
  return response.data.data;
});
