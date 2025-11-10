import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./slices/postsSlice";
import CommentsReducer from "./slices/CommentSlice"
import authReducer from "./slices/authSlice"
import UiSnacBarReducer from "./slices/UiSlice"
import PortfiloReducer from "./slices/Portfilo"

const store = configureStore({
  reducer: {
    posts: postsReducer,
    Comments : CommentsReducer,
    auth: authReducer,
    snackBar :UiSnacBarReducer,
    Portfilo :PortfiloReducer,
  },
});


export default store;
