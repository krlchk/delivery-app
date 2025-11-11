import { combineReducers } from "@reduxjs/toolkit";
import productReducer from "./product/productSlice";
import userReducer from "./users/userSlice";
import orderReducer from "./order/orderSlice";
import cancellationReducer from "./cancellation/cancellationSlice";

const rootReducer = combineReducers({
  orders: orderReducer,
  products: productReducer,
  users: userReducer,
  cancellations: cancellationReducer,
});

export default rootReducer;
