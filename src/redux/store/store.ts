import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import fetchQuestions from "../reducers/fetchQuestions";
import fetchBlogs from "../reducers/fetchBlogs";
import removeItem from "../reducers/removeItem";
import fetchScholarships from "../reducers/fetchScholarships";
import fetchUsers from "../reducers/fetchUsers";

export const store = configureStore({
  reducer: {
    fetchQuestions: fetchQuestions,
    fetchBlogs: fetchBlogs,
    fetchScholarships: fetchScholarships,
    fetchUsers: fetchUsers,
    removeItem: removeItem,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
