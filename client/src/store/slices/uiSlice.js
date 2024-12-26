import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  sidebarOpen: true,
  theme: 'light',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },

  },
});

export const { toggleSidebar, toggleTheme } = uiSlice.actions;
export default uiSlice.reducer;