import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { showSnackBar } from "./UiSlice";


const API_URL = "https://tarmeezacademy.com/api/v1";

export const fetchPosts = createAsyncThunk("posts/fetchAll", async (page) => {
  const response = await axios.get(`${API_URL}/posts?limit=20&page=${page}`);
  return response.data.data;
});

export const AddPostPust= createAsyncThunk("AddPost/feth",async ({formData , token} , {dispatch ,rejectWithValue})=>{
  try {
    const response  = await axios.post(`${API_URL}/posts`,formData,{ headers: { "Content-Type": "multipart/form-data" ,"authorization": `Bearer ${token}`}})
    dispatch(
        showSnackBar({
              snackbarMessage:"تم انشاء البوست بنجاح",
              snackbarSeverity: "success",
        })
    )
       return response.data.data;
     }
      catch(error) {
      dispatch(
          showSnackBar({
            snackbarMessage:`فشل انشاء البوست :${error}` ,
            snackbarSeverity: "error",
        })
      )
      return rejectWithValue(error.response?.data || error.message);
     }
})
export const fetchPostById = createAsyncThunk(
  "posts/fetchById",
  async (postId) => {
    const response = await axios.get(`${API_URL}/posts/${postId}`);
    return response.data.data;
  }
);

export const DeletPost = createAsyncThunk("DeletePost/feth" ,async ({IDPOST , token} , {dispatch , rejectWithValue}) =>{
  try {
     const response = await axios.delete(`${API_URL}/posts/${IDPOST}`,{ headers: { "Content-Type": "multipart/form-data" ,"authorization": `Bearer ${token}`}})
     dispatch(
        showSnackBar({
              snackbarMessage:"تم حذف البوست بنجاح",
              snackbarSeverity: "success",
        })
     )
     return response.data.data
  }
      catch(error) {
      dispatch(
          showSnackBar({
            snackbarMessage:`فشل حذف البوست :${error}` ,
            snackbarSeverity: "error",
        })
      )
      return rejectWithValue(error.response?.data || error.message);
     }
})

export const EditPost = createAsyncThunk("EditPost/feth" , async ({IDPOST ,formData, token} , {dispatch ,rejectWithValue })=>{
  try {
    const response = await axios.put(`${API_URL}/posts/${IDPOST}`, formData,{ headers: { "Content-Type": "application/json" ,"authorization": `Bearer ${token}`}})
    dispatch(
        showSnackBar({
              snackbarMessage:"تم  تعديل البوست بنجاح",
              snackbarSeverity: "success",
        })
    )
       return response.data.data;
     }
      catch(error) {
      dispatch(
          showSnackBar({
            snackbarMessage:`فشل تعديل  البوست :${error}` ,
            snackbarSeverity: "error",
        })
      )
      return rejectWithValue(error.response?.data || error.message);
     }
})





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
        if(action.meta.arg === 1){
          state.posts = action.payload;
          state.page = 2;
        } else {
          const newPosts = action.payload.filter(
            post => !state.posts.some(p => p.id === post.id)
          );
          state.posts = [...state.posts, ...newPosts];
          state.page += 1;
        }
        state.hasMore = action.payload.length >= 20;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(AddPostPust.pending , (state)=>{
        state.loading = true
      })
      .addCase(AddPostPust.fulfilled , (state , action)=>{
        state.loading = false
        state.posts.unshift(action.payload);
      })
      .addCase(AddPostPust.rejected , (state , action)=>{
        state.loading = false,
          state.error = action.payload;
      }) 
      .addCase(DeletPost.pending , (state)=>{
        state.loading = true
      })
      .addCase(DeletPost.fulfilled , (state ,action)=>{
        state.loading = false
        state.posts = state.posts.filter(
            post => post.id !== action.meta.arg.IDPOST
        );
      })
      .addCase(DeletPost.rejected , (state , action)=>{
        state.loading = false
        state.error = action.error.message;
      })
      .addCase(EditPost.pending , (state)=>{
        state.loading = true
      })
      .addCase(EditPost.fulfilled, (state, action) => {
          state.loading = false;
          const updatedPost = action.payload; 
          const index = state.posts.findIndex(post => post.id === updatedPost.id);
          if (index !== -1) {
              state.posts[index] = updatedPost; // استبدال البوست القديم بالجديد
          }
      })
      .addCase(EditPost.rejected , (state , action)=>{
        state.loading = false
        state.error = action.error.message;
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
    const updatedPost = action.payload;
    const index = state.posts.findIndex(post => post.id === updatedPost.id);
    if (index !== -1) {
        state.posts[index] = updatedPost;
    }
})


  },
});

export default postsSlice.reducer;
