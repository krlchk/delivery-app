import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ICancellation, ICancellationResponse } from "./types";
import axios, { isAxiosError } from "axios";
import type { RootState } from "../../../app/store";

export const createCancellation = createAsyncThunk<
  ICancellation,
  { orderId: number; reason: string },
  { state: RootState }
>("cancellation/createCancellation", async ({ orderId, reason }, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const token = state.delivery.users.token;
    const response = await axios.post<ICancellationResponse>(
      "http://localhost:5001/api/create-cancellation",
      { orderId, reason },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data.data;
  } catch (error: unknown) {
    let message = "Unknown cancellation error";

    if (isAxiosError(error) && error.response?.data?.message) {
      message = error.response.data.message;
    }

    return thunkAPI.rejectWithValue({ message });
  }
});
