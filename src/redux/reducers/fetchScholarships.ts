import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IData } from "../../pages/Scholarships/Scholarships";

export interface IinitialState {
  scholarships: IData[] | null;
  loading: boolean;
  error: string | null | undefined;
}

export const getAllscholarships = createAsyncThunk(
  "/getAllscholarships",
  async () => {
    const url = `https://pilgrimedu.az/api/v1/scholarships`;

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
  }
);

const initialState: IinitialState = {
  scholarships: null,
  error: "",
  loading: false,
};

const fetchScholarships = createSlice({
  name: "fetchScholarships",
  reducers: {},
  initialState,
  extraReducers(builder) {
    builder.addCase(getAllscholarships.pending, (state) => {
      state.error = null;
      state.scholarships = null;
      state.loading = true;
    });
    builder.addCase(getAllscholarships.fulfilled, (state, action) => {
      state.error = null;
      state.scholarships = action.payload.scholarships;
      state.loading = false;
    });
    builder.addCase(getAllscholarships.rejected, (state, action) => {
      state.error = action.error.message;
      state.scholarships = null;
      state.loading = false;
    });
  },
});

export default fetchScholarships.reducer;
