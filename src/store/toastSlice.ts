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
    showToast: (state, { payload }: PayloadAction<string>) => {
      state.open = true;
      state.message = payload;
    },
    hideToast: (state) => {
      state.open = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(delete_user.rejected, (state, { error }) => {
        state.open = true;
        state.message = error.message as string;
      })
      .addCase(get_user.rejected, (state, { error }) => {
        state.open = true;
        state.message = error.message as string;
      })
      .addCase(edit_user.rejected, (state, { error }) => {
        state.open = true;
        state.message = error.message as string;
      });
  },
});

export const { hideToast, showToast } = toastSlice.actions;

export default toastSlice.reducer;
