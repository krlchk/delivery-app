import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
  IOrder,
  IOrderByIdResponse,
  IOrderItemPayload,
  IOrderResponse,
  IOrdersResponse,
  IOrderWithItems,
  IUpdateOrderCourierResponse,
} from "./types";
import type { RootState } from "../../../app/store";
import axios, { isAxiosError } from "axios";

export const createOrder = createAsyncThunk<
  IOrder,
  {
    deliveryAddress: string;
    items: IOrderItemPayload[];
  },
  { state: RootState }
>("orders/createOrder", async ({ deliveryAddress, items }, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const token = state.delivery.users.token;
    const itemsPayload = items.map((item) => ({
      product: {
        id: item.product.id,
        price: item.product.price,
      },
      amount: item.amount,
    }));
    const response = await axios.post<IOrderResponse>(
      "http://localhost:5001/api/create-order",
      {
        deliveryAddress,
        items: itemsPayload,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data.data;
  } catch (error: unknown) {
    let message = "Failed to create order";

    if (isAxiosError(error) && error.response?.data?.message) {
      message = error.response.data.message;
    }

    return thunkAPI.rejectWithValue({ message });
  }
});

export const fetchMyOrders = createAsyncThunk<
  IOrderWithItems[],
  void,
  { state: RootState }
>("orders/fetchMyOrders", async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const token = state.delivery.users.token;
  const response = await axios.get<IOrdersResponse>(
    "http://localhost:5001/api/orders/my",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data.data;
});

export const fetchOrderById = createAsyncThunk<
  IOrderWithItems,
  number,
  { state: RootState }
>("orders/fetchOrderById", async (id, thunkAPI) => {
  const state = thunkAPI.getState();
  const token = state.delivery.users.token;
  const response = await axios.get<IOrderByIdResponse>(
    `http://localhost:5001/api/orders/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data.data;
});

export const deleteOrder = createAsyncThunk<
  IOrder,
  {
    id: number;
  },
  { state: RootState }
>("orders/deleteOrder", async ({ id }, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const token = state.delivery.users.token;
    const response = await axios.delete<IOrderResponse>(
      `http://localhost:5001/api/delete-order/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data.data;
  } catch (error: unknown) {
    let message = "Failed to delete order";

    if (isAxiosError(error) && error.response?.data?.message) {
      message = error.response.data.message;
    }

    return thunkAPI.rejectWithValue({ message });
  }
});

export const fetchOrders = createAsyncThunk<
  IOrderWithItems[],
  void,
  { state: RootState }
>("orders/fetchOrders", async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const token = state.delivery.users.token;
  const response = await axios.get<IOrdersResponse>(
    "http://localhost:5001/api/orders",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data.data;
});

export const updateOrderCourier = createAsyncThunk<
  IOrderWithItems,
  {
    id: number;
    courierId: number;
    status: "new" | "delivering" | "completed" | "cancelled";
  },
  { state: RootState }
>("orders/updateOrderCourier", async ({ id, courierId, status }, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const token = state.delivery.users.token;
    const response = await axios.patch<IUpdateOrderCourierResponse>(
      `http://localhost:5001/api/update-order/${id}`,
      {
        courierId,
        status,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data.data;
  } catch (error: unknown) {
    let message = "Failed to update order courier";

    if (isAxiosError(error) && error.response?.data?.message) {
      message = error.response.data.message;
    }

    return thunkAPI.rejectWithValue({ message });
  }
});

export const updateOrderStatus = createAsyncThunk<
  IOrderWithItems,
  {
    id: number;
    status: "new" | "delivering" | "completed" | "cancelled";
  },
  { state: RootState }
>("orders/updateOrderStatus", async ({ id,  status }, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const token = state.delivery.users.token;
    const response = await axios.patch<IUpdateOrderCourierResponse>(
      `http://localhost:5001/api/update-order/${id}`,
      {
        status,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data.data;
  } catch (error: unknown) {
    let message = "Failed to update order status";

    if (isAxiosError(error) && error.response?.data?.message) {
      message = error.response.data.message;
    }

    return thunkAPI.rejectWithValue({ message });
  }
});
