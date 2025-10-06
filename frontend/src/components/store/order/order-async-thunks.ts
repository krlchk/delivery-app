import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
  IOrder,
  IOrderItemPayload,
  IOrderResponse,
} from "../types/order.types";
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
