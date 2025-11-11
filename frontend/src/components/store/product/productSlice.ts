import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IProduct, IProductState } from "./types";
import { fetchProducts } from "./productsAsyncThunks";

const initialState: IProductState = {
  products: [],
  orderedProducts: [],
  status: "idle",
  error: null as string | null,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProductToCart: (
      state,
      action: PayloadAction<{
        product: IProduct;
        amount: number;
        showToast?: (msg: string) => void | null;
      }>,
    ) => {
      const existingProduct = state.orderedProducts.find(
        (product) => product.product.id === action.payload.product.id,
      );
      if (existingProduct) {
        existingProduct.amount += action.payload.amount;
      } else {
        state.orderedProducts.push(action.payload);
      }
    },
    removeProductFromCart: (state, action: PayloadAction<{ id: number }>) => {
      state.orderedProducts = state.orderedProducts.filter(
        (product) => product.product.id !== action.payload.id,
      );
    },
    removeAllProductsFromCart: () => initialState,
    setNewAmount: (
      state,
      action: PayloadAction<{ id: number; amount: number }>,
    ) => {
      const id = action.payload.id;
      const amount = action.payload.amount;

      const necessaryProduct = state.orderedProducts.find(
        (product) => product.product.id === id,
      );
      if (necessaryProduct) necessaryProduct.amount = amount;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.products = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || "Failed to fetch";
    });
  },
});

export const {
  addProductToCart,
  removeProductFromCart,
  setNewAmount,
  removeAllProductsFromCart,
} = productSlice.actions;
export default productSlice.reducer;
