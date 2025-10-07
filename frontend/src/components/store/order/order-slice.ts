import { createSlice } from "@reduxjs/toolkit";
import type { IOrderState } from "../types/order.types";
import { fetchMyOrders } from "./order-async-thunks";

const initialState: IOrderState = {
  orders: [],
  myOrders:[],
  status: "idle",
  error: null as string | null,
};

export const orderSlice = createSlice({
  name: "orderSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMyOrders.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchMyOrders.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.myOrders = action.payload;
    });
    builder.addCase(fetchMyOrders.rejected, (state,action) => {
      state.status = "failed";
      state.error = action.error?.message || "Failed to fetch";
    });
  },
});

export default orderSlice.reducer;
