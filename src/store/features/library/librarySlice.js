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
          userLibrary: [
            {
              bookData: action.payload.selectedBook.bookData,
              category: [action.payload.selectedBook.category],
            },
          ],
        });
      } else {
        //if the user exists, check if the book they are trying to add already exists in their library
        const bookAlreadyExists = currentUser?.userLibrary.find((record) => {
          return record.bookData.id === userToUpdate.selectedBook.bookData.id;
        });

        //if the bookExists check if the book category already exists in bookAlreadyExistsCategory array
        if (bookAlreadyExists) {
          state.bookAlreadyInLibrary = true;

          // get the category array from bookAlreadyExists
          const bookAlreadyExistsCategory = bookAlreadyExists.category;

          //check if the category already exists in the bookAlreadyExistsCategory array
          const categoryAlreadyExists = bookAlreadyExistsCategory.includes(
            userToUpdate.selectedBook.category
          );

          if (categoryAlreadyExists) {
            //if the category already exists, alert the user that the book of this category already exists in their library
            alert(
              `This book is already in your library under the category ${userToUpdate.selectedBook.category}`
            );
          } else {
            //if the category does not exist, add the category to the bookAlreadyExistsCategory array
            bookAlreadyExistsCategory.push(userToUpdate.selectedBook.category);
          }
        } else {
          //if the book does not exist, add the book to the userLibrary array
          currentUser.userLibrary.push({
            bookData: userToUpdate.selectedBook.bookData,
            category: [userToUpdate.selectedBook.category],
          });
        }
      }
    },
  },
});

//actions
export const { addBookToLibrary } = librarySlice.actions;

export default librarySlice.reducer;
