import axios, { AxiosResponse } from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import User from "../types/user.type";
import SignupData from "../types/SignupData.type";
import Global_State from "../types/global_state.type";

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

// get all users
export const get_users = createAsyncThunk(
  "users/get_users",
  async (_, ThunkAPI) => {
    const url = "http://127.0.0.1:8000/api/user/show";
    const token = (ThunkAPI.getState() as Global_State).auth.token;

    const { data }: AxiosResponse<User[]> = await axios.get(url, {
      headers: { Authorization: "Bearer " + token },
    });

    return data;
  }
);

// get one user
export const get_user = createAsyncThunk(
  "editUser/get_user",
  async (id: number, ThunkAPI) => {
    const url = `http://127.0.0.1:8000/api/user/showbyid/${id}`;
    const token = (ThunkAPI.getState() as Global_State).auth.token;

    const { data }: AxiosResponse<User[]> = await axios.get(url, {
      headers: { Authorization: "Bearer " + token },
    });

    return data[0];
  }
);

// create a new user
export const create_user = createAsyncThunk(
  "users/create_user",
  async (values: SignupData, ThunkAPI) => {
    const url = "http://127.0.0.1:8000/api/user/create";
    const token = (ThunkAPI.getState() as Global_State).auth.token;

    await axios.post(url, values, {
      headers: { Authorization: "Bearer " + token },
    });

    return;
  }
);

// delete user
export const delete_user = createAsyncThunk(
  "users/delete_user",
  async (id: number, ThunkAPI) => {
    const url = `http://127.0.0.1:8000/api/user/delete/${id}`;
    const token = (ThunkAPI.getState() as Global_State).auth.token;

    await axios.delete(url, {
      headers: { Authorization: "Bearer " + token },
    });

    return id;
  }
);

// edit user
export const edit_user = createAsyncThunk(
  "users/edit_user",
  async ({ id, values }: { id: number; values: SignupData }, ThunkAPI) => {
    const url = `http://127.0.0.1:8000/api/user/update/${id}`;
    const token = (ThunkAPI.getState() as Global_State).auth.token;

    await axios.post(url, values, {
      headers: { Authorization: "Bearer " + token },
    });

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
