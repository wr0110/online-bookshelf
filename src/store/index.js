import { configureStore } from "@reduxjs/toolkit";
import library from "./features/library/librarySlice";

export const store = configureStore({
  reducer: {
    bookStore: library,
  },
});
