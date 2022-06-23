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
      const data = action.payload;
      const currentUser = state.library.find(
        (shelf) => shelf.user === data.user
      );

      //if the user is new to the library, create a new shelf for them
      if (!currentUser) {
        state.library.push({
          user: action.payload.user,
          userLibrary: [action.payload.selectedBook],
        });
        state.feedback = {
          title: "Success",
          message: `${data.selectedBook.bookData.title} has been added to your library`,
          type: "success",
        };
      } else {
        //if the user exists, check if the book they are trying to add already exists in their library
        const bookAlreadyExists = currentUser?.userLibrary.find((record) => {
          return record.bookData.id === data.selectedBook.bookData.id;
        });

        //if the bookExists check if the book category already exists
        if (bookAlreadyExists) {
          //if the categories are the same, alert the user that the book is already in the library
          if (bookAlreadyExists.category === data.selectedBook.category) {
            state.feedback = {
              title: "Warning",
              message: `${data.selectedBook.bookData.title} is already on your ${data.selectedBook.category} shelf.`,
              type: "warning",
            };
          } else {
            //if the categories are different, update the category of the bookAlreadyExists object
            bookAlreadyExists.category = data.selectedBook.category;
            state.feedback = {
              title: "Information",
              message: `${data.selectedBook.bookData.title} has been moved to the ${data.selectedBook.category} shelf.`,
              type: "info",
            };
          }
        } else {
          //if the book does not exist, add the book to the userLibrary array
          currentUser.userLibrary.unshift(action.payload.selectedBook);
          state.feedback = {
            title: "Success",
            message: `${data.selectedBook.bookData.title} has been added to your library.`,
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
      const data = action.payload; //email, bookid

      // removing a book from the current user's library using the book id
      state.library = state.library.map((shelf) => {
        if (shelf.user === data.user) {
          shelf.userLibrary = shelf.userLibrary.filter(
            (record) => record.bookData.id !== data.bookId
          );
        }
        return shelf;
      });

      state.feedback = {
        title: "Information",
        message: `${data.bookTitle} has been removed from your library.`,
        type: "info",
      };

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
