import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./usersSlice";
import toastReducer from "./toastSlice";
import editUserReducer from "./editUserSlice";

const store = configureStore({
  reducer: {
    users: usersReducer,
    toast: toastReducer,
    editUser: editUserReducer,
  },
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
