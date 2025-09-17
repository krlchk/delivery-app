import { combineReducers } from "@reduxjs/toolkit";
import productReducer from "./product/product-slice";

const rootReducer = combineReducers({
  products: productReducer,
});

export default rootReducer;
