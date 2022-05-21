import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  library: [],
  bookAlreadyInLibrary: false,
};

const librarySlice = createSlice({
  name: "library",
  initialState,
  reducers: {
    addBookToLibrary: () => {},
  },
});

export const { addBookToLibrary } = librarySlice.actions;
export default librarySlice.reducer;
