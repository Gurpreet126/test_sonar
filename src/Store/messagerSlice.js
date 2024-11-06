import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  selectedUserChatID: null,
};

const messagerSlice = createSlice({
  name: "messagerSlice",
  initialState,
  reducers: {
    currentChatid: (state, action) => {
      state.selectedUserChatID = action.payload;
    },
  },
});
export const { currentChatid } = messagerSlice.actions;
export default messagerSlice.reducer;
