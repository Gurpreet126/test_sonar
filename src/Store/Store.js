import { combineReducers, configureStore } from "@reduxjs/toolkit";
import Navslice from "./Navslice";
import Color from "./Colorslice";
import Authlogin from "./Authlogin";
import editNotification from "./editNotification";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import UserCounts from "./userStore";
import messagerSlice from "./messagerSlice";

const reducers = combineReducers({
  Navslice,
  Color,
  Authlogin,
  editNotification,
  UserCounts,
  messagerSlice,
});
const persistConfig = {
  key: "0.4",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);
