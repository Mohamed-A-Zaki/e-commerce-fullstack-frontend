import User from "./../types/user.type";
import axios, { AxiosResponse } from "axios";
import SignupData from "../types/SignupData.type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type InitialState = {
  open: boolean;
  user: User;
};

const initialState: InitialState = {
  open: false,
  user: {} as User,
};

export const get_user = createAsyncThunk(
  "editUser/get_user",
  async (id: number) => {
    const url = `http://127.0.0.1:8000/api/user/showbyid/${id}`;
    const { data }: AxiosResponse<User[]> = await axios.get(url);
    return data[0];
  }
);

export const edit_user = createAsyncThunk(
  "editUser/edit_user",
  async ({ id, values }: { id: number; values: SignupData }) => {
    await axios.post(`http://127.0.0.1:8000/api/user/update/${id}`, values);
    return id;
  }
);

const editUserSlice = createSlice({
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
      .addCase(get_user.fulfilled, (state, action) => {
        state.user = action.payload;
        state.open = true;
      })
      // edit user
      .addCase(edit_user.fulfilled, (state) => {
        state.open = false;
      });
  },
});

export const { closeForm } = editUserSlice.actions;

export default editUserSlice.reducer;
