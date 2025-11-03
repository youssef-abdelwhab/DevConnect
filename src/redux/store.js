import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./slices/postsSlice";
import CommentsReducer from "./slices/CommentSlice"
import authReducer from "./slices/authSlice"

const store = configureStore({
  reducer: {
    posts: postsReducer,
    Comments : CommentsReducer,
    auth: authReducer,
  },
});

export default store;
