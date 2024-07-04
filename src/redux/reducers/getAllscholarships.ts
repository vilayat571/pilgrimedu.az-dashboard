import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface IinitialState {
  data: any;
  loading: boolean;
  error: string | null | undefined;
}

export const fetchScholarships = createAsyncThunk("/fetchScholarships", async () => {
  const url = `http://localhost:5000/api/v1/scholarships`;

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
  data: null,
  error: "",
  loading: false,
};

const getAllscholarships = createSlice({
  name: "getAllscholarships",
  reducers: {},
  initialState,
  extraReducers(builder) {
    builder.addCase(fetchScholarships.pending, (state) => {
      state.error = null;
      state.data = null;
      state.loading = true;
    });
    builder.addCase(fetchScholarships.fulfilled, (state, action) => {
      state.error = null;
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchScholarships.rejected, (state, action) => {
      state.error = action.error.message;
      state.data = null;
      state.loading = false;
    });
  },
});

export default getAllscholarships.reducer;
