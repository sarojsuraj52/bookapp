import { createSlice } from "@reduxjs/toolkit";

const initialUser = localStorage.getItem('email');

const initialState = {
  userEmail: initialUser || "",
  isLoggedIn: !!initialUser,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.userEmail = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem('email', action.payload);
    },
    logout: (state) => {
      state.userEmail = "";
      state.isLoggedIn = false;
      localStorage.removeItem('email');
    },
  },
});

export const {
  actions: authActions,
  reducer: authReducer,
  selectors: authSelectors,
} = authSlice;

