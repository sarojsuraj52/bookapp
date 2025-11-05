import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
  const response = await axios.get(
    "https://bookshistoryapp-default-rtdb.firebaseio.com/books.json"
  );
  const data = response.data;
  return Object.entries(data);
});

const bookSlice = createSlice({
  name: "books Data",
  initialState: {
    booksArray: [],
    recoverBooksArray: [],
    status: "idle",
    error: null,
  },
  reducers: {
    searchBookOnStore(state, action) {
      state.searchBookOnStore = action.payload;
    },
    search: (state, action) => {
      const query = action.payload.toLowerCase();
      const data = state.booksArray.filter((item) => {
        const book = item[1];
        return book.title.toLowerCase().includes(query);
      });
      console.log(data)

      // state.booksArray = state.booksArray.filter((book) => {
      //   const bookValues = Object.values(book[1]);
      //   return bookValues.some((value) =>
      //     String(value).toLowerCase().includes(query)
      //   );
      // });
    },
    sortByTitle(state, action) {
      state.booksArray = state.recoverBooksArray;
      if (action.payload) {
        state.booksArray = state.booksArray.sort((a, b) =>
          b[1].title.localeCompare(a[1].title)
        );
      } else {
        state.booksArray = state.booksArray.sort((a, b) =>
          a[1].title.localeCompare(b[1].title)
        );
      }
    },
    sortByPublicationDate(state, action) {
      state.booksArray = state.recoverBooksArray;
      if (action.payload) {
        state.booksArray = state.booksArray.sort((a, b) =>
          b[1].publicationDate.localeCompare(a[1].publicationDate)
        );
      } else {
        state.booksArray = state.booksArray.sort((a, b) =>
          a[1].publicationDate.localeCompare(b[1].publicationDate)
        );
      }
    },
    filterRead(state, action) {
      state.booksArray = state.recoverBooksArray;
      state.booksArray = state.booksArray.filter(
        (book) => book[1].readingStatus === "Read"
      );
    },
    filterUnRead(state, action) {
      state.booksArray = state.recoverBooksArray;
      state.booksArray = state.booksArray.filter(
        (book) => book[1].readingStatus === "Unread"
      );
    },
    filterReading(state, action) {
      state.booksArray = state.recoverBooksArray;
      state.booksArray = state.booksArray.filter(
        (book) => book[1].readingStatus === "Reading"
      );
    },
    clearFilter(state, action) {
      state.booksArray = state.recoverBooksArray;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = "success";
        state.booksArray = action.payload;
        state.recoverBooksArray = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {
  actions: bookActions,
  reducer: bookReducer,
  selectors: bookSelectors,
} = bookSlice;

export const addBook = createAsyncThunk("mySlice/AddBook", async (data) => {
  const response = await axios.post(
    "https://bookshistoryapp-default-rtdb.firebaseio.com/books.json",
    data
  );
  return response.data;
});

const POSTSlice = createSlice({
  name: "POSTSLICE",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addBook.pending, (state) => {
        state.loading = true;
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(addBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  actions: postActions,
  reducer: postReducer,
  selectors: postSelectors,
} = POSTSlice;

export const editBook = createAsyncThunk(
  "mySlice/editBook",
  async ({ data, id }) => {
    const response = await axios.put(
      `https://bookshistoryapp-default-rtdb.firebaseio.com/books/${id}.json`,
      data
    );
    return response.data;
  }
);

const PUTSlice = createSlice({
  name: "PUTSLICE",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(editBook.pending, (state) => {
        state.loading = true;
      })
      .addCase(editBook.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(editBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  actions: putActions,
  reducer: putReducer,
  selectors: putSelectors,
} = PUTSlice;

export const deleteBook = createAsyncThunk("mySlice/DeleteBook", async (id) => {
  const response = await axios.delete(
    `https://bookshistoryapp-default-rtdb.firebaseio.com/books/${id}.json`
  );
  return response.data;
});

const DELETESlice = createSlice({
  name: "DELETESlice",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    updateId(state, action) {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteBook.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  actions: deleteActions,
  reducer: deleteReducer,
  selectors: deleteSelectors,
} = DELETESlice;
