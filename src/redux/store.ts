import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./slices/postsSlice";
import CommentsReducer from "./slices/CommentSlice";
import authReducer from "./slices/authSlice";
import UiSnacBarReducer from "./slices/UiSlice";
import PortfiloReducer from "./slices/Portfilo";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const store = configureStore({
  reducer: {
    posts: postsReducer,
    Comments: CommentsReducer,
    auth: authReducer,
    snackBar: UiSnacBarReducer,
    Portfilo: PortfiloReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

