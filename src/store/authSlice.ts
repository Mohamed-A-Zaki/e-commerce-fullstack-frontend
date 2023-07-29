import axios, { AxiosResponse } from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import User from "../types/user.type";
import Global_State from "../types/global_state.type";
import { Auth_Res_Data, LoginData, SignupData } from "../types/auth.type";

type InitialState = {
  token: string;
  user: User | null;
};

const initialState: InitialState = {
  token: "",
  user: null,
};

export const sign_up = createAsyncThunk(
  "auth/sign_up",
  async (values: SignupData) => {
    const url = "http://127.0.0.1:8000/api/register";
    const res: AxiosResponse<Auth_Res_Data> = await axios.post(url, values);
    return res.data.data;
  }
);

export const log_in = createAsyncThunk(
  "auth/log_in",
  async (values: LoginData) => {
    const url = "http://127.0.0.1:8000/api/login";
    const res: AxiosResponse<Auth_Res_Data> = await axios.post(url, values);
    return res.data.data;
  }
);

export const log_out = createAsyncThunk("auth/log_out", async (_, ThunkAPI) => {
  const url = "http://127.0.0.1:8000/api/logout";
  const token = (ThunkAPI.getState() as Global_State).auth.token;

  await axios.post(url, null, {
    headers: { Authorization: "Bearer " + token },
  });

  return;
});

// export const refresh_token = createAsyncThunk(
//   "auth/refresh_token",
//   async (_, ThunkAPI) => {
//     const url = "http://127.0.0.1:8000/api/refresh";
//     const { data }: AxiosResponse<InitialState> = await axios.post(url, null, {
//       headers: {
//         Authorization:
//           "Bearer " + (ThunkAPI.getState() as Global_State).auth.token,
//       },
//     });
//     return data.token;
//   }
// );

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // sign up fulfilled
      .addCase(sign_up.fulfilled, (state, { payload }) => {
        state.token = payload.token;
        state.user = payload.user;
      })
      // log in fulfilled
      .addCase(log_in.fulfilled, (state, { payload }) => {
        state.token = payload.token;
        state.user = payload.user;
      })
      // log out fulfilled
      .addCase(log_out.fulfilled, (state) => {
        state.token = "";
        state.user = null;
      });
    // .addCase(refresh_token.fulfilled, (state, { payload }) => {
    //   state.token = payload;
    // });
  },
});

export default authSlice.reducer;
