import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice";
import { bookReducer } from "./bookSlice";
import { postReducer } from "./bookSlice";
import { putReducer } from "./bookSlice";
import { deleteReducer } from "./bookSlice";
import { bookStoreReducer } from "./bookStoreSlice";
import { cartReducer } from "./bookStoreSlice";
import { addToCartReducer } from "./bookStoreSlice";
import { commonReducer } from "./commonSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  books: bookReducer,
  post: postReducer,
  put: putReducer,
  delete: deleteReducer,
  bookStore: bookStoreReducer,
  cart: cartReducer,
  postCart: addToCartReducer,
  common: commonReducer
});

export default rootReducer;
