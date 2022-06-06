import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shelf: [],
  isShelfEmpty: true,
  currentBookShelves: [],
};

const shelfSlice = createSlice({
  name: "shelf",
  initialState,
  reducers: {
    createShelf: (state, action) => {
      const data = action.payload;

      //check if the user exists
      const userExists = state.shelf.find(
        (record) => record.user === data.user
      );

      if (!userExists) {
        //if the user does not exist add the new user to the shelf
        const newUser = {
          user: data.user,
          shelves: [data.shelf],
        };
        state.shelf.push(newUser);
      } else if (userExists) {
        //check if the shelf already exists
        const shelfExists = userExists.shelves.includes(data.shelf);

        if (shelfExists) {
          alert(`You already have a shelf called ${data.shelf}`);
          return state;
        } else {
          //if the shelf does not exist add the shelf
          userExists.shelves.push(data.shelf);
        }
      }
    },
    checkIfUserHasShelves: (state, action) => {
      const user = action.payload;
      const userExists = state.shelf.find((record) => record.user === user);

      if (userExists) {
        state.isShelfEmpty = userExists.shelves?.length === 0;
      } else {
        state.isShelfEmpty = true;
      }
    },
    addToShelf: (state, action) => {
      const data = action.payload; //bookData, shelf, user

      //find the user
      const user = state.shelf.find((record) => record.user === data.user);

      //add the book to the shelf for current user
      if (user) {
        //check if the booksOnShelves property exists
        if (!user.booksOnShelves) {
          user.booksOnShelves = [
            { bookData: data.bookData, shelf: [data.shelf] },
          ];
        } else if (user.booksOnShelves) {
          //check if the book they are trying to add already exists
          const bookExists = user.booksOnShelves.find(
            (book) => book.bookData.id === data.bookData.id
          );

          //if bookExists check if the bookExists shelf is the same as the shelf they are trying to add to
          if (bookExists) {
            //check if the shelf they are trying to add to already exists
            const shelfExists = bookExists.shelf.includes(data.shelf);
            if (shelfExists) {
              //find the index of the shelf and remove it
              bookExists.shelf.splice(bookExists.shelf.indexOf(data.shelf), 1);

              alert(
                `${data.bookData.title} has been removed from ${data.shelf}`
              );
            } else {
              //if the book exists but the shelves are different, update the shelf
              bookExists.shelf.push(data.shelf);
            }
          } else if (!bookExists) {
            user.booksOnShelves.push({
              bookData: data.bookData,
              shelf: [data.shelf],
            });
          }
        }
      }
    },
    getShelvesForCurrentBook: (state, action) => {
      const data = action.payload; //bookData, user

      //get booksOnShelves for the current user
      const user = state.shelf.find((record) => record.user === data.user);

      //get the booksOnShelves for the current book

      if (user) {
        const book = user.booksOnShelves?.find(
          (book) => book.bookData.id === data.bookData.id
        );

        if (book) {
          state.currentBookShelves = book.shelf;
        } else {
          state.currentBookShelves = [];
        }
      }
    },
  },
});

export const {
  createShelf,
  checkIfUserHasShelves,
  addToShelf,
  getShelvesForCurrentBook,
} = shelfSlice.actions;
export default shelfSlice.reducer;
