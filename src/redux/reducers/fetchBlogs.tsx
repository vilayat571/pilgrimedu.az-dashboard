import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface IITEM {
    _id?: string | undefined;
    title?: string;
    date?: string;
    thumbnail?: string | File;
    description?:string, 
    body?: string | undefined | null;
  }

export interface IinitialState {
  blogs: IITEM[] | null;
  loading: boolean;
  error: string | null | undefined;
}

export const getBlogs = createAsyncThunk("/getBlogs", async () => {
  const url = `https://pilgrimedu.az/api/v1/v1/blogs`;

  const response = await fetch(url, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  });
  return response.json();
});

const initialState: IinitialState = {
  blogs: null,
  error: "",
  loading: false,
};

const fetchBlogs = createSlice({
  name: "fetchBlogs",
  reducers: {},
  initialState,
  extraReducers(builder) {
    builder.addCase(getBlogs.pending, (state) => {
      state.error = null;
      state.blogs = null;
      state.loading = true;
    });
    builder.addCase(getBlogs.fulfilled, (state, action) => {
      state.error = null;
      console.log(action.payload)
      state.blogs = action.payload.blogs;
      state.loading = false;
    });
    builder.addCase(getBlogs.rejected, (state, action) => {
      state.error = action.error.message;
      state.blogs = null;
      state.loading = false;
    });
  },
});

export default fetchBlogs.reducer;
