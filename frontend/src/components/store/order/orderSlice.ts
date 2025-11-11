import { createSlice } from "@reduxjs/toolkit";
import { fetchMyOrders, fetchOrderById } from "./orderAsyncThunks";
import type { IOrderState } from "./types";

const initialState: IOrderState = {
  orders: [],
  myOrders: [],
  currentOrder: null,
  status: "idle",
  error: null as string | null,
};

export const orderSlice = createSlice({
  name: "orderSlice",
  initialState,
  reducers: {
    resetOrderStatus: (state) => {
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMyOrders.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchMyOrders.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.myOrders = action.payload;
    });
    builder.addCase(fetchMyOrders.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error?.message || "Failed to fetch";
    });
    builder.addCase(fetchOrderById.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchOrderById.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.currentOrder = action.payload;
    });
    builder.addCase(fetchOrderById.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error?.message || "Failed to fetch";
    });
  },
});

export const { resetOrderStatus } = orderSlice.actions;
export default orderSlice.reducer;
