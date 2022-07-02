import { configureStore } from "@reduxjs/toolkit";
import library from "./features/library/librarySlice";
import shelf from "./features/shelf/shelfSlice";
import { apiSlice } from "./features/api/apiSlice";

export const store = configureStore({
  reducer: {
    bookStore: library,
    bookShelf: shelf,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
