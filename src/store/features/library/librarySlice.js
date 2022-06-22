import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  library: [],
  bookAlreadyInLibraryCategory: "",
  feedback: {
    title: "",
    message: "",
    type: "",
  },
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
        state.feedback = {
          title: "Success",
          message: `${action.payload.selectedBook.title} has been added to your library`,
          type: "success",
        };
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
            state.feedback = {
              title: "Warning",
              message: `${action.payload.selectedBook.title} is already in your library`,
              type: "warning",
            };

            return state;
          } else {
            //if the categories are different, update the category of the bookAlreadyExists object
            bookAlreadyExists.category = userToUpdate.selectedBook.category;
            state.feedback = {
              title: "Success",
              message: `${action.payload.selectedBook.title} has been moved to ${userToUpdate.selectedBook.category}`,
              type: "success",
            };
          }
        } else {
          //if the book does not exist, add the book to the userLibrary array
          currentUser.userLibrary.unshift(action.payload.selectedBook);
          state.feedback = {
            title: "Success",
            message: `${action.payload.selectedBook.title} has been added to your library`,
            type: "success",
          };
        }
      }
    },
    checkIfBookAlreadyExistsInCurrentUserLibrary: (state, action) => {
      const userInfo = action.payload;

      //check if the current user exists
      const user = state.library.find((shelf) => shelf.user === userInfo.user);

      //check if the book exists in the current user's library
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

      // removing a book from the current user's library using the book id
      state.library = state.library.map((shelf) => {
        if (shelf.user === userToUpdate.user) {
          shelf.userLibrary = shelf.userLibrary.filter(
            (record) => record.bookData.id !== userToUpdate.bookId
          );
        }
        return shelf;
      });

      return state;
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
