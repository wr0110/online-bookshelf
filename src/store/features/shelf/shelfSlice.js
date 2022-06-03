import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shelf: [],
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
          booksOnShelves: [],
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
  },
});

export const { createShelf } = shelfSlice.actions;
export default shelfSlice.reducer;
