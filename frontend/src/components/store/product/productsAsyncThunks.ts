import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../../../app/store";
import axios, { isAxiosError } from "axios";
import type {
  IDeleteProductResponse,
  IProduct,
  IProductByIdResponse,
  IProductCreateResponse,
  IProductResponse,
  IUpdateProductResponse,
} from "./types";

export const fetchProducts = createAsyncThunk<
  IProduct[],
  void,
  { state: RootState }
>("products/fetchProducts", async () => {
  const response = await axios.get<IProductResponse>(
    "http://localhost:5001/api/products",
  );
  return response.data.data;
});

export const createProduct = createAsyncThunk<
  IProduct,
  {
    name: string;
    description: string;
    price: number;
    stockQuantity: number;
    img: string;
  },
  { state: RootState }
>(
  "products/createProduct",
  async ({ name, description, price, stockQuantity, img }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.delivery.users.token;
      const response = await axios.post<IProductCreateResponse>(
        "http://localhost:5001/api/create-product",
        {
          name,
          description,
          price,
          stockQuantity,
          img,
        },
        {
          headers: {
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
  },
);

export const fetchProductById = createAsyncThunk<
  IProduct,
  number,
  { state: RootState }
>("products/fetchProductById", async (id, thunkAPI) => {
  const state = thunkAPI.getState();
  const token = state.delivery.users.token;
  const response = await axios.get<IProductByIdResponse>(
    `http://localhost:5001/api/products/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data.data;
});

export const deleteProduct = createAsyncThunk<
  IProduct,
  {
    id: number;
  },
  { state: RootState }
>("products/deleteProduct", async ({ id }, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const token = state.delivery.users.token;
    const response = await axios.delete<IDeleteProductResponse>(
      `http://localhost:5001/api/delete-product/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data.data;
  } catch (error: unknown) {
    let message = "Failed to delete product";

    if (isAxiosError(error) && error.response?.data?.message) {
      message = error.response.data.message;
    }

    return thunkAPI.rejectWithValue({ message });
  }
});

export const updateProduct = createAsyncThunk<
  IProduct,
  {
    id: number;
    name: string;
    description: string;
    price: number;
    stockQuantity: number;
    img: string;
  },
  { state: RootState }
>(
  "products/updateProduct",
  async ({ id, name, description, price, stockQuantity, img }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.delivery.users.token;
      const response = await axios.patch<IUpdateProductResponse>(
        `http://localhost:5001/api/update-product/${id}`,
        {
          name,
          description,
          price,
          stockQuantity,
          img,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data.data;
    } catch (error: unknown) {
      let message = "Failed to update product";

      if (isAxiosError(error) && error.response?.data?.message) {
        message = error.response.data.message;
      }

      return thunkAPI.rejectWithValue({ message });
    }
  },
);
