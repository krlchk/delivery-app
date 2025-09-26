import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IProduct, IProductState } from "../types/product.types";

const initialState: IProductState = {
  products: [
    {
      id: 1,
      name: "Wooden Chair",
      price: 120,
      description: "Comfortable wooden chair made of oak.",
      image: "https://picsum.photos/300/200?random=1",
    },
    {
      id: 2,
      name: "Modern Sofa",
      price: 450,
      description: "Stylish modern sofa for your living room.",
      image: "https://picsum.photos/300/200?random=2",
    },
    {
      id: 3,
      name: "Office Desk",
      price: 280,
      description: "Minimalist office desk with metal legs.",
      image: "https://picsum.photos/300/200?random=3",
    },
    {
      id: 4,
      name: "Bed Frame",
      price: 600,
      description: "Queen-size bed frame with headboard.",
      image: "https://picsum.photos/300/200?random=4",
    },
    {
      id: 5,
      name: "Dining Table",
      price: 350,
      description: "Round dining table for 4 people.",
      image: "https://picsum.photos/300/200?random=5",
    },
  ],
  orderedProducts: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProductToCart: (
      state,
      action: PayloadAction<{ product: IProduct; amount: number }>,
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
});

export const {
  addProductToCart,
  removeProductFromCart,
  setNewAmount,
  removeAllProductsFromCart,
} = productSlice.actions;
export default productSlice.reducer;
