import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface IinitialState {
  count: number | string | null;
  loading: boolean;
  error: string | null | undefined;
}

export const countOfQuestions = createAsyncThunk("/getCount", async () => {
  const url = `http://localhost:5000/api/v1/questions`;

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
  count: null,
  error: "",
  loading: false,
};

const questionsCount = createSlice({
  name: "questionsCount",
  reducers: {},
  initialState,
  extraReducers(builder) {
    builder.addCase(countOfQuestions.pending, (state) => {
      state.error = null;
      state.count = null;
      state.loading = true;
    });
    builder.addCase(countOfQuestions.fulfilled, (state, action) => {
      state.error = null;
      state.count = action.payload.count;
      state.loading = false;
    });
    builder.addCase(countOfQuestions.rejected, (state, action) => {
      state.error = action.error.message;
      state.count = null;
      state.loading = false;
    });
  },
});

export default questionsCount.reducer;
