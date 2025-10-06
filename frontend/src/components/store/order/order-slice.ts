import { createSlice } from "@reduxjs/toolkit";
import type { IOrderState } from "../types/order.types";

const initialState: IOrderState = {
  orders: [],
  status: "idle",
  error: null as string | null,
};

export const orderSlice = createSlice({
  name: "orderSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default orderSlice.reducer;
