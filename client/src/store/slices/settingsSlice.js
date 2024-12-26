import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setFinancialYear: (state, action) => {
      const { year } = action.payload;
      state.financialYear = year;
    },
  },
});

export const { setFinancialYear } = settingsSlice.actions;
export default settingsSlice.reducer;
