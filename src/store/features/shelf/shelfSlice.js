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
    renameShelf: (state, action) => {
      const data = action.payload; //newName, shelf, user

      //find the user
      const user = state.shelf.find((record) => record.user === data.user);

      //if user exists, find the shelf and update it and return new state
      if (user) {
        const shelf = user.shelves.find((shelf) => shelf === data.shelf);

        //find all the books on the shelf that includes the shelf they are trying to rename
        const booksOnShelf = user.booksOnShelves?.filter((book) =>
          book.shelf.includes(data.shelf)
        );

        if (shelf) {
          user.shelves[user.shelves.indexOf(shelf)] = data.newShelfName;

          //update the booksOnShelves with the new shelf name
          if (booksOnShelf) {
            booksOnShelf.forEach((book) => {
              book.shelf[book.shelf.indexOf(data.shelf)] = data.newShelfName;
            });
          }
        }
      }
    },
    removeShelf: (state, action) => {
      const data = action.payload; //shelf, user

      //find the user
      const user = state.shelf.find((record) => record.user === data.user);

      if (user) {
        const shelfToRemove = user.shelves.find(
          (shelf) => shelf === data.shelf
        );

        if (shelfToRemove) {
          //remove the shelf
          user.shelves.splice(user.shelves.indexOf(shelfToRemove), 1);

          //find all the books on the shelf that includes the shelfToRemove and remove it
          user.booksOnShelves?.forEach((book) => {
            book.shelf.splice(book.shelf.indexOf(shelfToRemove), 1);
          });

          alert(`Your ${shelfToRemove} shelf has been removed`);
        } else {
          alert(`You do not have a ${data.shelf} shelf`);
        }
      }
    },
    removeBookFromAllShelves: (state, action) => {
      const data = action.payload; //bookId, user

      //find the user
      const user = state.shelf.find((record) => record.user === data.user);

      if (user) {
        //remove the book from all shelves
        user.booksOnShelves?.forEach((book) => {
          if (book.bookData.id === data.bookId) {
            user.booksOnShelves.splice(user.booksOnShelves.indexOf(book), 1);
          }
        });
      }
    },
  },
});

export const {
  createShelf,
  checkIfUserHasShelves,
  addToShelf,
  getShelvesForCurrentBook,
  renameShelf,
  removeShelf,
  removeBookFromAllShelves,
} = shelfSlice.actions;
export default shelfSlice.reducer;
