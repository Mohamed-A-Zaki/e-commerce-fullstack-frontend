import axios, { AxiosResponse } from "axios";
import User from "../types/user.type";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Global_State from "../types/global_state.type";

type InitialState = {
  token: string;
  user: User | null;
};

const initialState: InitialState = {
  token: "",
  user: null,
};

export const refresh_token = createAsyncThunk(
  "auth/refresh_token",
  async (_, ThunkAPI) => {
    const url = "http://127.0.0.1:8000/api/refresh";
    const { data }: AxiosResponse<InitialState> = await axios.post(url, null, {
      headers: {
        Authorization:
          "Bearer " + (ThunkAPI.getState() as Global_State).auth.token,
      },
    });
    return data.token;
  }
);

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
  extraReducers: (builder) => {
    builder.addCase(refresh_token.fulfilled, (state, { payload }) => {
      state.token = payload;
    });
  },
});

export const { setAuthData, resetAuthData } = authSlice.actions;

export default authSlice.reducer;
