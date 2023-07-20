import { edit_user, get_user } from "./editUserSlice";
import { delete_user } from "./usersSlice";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type InitialState = {
  open: boolean;
  message: string;
};

const initialState: InitialState = {
  open: false,
  message: "",
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    // show toast message
    showToast: (state, { payload }: PayloadAction<string>) => {
      state.open = true;
      state.message = payload;
    },
    // hide toast message
    hideToast: (state) => {
      state.open = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // rejected case - delete user
      .addCase(delete_user.rejected, (state, { error }) => {
        state.open = true;
        state.message = error.message as string;
      })
      // rejected case - get user
      .addCase(get_user.rejected, (state, { error }) => {
        state.open = true;
        state.message = error.message as string;
      })
      // rejected case - edit user
      .addCase(edit_user.rejected, (state, { error }) => {
        state.open = true;
        state.message = error.message as string;
      });
  },
});

export const { hideToast, showToast } = toastSlice.actions;

export default toastSlice.reducer;
