import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import fetchQuestions from "../reducers/fetchQuestions";
import removeItem from "../reducers/removeItem";
import questionsCount from "../reducers/questionsCount";

export const store = configureStore({
  reducer: {
    fetchQuestions:fetchQuestions,
    removeItem:removeItem,
    questionsCount:questionsCount
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
