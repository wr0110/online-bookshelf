import { configureStore } from "@reduxjs/toolkit";
import library from "./features/library/librarySlice";
import shelf from "./features/shelf/shelfSlice";

export const store = configureStore({
  reducer: {
    bookStore: library,
    bookShelf: shelf,
  },
});
