import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shelf: [],
};

const shelfSlice = createSlice({
  name: "shelf",
  initialState,
  reducers: {},
});

export default shelfSlice.reducer;
