import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  library: [],
  bookAlreadyInLibrary: false,
};

const librarySlice = createSlice({
  name: "library",
  initialState,
  reducers: {
    addBookToLibrary: (state, action) => {
      const userToUpdate = action.payload;
      const currentUser = state.library.find(
        (shelf) => shelf.user === userToUpdate.user
      );

      if (!currentUser) {
        state.library.push({
          user: action.payload.user,
          userLibrary: [action.payload.selectedBook],
        });
      } else {
        const bookAlreadyExists = currentUser?.userLibrary.find(
          (record) =>
            record.book.id === userToUpdate.selectedBook.book.id &&
            record.category === userToUpdate.selectedBook.category
        );
        const duplicate = currentUser?.userLibrary.includes(bookAlreadyExists);

        if (duplicate) {
          state.bookAlreadyInLibrary = true;
          alert(
            `This book already exists in your ${bookAlreadyExists.category} shelf.`
          );
          return state;
        } else {
          currentUser.userLibrary.push(action.payload.selectedBook);
          state.bookAlreadyInLibrary = false;
        }
      }
    },
  },
});

export const { addBookToLibrary } = librarySlice.actions;
export default librarySlice.reducer;
