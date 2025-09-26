import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IRegisterResponse, IUser } from "../types/user.types";
import axios from "axios";

export const registerUser = createAsyncThunk<
  IUser,
  { full_name: string; phone_number: string; email: string; password: string }
>(
  "register/registerUser",
  async ({ full_name, phone_number, email, password }) => {
    const response = await axios.post<IRegisterResponse>(
      "http://localhost:5001/api/register",
      { full_name, phone_number, email, password },
      { headers: { "Content-Type": "application/json" } },
    );
    return response.data.user;
  },
);
