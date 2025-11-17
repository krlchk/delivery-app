import { createSlice } from "@reduxjs/toolkit";
import {
  deleteOrder,
  fetchMyOrders,
  fetchOrderById,
  fetchOrders,
  updateOrderCourier,
} from "./orderAsyncThunks";
import type { IOrderState } from "./types";
import { createCancellation } from "../cancellation/cancellationAsyncThuncs";

const initialState: IOrderState = {
  orders: [],
  myOrders: [],
  currentOrder: null,
  allUsersOrders: [],
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
    builder.addCase(fetchOrders.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.allUsersOrders = action.payload;
    });
    builder.addCase(fetchOrders.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || "Failed to fetch";
    });
    builder.addCase(updateOrderCourier.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(updateOrderCourier.fulfilled, (state, action) => {
      state.status = "succeeded";

      // 'action.payload' - це 'IOrderWithItems' з вашого thunk.
      // Він містить 'items', але, ймовірно, не 'courier'.
      const updatedOrderData = action.payload;

      // 1. Оновлюємо 'currentOrder' (це виправить зникнення кур'єра)
      if (state.currentOrder && state.currentOrder.id === updatedOrderData.id) {
        state.currentOrder = {
          ...state.currentOrder, // <-- Зберігаємо старі дані (включно з 'courier')
          ...updatedOrderData, // <-- Накладаємо нові дані ('status', 'courierId', 'items')
        };
      }

      // 2. Оновлюємо 'myOrders' (який має тип IOrderWithItems[])
      const myOrdersIndex = state.myOrders.findIndex(
        (order) => order.id === updatedOrderData.id,
      );
      if (myOrdersIndex !== -1) {
        state.myOrders[myOrdersIndex] = {
          ...state.myOrders[myOrdersIndex], // <-- Зберігаємо старі дані
          ...updatedOrderData,
        };
      }

      // 3. Оновлюємо 'allUsersOrders' (який має тип IOrderWithItems[])
      const allOrdersIndex = state.allUsersOrders.findIndex(
        (order) => order.id === updatedOrderData.id,
      );
      if (allOrdersIndex !== -1) {
        state.allUsersOrders[allOrdersIndex] = {
          ...state.allUsersOrders[allOrdersIndex], // <-- Зберігаємо старі дані
          ...updatedOrderData,
        };
      }

      // 4. Оновлюємо 'orders' (який має тип IOrder[])
      //    Оскільки 'action.payload' (IOrderWithItems) не є типом 'IOrder',
      //    ми не можемо просто його присвоїти. Ми оновимо лише ті поля,
      //    які є в 'IOrder'.
      const ordersIndex = state.orders.findIndex(
        (order) => order.id === updatedOrderData.id,
      );
      if (ordersIndex !== -1) {
        // Оновлюємо лише ті поля, які є в 'IOrder'
        state.orders[ordersIndex].status = updatedOrderData.status;
        state.orders[ordersIndex].courierId = updatedOrderData.courierId;
      }
    });
    builder.addCase(updateOrderCourier.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error?.message || "Failed to update";
    });
  },
});

export const { resetOrderStatus } = orderSlice.actions;
export default orderSlice.reducer;
