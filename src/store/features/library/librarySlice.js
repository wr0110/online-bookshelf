import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  library: [],
  bookAlreadyInLibraryCategory: "",
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

      //if the user is new to the library, create a new shelf for them
      if (!currentUser) {
        state.library.push({
          user: action.payload.user,
          userLibrary: [action.payload.selectedBook],
        });
      } else {
        //if the user exists, check if the book they are trying to add already exists in their library
        const bookAlreadyExists = currentUser?.userLibrary.find((record) => {
          return record.bookData.id === userToUpdate.selectedBook.bookData.id;
        });

        //if the bookExists check if the book category already exists
        if (bookAlreadyExists) {
          //if the categories are the same, alert the user that the book is already in the library
          if (
            bookAlreadyExists.category === userToUpdate.selectedBook.category
          ) {
            alert(
              `This book is already in your ${bookAlreadyExists.category} shelf`
            );
            return state;
          } else {
            //if the categories are different, update the category of the bookAlreadyExists object
            bookAlreadyExists.category = userToUpdate.selectedBook.category;
          }
        } else {
          //if the book does not exist, add the book to the userLibrary array
          currentUser.userLibrary.push(action.payload.selectedBook);
        }
      }
    },
    checkIfBookAlreadyExistsInCurrentUserLibrary: (state, action) => {
      const userInfo = action.payload;

      const user = state.library.find((shelf) => shelf.user === userInfo.user);
      if (user) {
        const bookAlreadyExists = user.userLibrary.find(
          (record) => record.bookData.id === userInfo.bookData.id
        );

        bookAlreadyExists
          ? (state.bookAlreadyInLibraryCategory = bookAlreadyExists.category)
          : (state.bookAlreadyInLibraryCategory = "");
      }
    },
    removeBookFromLibrary: (state, action) => {
      const userToUpdate = action.payload; //email, bookid
      const currentUser = state.library.find(
        (shelf) => shelf.user === userToUpdate.user
      );

      //removing a book from the library using the book id
      currentUser.userLibrary.filter(
        (record) => record.bookData.id !== userToUpdate.bookId
      );
    },
  },
});

//actions
export const {
  addBookToLibrary,
  checkIfBookAlreadyExistsInCurrentUserLibrary,
  removeBookFromLibrary,
} = librarySlice.actions;

export default librarySlice.reducer;
