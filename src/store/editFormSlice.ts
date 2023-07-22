import { createSlice } from "@reduxjs/toolkit";
import { edit_user, get_user } from "./usersSlice";

type InitialState = {
  open: boolean;
};

const initialState: InitialState = {
  open: false,
};

const editFormSlice = createSlice({
  name: "editUser",
  initialState,
  reducers: {
    // close form
    closeForm: (state) => {
      state.open = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // get user
      .addCase(get_user.fulfilled, (state) => {
        state.open = true;
      })
      // edit user
      .addCase(edit_user.fulfilled, (state) => {
        state.open = false;
      });
  },
});

export const { closeForm } = editFormSlice.actions;

export default editFormSlice.reducer;
