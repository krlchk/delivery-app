import { combineReducers } from "@reduxjs/toolkit";
import productReducer from "./product/productSlice";
import userReducer from "./users/userSlice";
import orderReducer from "./order/orderSlice";

const rootReducer = combineReducers({
  orders: orderReducer,
  products: productReducer,
  users: userReducer,
});

export default rootReducer;
