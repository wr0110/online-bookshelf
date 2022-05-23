import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  library: [],
  bookAlreadyInLibrary: false,
};

/**
 * addToLibrary
 * store the payload in a constant
 * retrieve the record of the current user from the library
 * if there is no record for the current user, create a new object with the payload information
 * if there is a record for the current user, check if the book they are adding already exists
 * update the bookAlreadyExists property and alert the user
 * if there is a current user and the book being added does not exist, add the book to their userLibrary
 */

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

//actions
export const { addBookToLibrary } = librarySlice.actions;

export default librarySlice.reducer;
