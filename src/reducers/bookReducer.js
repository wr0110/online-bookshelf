export const ACTIONS = {
  ADD_TO_LIBRARY: "ADD_TO_LIBRARY",
};

//reducer to manage the library state
const libraryReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_TO_LIBRARY:
      const userToUpdate = action.payload.user;
      const userExists = state.library.find((shelf) => {
        console.log(shelf);
        return shelf.user === userToUpdate;
      });
      console.log(userExists);
      if (!userExists) {
        console.log(action.payload);
        return {
          library: (state.library = [
            {
              user: action.payload.user,
              userLibrary: [
                {
                  book: action.payload.book,
                  category: action.payload.category,
                },
              ],
            },

            ...state.library,
          ]),
        };
      } else {
        return {
          ...userExists,
          userLibrary: [
            {
              book: `${action.payload.book}`,
              category: action.payload.category,
            },

            ...userExists.userLibrary,
          ],
        };
      }

    // console.log(userExists);
    // return userExists;

    default:
      return state;
  }
};

export default libraryReducer;

/*    return [
        {
          user: action.payload.user,
          userBookShelf: [
            {book: action.payload.book, category: action.payload.category },
          ],
        },
        ...userBooks,
      ];*/

//    console.log(state.library);
//    return {
//      library: (state.library = {
//        book: action.payload.book,
//        category: action.payload.category,
//      }),

//      ...state.library,
//    };
