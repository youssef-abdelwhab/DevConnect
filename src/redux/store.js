import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./slices/postsSlice";
import CommentsReducer from "./slices/CommentSlice"

const store = configureStore({
  reducer: {
    posts: postsReducer,
    Comments : CommentsReducer,
  },
});

export default store;
