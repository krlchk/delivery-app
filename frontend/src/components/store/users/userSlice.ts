import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "./usersAsyncThunks";
import type { IUserState } from "./types";

const initialState: IUserState = {
  user: null,
  token: null,
  status: "idle",
  error: null as string | null,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    logoutUser: () => initialState,
    resetStatus: (state) => {
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.user = action.payload;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error?.message || "Failed to register";
    });
    builder.addCase(loginUser.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.token = action.payload.token;
      state.user = action.payload.user;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error?.message || "Failed to login";
    });
  },
});

export const { resetStatus, logoutUser } = userSlice.actions;
export default userSlice.reducer;
