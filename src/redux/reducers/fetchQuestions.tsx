import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface IQuestions {
  username: string;
  email: string;
  phone: string;
  question: string;
  date:string,
  _v: number;
  _id: string;
}

export interface IinitialState {
  questions: IQuestions[] | null;
  loading: boolean;
  error: string | null | undefined;
}

export const getQuestion = createAsyncThunk("/getQuestion", async () => {
  const url = `https://pilgrimedu.az/api/v1/questions`;

  console.log(url);

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
  questions: null,
  error: "",
  loading: false,
};

const fetchQuestions = createSlice({
  name: "fetchQuestions",
  reducers: {},
  initialState,
  extraReducers(builder) {
    builder.addCase(getQuestion.pending, (state) => {
      state.error = null;
      state.questions = null;
      state.loading = true;
    });
    builder.addCase(getQuestion.fulfilled, (state, action) => {
      state.error = null;
      state.questions = action.payload.data;
      state.loading = false;
    });
    builder.addCase(getQuestion.rejected, (state, action) => {
      state.error = action.error.message;
      state.questions = null;
      state.loading = false;
    });
  },
});

export default fetchQuestions.reducer;
