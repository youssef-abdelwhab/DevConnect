import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { showSnackBar } from "./UiSlice";
import axios from "axios";
const API_URL = "https://tarmeezacademy.com/api/v1";

export const fetchComments = createAsyncThunk("comments/fetch",async (ID)=>{
    const response = await axios.get(`${API_URL}/posts/${ID}`)
    return response.data.data.comments
})
export const AddComments = createAsyncThunk("AddComments", async ({IDPOST , comment , token} , {dispatch ,rejectWithValue})=>{
  try{
      const response =await axios.post(`${API_URL}/posts/${IDPOST}/comments`, comment ,{ headers: { "Content-Type": "application/json" ,"authorization": `Bearer ${token}`}})
    dispatch(
        showSnackBar({
              snackbarMessage:"تم انشاء كمنت بنجاح",
              snackbarSeverity: "success",
        })
    )
       return response.data.data;
     }
      catch(error) {
      dispatch(
          showSnackBar({
            snackbarMessage:`فشل كمنت  :${error}` ,
            snackbarSeverity: "error",
        })
      )
      return rejectWithValue(error.response?.data || error.message);
     }
  }
)

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
      .addCase(AddComments.pending , (state)=>{
        state.loading =true
      })
      .addCase(AddComments.fulfilled , (state ,action)=>{
        state.loading =false
        state.Comments.unshift(action.payload)
      })
      .addCase(AddComments.rejected , (state , action)=>{
        state.loading =false
        state.error = action.error.message;
      })
    }

})
export default CommentsSlice.reducer;