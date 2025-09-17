import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../components/store/root-reducer";

export const store = configureStore({
  reducer: {
    delivery: rootReducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
