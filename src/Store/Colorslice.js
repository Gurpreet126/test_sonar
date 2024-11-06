import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  navbarcolor: "black",
  sidebarcolor: "#212121",
  color: "red",
};

const Color = createSlice({
  name: "color",
  initialState,
  reducers: {
    navcolor: (state, action) => {
      state.navbarcolor = action.payload;
    },
    sidecolor: (state, action) => {
      state.sidebarcolor = action.payload;
    },
    color: (state, action) => {
      state.color = action.payload;
    },
  },
});
export const { navcolor, sidecolor, color } = Color.actions;
export default Color.reducer;
