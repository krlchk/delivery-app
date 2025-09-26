import { combineReducers } from "@reduxjs/toolkit";
import productReducer from "./product/product-slice";
import userReducer from "./users/user-slice";

const rootReducer = combineReducers({
  products: productReducer,
  users: userReducer,
});

export default rootReducer;
