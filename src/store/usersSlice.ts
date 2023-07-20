import User from "../types/user.type";
import axios, { AxiosResponse } from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type InitialState = {
  users: User[];
  error: string;
  loading: boolean;
};

const initialState: InitialState = {
  users: [],
  error: "",
  loading: true,
};

export const get_users = createAsyncThunk("users/get_users", async () => {
  const url = "http://127.0.0.1:8000/api/user/show";
  const { data }: AxiosResponse<User[]> = await axios.get(url);
  return data;
});

export const delete_user = createAsyncThunk(
  "users/delete_user",
  async (id: number) => {
    await axios.delete(`http://127.0.0.1:8000/api/user/delete0/${id}`);
    return id;
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get users list
      .addCase(get_users.pending, (state) => {
        state.loading = true;
      })
      .addCase(get_users.fulfilled, (state, { payload }) => {
        state.users = payload;
        state.loading = false;
      })
      .addCase(get_users.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message as string;
      })
      // delete user
      .addCase(delete_user.fulfilled, (state, { payload }) => {
        state.users = state.users.filter((ele) => ele.id !== payload);
      });
  },
});

export default usersSlice.reducer;
