import { createSlice } from "@reduxjs/toolkit";
import { deleteOrder, fetchMyOrders, fetchOrderById } from "./orderAsyncThunks";
import type { IOrderState } from "./types";
import { createCancellation } from "../cancellation/cancellationAsyncThuncs";

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
    builder.addCase(createCancellation.fulfilled, (state, action) => {
      const cancelledOrderId = action.payload.orderId;
      const orderInList = state.myOrders.find(
        (order) => order.id === cancelledOrderId,
      );
      if (orderInList) {
        orderInList.status = "cancelled";
      }
      if (state.currentOrder && state.currentOrder.id === cancelledOrderId) {
        state.currentOrder.status = "cancelled";
      }
    });
    builder.addCase(deleteOrder.fulfilled, (state, action) => {
      state.status = "succeeded";

      const deletedOrderId = action.payload.id;

      state.myOrders = state.myOrders.filter(
        (order) => order.id !== deletedOrderId,
      );

      state.orders = state.orders.filter(
        (order) => order.id !== deletedOrderId,
      );
      if (state.currentOrder && state.currentOrder.id === deletedOrderId) {
        state.currentOrder = null;
      }
    });
  },
});

export const { resetOrderStatus } = orderSlice.actions;
export default orderSlice.reducer;
