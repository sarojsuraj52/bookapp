import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getStoreBooks = createAsyncThunk(
  "books/getStoreBooks",
  async (query) => {
    const API_KEY = "AIzaSyD8A8Zf1fNPsmJAoLxd5hNtYwidx47yiVc";
    let response;
    if (query.length !== 0) {
      response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${API_KEY}&maxResults=40`
      );
      return response.data.items;
    }
  }
);

const bookStoreSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStoreBooks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getStoreBooks.fulfilled, (state, action) => {
        state.status = "success";
        state.books = action.payload;
      })
      .addCase(getStoreBooks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {
  actions: bookStoreActions,
  reducer: bookStoreReducer,
  selectors: bookStoreSelectors,
} = bookStoreSlice;

export const getCart = createAsyncThunk("books/cart", async () => {
  const response = await axios.get(
    `https://bookshistoryapp-default-rtdb.firebaseio.com/cart.json`
  );
  return Object.entries(response.data);
});


const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    total: 0,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.status = "success";
        state.cart = action.payload;
        state.total = state.cart.reduce((total, item) => {
          const price = item[1].price;
          return total + price;
          }, 0);
      })
      .addCase(getCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});


export const {
  actions: cartActions,
  reducer: cartReducer,
  selectors: cartSelectors,
} = cartSlice;


export const addToCart = createAsyncThunk("books/addtocart", async (data) => {
  const response = await axios.post(
    "https://bookshistoryapp-default-rtdb.firebaseio.com/cart.json",
    data
  );
  return response.data;
});

const addToCartSlice = createSlice({
  name: "addToCartSLICE",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  actions: addToCartActions,
  reducer: addToCartReducer,
  selectors: addToCartSelectors,
} = addToCartSlice;


export const deleteCartItem = createAsyncThunk("books/deleteCartItem", async (data) => {
  const response = await axios.post(
    "https://bookshistoryapp-default-rtdb.firebaseio.com/cart.json",
    data
  );
  return response.data;
});

const deleteCartItemSlice = createSlice({
  name: "deleteCartItemSLICE",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteCartItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  actions: deleteCartItemActions,
  reducer: deleteCartItemReducer,
  selectors: deleteCartItemSelectors,
} = deleteCartItemSlice;
