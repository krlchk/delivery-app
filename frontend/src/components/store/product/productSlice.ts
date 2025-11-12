import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IProduct, IProductState } from "./types";
import {
  createProduct,
  deleteProduct,
  fetchProductById,
  fetchProducts,
  updateProduct,
} from "./productsAsyncThunks";

const initialState: IProductState = {
  currentProduct: null,
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
    removeProductFromCart: (
      state,
      action: PayloadAction<{ id: number | undefined }>,
    ) => {
      state.orderedProducts = state.orderedProducts.filter(
        (product) => product.product.id !== action.payload.id,
      );
    },
    removeAllProductsFromCart: () => initialState,
    setNewAmount: (
      state,
      action: PayloadAction<{ id: number | undefined; amount: number }>,
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
    builder.addCase(createProduct.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.products.push(action.payload);
    });
    builder.addCase(createProduct.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || "Failed to fetch";
    });
    builder.addCase(fetchProductById.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchProductById.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.currentProduct = action.payload;
    });
    builder.addCase(fetchProductById.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error?.message || "Failed to fetch";
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.status = "succeeded";

      const deletedProductId = action.payload.id;

      state.products = state.products.filter(
        (product) => product.id !== deletedProductId,
      );

      if (
        state.currentProduct &&
        state.currentProduct.id === deletedProductId
      ) {
        state.currentProduct = null;
      }
    });
    builder.addCase(updateProduct.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.status = "succeeded";

      const updatedProduct = action.payload;

      const index = state.products.findIndex(
        (product) => product.id === updatedProduct.id,
      );
      if (index !== -1) {
        state.products[index] = updatedProduct;
      }

      if (
        state.currentProduct &&
        state.currentProduct.id === updatedProduct.id
      ) {
        state.currentProduct = updatedProduct;
      }
    });
    builder.addCase(updateProduct.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error?.message || "Failed to update";
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
