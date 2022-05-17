export const ACTIONS = {
  ADD_TO_LIBRARY: "ADD_TO_LIBRARY",
};

//reducer to manage the library state
const libraryReducer = (userBooks, action) => {
  switch (action.type) {
    case ACTIONS.ADD_TO_LIBRARY:
      return [
        {
          user: action.payload.user,
          userBookShelf: [
            { id: action.payload.bookId, category: action.payload.category },
          ],
        },
        ...userBooks,
      ];
    default:
      return userBooks;
  }
};

export default libraryReducer;
