import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  userCounts: {},
  data: [],
  notificationCount: 0,
  searchValueForReal: null,
  filterUnreadChat: 1,
  allUnreadChat: [],
  allChat: [],
  allPrivateChat: [],
  allWomensChat: [],
  allReadChat: [],
  scrollPosition: 0,
  searchValueForFake: null,
  searchValueForIncomplete: "",
  activeTab: "1",
};

const UserCounts = createSlice({
  name: "UserCounts",
  initialState,
  reducers: {
    addUsersCount: (state, action) => {
      state.userCounts = action.payload;
    },
    deleteuserId: (state, action) => {
      state.data = action.payload;
    },

    notificationBell: (state, action) => {
      state.notificationCount = action.payload;
    },

    userDetailsActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },

    saveSearchField: (state, action) => {
      state.searchValueForReal = action.payload;
    },

    saveSearchFieldForFake: (state, action) => {
      state.searchValueForFake = action.payload;
    },
    updateUnreadChat: (state, action) => {
      state.filterUnreadChat = action.payload;
    },
    allUnreadChatData: (state, action) => {
      state.allUnreadChat = action.payload;
    },
    allChatData: (state, action) => {
      state.allChat = action.payload;
    },
    privateChatData: (state, action) => {
      state.allPrivateChat = action.payload;
    },
    womensChatData: (state, action) => {
      state.allWomensChat = action.payload;
    },
    allReadChatData: (state, action) => {
      state.allReadChat = action.payload;
    },
    updateScrollPosition: (state, action) => {
      state.scrollPosition = action.payload;
    },
  },
});
export const {
  addUsersCount,
  deleteuserId,
  notificationBell,
  saveSearchField,
  userDetailsActiveTab,
  saveSearchFieldForFake,
  updateUnreadChat,
  allUnreadChatData,
  allReadChatData,
  allChatData,
  privateChatData,
  womensChatData,
  updateScrollPosition,
} = UserCounts.actions;
export default UserCounts.reducer;
