import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://tarmeezacademy.com/api/v1";

export const fetchPosts = createAsyncThunk("posts/fetchAll", async () => {
  const response = await axios.get(`${API_URL}/posts?limit=50`);
  return response.data.data;
});

const postsSlice = createSlice({
  name: "posts",
  initialState: {
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
        state.posts = action.payload; 
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },

  
});
  console.log(fetchPosts);

export default postsSlice.reducer;
