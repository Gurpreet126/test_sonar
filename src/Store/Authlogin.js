import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  data: [],
};

const Authlogin = createSlice({
  name: "Authlogin",
  initialState,
  reducers: {
    authlogin: (state, action) => {
      state.data = action.payload;
    },
    authlogout: (state) => {
      state.data.isActive = false;
    },
  },
});
export const { authlogin, authlogout } = Authlogin.actions;
export default Authlogin.reducer;
