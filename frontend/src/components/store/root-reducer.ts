import { combineReducers } from "@reduxjs/toolkit";
import productReducer from "./product/product-slice";
import userReducer from "./users/user-slice";
import orderReducer from "./order/order-slice";

const rootReducer = combineReducers({
  orders: orderReducer,
  products: productReducer,
  users: userReducer,
});

export default rootReducer;
