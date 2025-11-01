import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = "https://tarmeezacademy.com/api/v1";

export const fetchComments = createAsyncThunk("comments/fetch",async (ID)=>{
    const response = await axios.get(`${API_URL}/posts/${ID}`)
    return response.data.data.comments
})

const CommentsSlice =createSlice({
    name:"Comments",
    initialState:{
        Comments:[],
        loading: false,
        error: null,
    },
    reducers:{},
    extraReducers:(builder)=>{
      builder
      .addCase(fetchComments.pending , (state)=>{
        state.loading = true;
      })
      .addCase(fetchComments.fulfilled , (state , action)=>{
        state.loading = false
        state.Comments =action.payload
      })
      .addCase(fetchComments.rejected , (state,action)=>{
        state.loading = false,
        state.error = action.error.message;
      })
    }

})
export default CommentsSlice.reducer;