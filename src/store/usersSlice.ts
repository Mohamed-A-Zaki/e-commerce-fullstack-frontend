import axios, { AxiosResponse } from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import User from "../types/user.type";
import SignupData from "../types/SignupData.type";

type InitialState = {
  users: User[];
  user: User;
  error: string;
  loading: boolean;
};

const initialState: InitialState = {
  users: [],
  user: {} as User,
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

export const get_user = createAsyncThunk(
  "editUser/get_user",
  async (id: number) => {
    const url = `http://127.0.0.1:8000/api/user/showbyid/${id}`;
    const { data }: AxiosResponse<User[]> = await axios.get(url);
    return data[0];
  }
);

export const edit_user = createAsyncThunk(
  "users/edit_user",
  async ({ id, values }: { id: number; values: SignupData }) => {
    await axios.post(`http://127.0.0.1:8000/api/user/update/${id}`, values);
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
      })

      // get user
      .addCase(get_user.fulfilled, (state, action) => {
        state.user = action.payload;
      })

      // edit user
      .addCase(edit_user.fulfilled, (state, { meta }) => {
        const { id, values } = meta.arg;
        state.users.map((user) => {
          if (user.id === id) {
            user.email = values.email;
            user.name = values.name;
          }
        });
      });
  },
});

export default usersSlice.reducer;
