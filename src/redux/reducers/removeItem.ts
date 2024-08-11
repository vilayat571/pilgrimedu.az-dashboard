import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiURL } from "../../constants/URL";

export interface IinitialState {
  questions: any;
  loading: boolean;
  error: string | null | undefined;
}

export const rmvQuestion = createAsyncThunk(
  "/rmvQuestion",
  async ({ id }: { id: string }) => {
    const url = `${apiURL}/questions/delete/${id}`;

    const response = await fetch(url, {
      method: "DELETE",
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
  questions: "",
  error: "",
  loading: false,
};

const removeItem = createSlice({
  name: "removeItem",
  reducers: {},
  initialState,
  extraReducers(builder) {
    builder.addCase(rmvQuestion.pending, (state) => {
      state.error = null;
      state.loading = true;
    });
    builder.addCase(rmvQuestion.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.questions = action.payload;
    });
    builder.addCase(rmvQuestion.rejected, (state, action) => {
      state.loading = false;
      state.questions = null;
      state.error = action.error.message;
    });
  },
});

export default removeItem.reducer;
