import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  data: [],
  editdata: [],
};
const editNotifications = createSlice({
  name: "editNotifications",
  initialState,
  reducers: {
    userinfo: (state, action) => {
      state.data = action.payload;
    },
    editadmin: (state, action) => {
      state.editdata = action.payload;
    },
  },
});
export const { userinfo, editadmin } = editNotifications.actions;
export default editNotifications.reducer;
