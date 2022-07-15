import { createSlice } from "@reduxjs/toolkit";

export const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    value: "",
  },
  reducers: {
    updateFilter(state, action) {
      state.value = action.payload;
    },
  },
});

export const { updateFilter } = filtersSlice.actions;

export default filtersSlice.reducer;
