export const ACTIONS = {
  ADD_TO_LIBRARY: "ADD_TO_LIBRARY",
};

export const initalState = {
  library: [],
  totalBooks: 0,
};

//reducer to manage the library state
const libraryReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_TO_LIBRARY:
      const userToUpdate = action.payload;

      const currentUser = state.library.find(
        (shelf) => shelf.user === userToUpdate.user
      );

      /**
       * if the current user does not exist update the library
       * add a new object with the current user and the boook details to add
       * copy the state, create library array
       * add new object
       * copy the rest of the library
       */
      if (!currentUser) {
        return {
          ...state,
          library: [
            {
              user: action.payload.user,
              userLibrary: [action.payload.selectedBook],
            },
            ...state.library,
          ],
        };
      } else {
        /**
         * if the current user already exists , check if the book being added already exists
         * if the book exists then return the current state
         * if it is a new book copy the state, update the library array
         * copy the the current user object and update their library by adding the new book
         * copy the rest of the current user's library
         */

        const bookAlreadyExists = currentUser?.userLibrary.find(
          (record) =>
            record.book.title === userToUpdate.selectedBook.book.title &&
            record.category === userToUpdate.selectedBook.category
        );
        const duplicate = currentUser?.userLibrary.includes(bookAlreadyExists);

        if (duplicate) {
          console.log("book exists");
          return state;
        } else {
          return {
            ...state,
            library: [
              {
                ...currentUser,
                userLibrary: [
                  action.payload.selectedBook,
                  ...currentUser.userLibrary,
                ],
              },
            ],
          };
        }
      }

    default:
      return state;
  }
};

export default libraryReducer;
