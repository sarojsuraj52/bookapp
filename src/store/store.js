import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./combinedReducers";

const store = configureStore({
  reducer: rootReducer,
});
export default store;
