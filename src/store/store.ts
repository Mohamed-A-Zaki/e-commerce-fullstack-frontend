import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./usersSlice";
import toastReducer from "./toastSlice";
import editFormReducer from "./editFormSlice";
import authReducer from "./authSlice";
import productsReducer from "./productsSlice";

const store = configureStore({
  reducer: {
    users: usersReducer,
    toast: toastReducer,
    editForm: editFormReducer,
    auth: authReducer,
    products: productsReducer,
  },
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
