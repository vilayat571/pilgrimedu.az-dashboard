import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiURL } from "../../constants/URL";
import { IData } from "../../pages/Scholarships/Scholarships";

export interface IinitialState {
  scholarships: IData[] | null;
  loading: boolean;
  error: string | null | undefined;
}

export const fetchScholarships = createAsyncThunk("/fetchScholarships", async () => {
  const url = `${apiURL}/scholarships`;

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
  scholarships: null,
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
      state.scholarships = null;
      state.loading = true;
    });
    builder.addCase(fetchScholarships.fulfilled, (state, action) => {
      state.error = null;
      state.scholarships = action.payload.scholarships;
      state.loading = false;
    });
    builder.addCase(fetchScholarships.rejected, (state, action) => {
      state.error = action.error.message;
      state.scholarships = null;
      state.loading = false;
    });
  },
});

export default getAllscholarships.reducer;
