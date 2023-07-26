import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosResponse } from "axios";
import Global_State from "../types/global_state.type";
import Product from "../types/product.type";

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

export const get_products = createAsyncThunk(
  "products/get_products",
  async (_, ThunkAPI) => {
    // request url
    const url = "http://127.0.0.1:8000/api/product/show";

    // get token for authorization
    const token = (ThunkAPI.getState() as Global_State).auth.token;

    const { data }: AxiosResponse<Product[]> = await axios.get(url, {
      headers: { Authorization: "Bearer " + token },
    });

    return data;
  }
);

export const create_product = createAsyncThunk(
  "products/create_product",
  async (values: Omit<Product, "id">, ThunkAPI) => {
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

export const delete_product = createAsyncThunk(
  "products/delete_product",
  async (id: number, ThunkAPI) => {
    // request url
    const url = `http://127.0.0.1:8000/api/product/delete/${id}`;

    // get token for authorization
    const token = (ThunkAPI.getState() as Global_State).auth.token;

    await axios.delete(url, {
      headers: { Authorization: "Bearer " + token },
    });

    return id;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(get_products.pending, (state) => {
        state.loading = true;
      })
      .addCase(get_products.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.products = payload;
      })
      .addCase(get_products.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message as string;
      })

      .addCase(delete_product.fulfilled, (state, { payload }) => {
        state.products = state.products.filter((ele) => ele.id !== payload);
      });
  },
});

// export const {} = productsSlice.actions;

export default productsSlice.reducer;
