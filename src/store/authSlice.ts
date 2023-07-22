import User from "../types/user.type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type InitialState = {
  token: string;
  user: User | null;
};

const initialState: InitialState = {
  token: "",
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthData: (state, { payload }: PayloadAction<InitialState>) => {
      state.token = payload.token;
      state.user = payload.user;
    },
    resetAuthData: (state) => {
      state.token = "";
      state.user = null;
    },
  },
});

export const { setAuthData, resetAuthData } = authSlice.actions;

export default authSlice.reducer;
