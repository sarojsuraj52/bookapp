import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isCartOpen: false,
};

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    toggleCart: (state, action) => {
     state.isCartOpen = !state.isCartOpen
    }
  },
});

export const {
  actions: commonActions,
  reducer: commonReducer,
  selectors: commonSelectors,
} = commonSlice;
