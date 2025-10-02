import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../../../app/store";
import axios from "axios";
import type { IProduct, IProductResponse } from "../types/product.types";

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
