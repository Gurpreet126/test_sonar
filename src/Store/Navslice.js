import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  done: false,
  tab: "dashboardinfo",
};
const Navslice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    sideopen(state, action) {
      if (action) {
        state.status = action.payload;
      }
    },
    Over(state, action) {
      if (action) {
        state.done = action.payload;
      }
    },
    ActiveTab(state, action) {
      if (action) {
        state.tab = action.payload;
      }
    },
  },
});
export const { sideopen, Over, ActiveTab } = Navslice.actions;
export default Navslice.reducer;
