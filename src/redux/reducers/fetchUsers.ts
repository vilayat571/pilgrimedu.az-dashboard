import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export interface IUSERS {
    degree: string; // "Dokturantura"
    email: string; // "azar@gmail.com"
    password: string; // "$2a$10$IJbVk.kOdS3cx8aCPj/pjO4B24FooeyS10t.5T6ugfs1o3COrejvq"
    phone: string; // "0508908727"
    resetPasswordExpire: string; // "2024-09-23T11:20:56.491Z"
    resetPasswordToken: string; // "616928e50f6baa68edd8638e09e9efe42f9bc43fcec838c98e94c452667e80af"
    service: string; // "Xaricdə layihə"
    status: string; // "Qeydiyyatdan keçdi"
    username: string; // "azazazazaza"
    _id: string; // "66ebeec713f2cd35623c415a"
  }

// Define the initial state interface
export interface IinitialState {
  users: IUSERS[] | null;
  loading: boolean;
  error: string | null | undefined;
}

// Async thunk for fetching users
export const getUsers = createAsyncThunk("/getUsers", async () => {
  const url = `https://pilgrimedu.az/api/v1/users`;

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

// Initial state
const initialState: IinitialState = {
  users: null,
  error: "",
  loading: false,
};

// Create the slice
const fetchUsers = createSlice({
  name: "fetchUsers",
  reducers: {},
  initialState,
  extraReducers(builder) {
    builder.addCase(getUsers.pending, (state) => {
      state.error = null;
      state.users = null;
      state.loading = true;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.error = null;
      console.log(action.payload);
      state.users = action.payload.users;
      state.loading = false;
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      state.error = action.error.message;
      state.users = null;
      state.loading = false;
    });
  },
});

export default fetchUsers.reducer;
