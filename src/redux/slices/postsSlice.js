import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://tarmeezacademy.com/api/v1";

export const fetchPosts = createAsyncThunk("posts/fetchAll", async (page) => {
  const response = await axios.get(`${API_URL}/posts?limit=20&page=${page}`);
  return response.data.data;
});

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    page: 1 ,
    hasMore: true,
    posts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = [...state.posts , ...action.payload]; 
        state.page += 1;
        if(action.payload.length < 20)(
          state.hasMore = false
        )
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default postsSlice.reducer;
