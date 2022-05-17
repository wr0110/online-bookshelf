export const ACTIONS = {
  ADD_TO_LIBRARY: "ADD_TO_LIBRARY",
};

//reducer to manage the library state
const libraryReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_TO_LIBRARY:
      const userToUpdate = action.payload.user;
      const userExists = state.library.find(
        (shelf) => shelf.user === userToUpdate
      );

      if (!userExists) {
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
      } else if (userExists) {
        console.log(userExists);
        return userExists;
      }

      break;

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
