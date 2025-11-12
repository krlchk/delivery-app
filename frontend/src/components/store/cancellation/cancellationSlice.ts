import { createSlice } from "@reduxjs/toolkit";
import type { ICancellationState } from "./types";
import { createCancellation } from "./cancellationAsyncThuncs";

const initialState: ICancellationState = {
  cancellation: null,
  status: "idle",
  error: null as string | null,
};

export const cancellationSlice = createSlice({
  name: "cancellationSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createCancellation.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(createCancellation.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.cancellation = action.payload;
    });
    builder.addCase(createCancellation.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error?.message || "Failed to cancellation";
    });
  },
});

export const {} = cancellationSlice.actions;
export default cancellationSlice.reducer;
