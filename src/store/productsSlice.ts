import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Global_State from "../types/global_state.type";

type Product = {
  // id: number;
  title: string;
  image: File;
  description: string;
};

type InitialState = {
  products: Product[];
  product: Product;
  loading: boolean;
  error: string;
};

const initialState: InitialState = {
  products: [],
  product: {} as Product,
  loading: false,
  error: "",
};

export const create_product = createAsyncThunk(
  "products/create_product",
  async (values: Product, ThunkAPI) => {
    // create form_data object
    const form_data = new FormData();

    // append data to form_data object
    form_data.append("title", values.title);
    form_data.append("description", values.description);
    form_data.append("image", values.image);

    // request url
    const url = "http://127.0.0.1:8000/api/product/create";

    // get token for authorization
    const token = (ThunkAPI.getState() as Global_State).auth.token;

    await axios.post(url, form_data, {
      headers: { Authorization: "Bearer " + token },
    });

    return;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  // extraReducers: (builder) => {},
});

// export const {} = productsSlice.actions;

export default productsSlice.reducer;
