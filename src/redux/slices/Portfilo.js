import { createAsyncThunk ,createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {showSnackBar} from "../../redux/slices/UiSlice";

const API_URL = "https://tarmeezacademy.com/api/v1";

export const FetchPortfilo = createAsyncThunk("Portfilo/fetch",async({IDUseer} , {dispatch,rejectWithValue})=>{
    try{
        const response = await axios.get(`${API_URL}/users/${IDUseer}`)
        return response.data.data
    }
      catch(error) {
      dispatch(
          showSnackBar({
            snackbarMessage:`فشل :${error}` ,
            snackbarSeverity: "error",
        })
      )
      return rejectWithValue(error.response?.data || error.message);
     }
})
export const FetchPortfiloPost = createAsyncThunk("Portfilo/Post/fetch",async({IDUseer} , {dispatch,rejectWithValue})=>{
    try{
        const response = await axios.get(`${API_URL}/users/${IDUseer}/posts`)
        return response.data.data
    }
      catch(error) {
      dispatch(
          showSnackBar({
            snackbarMessage:`فشل :${error}` ,
            snackbarSeverity: "error",
        })
      )
      return rejectWithValue(error.response?.data || error.message);
     }
})



const PortfiloSlice = createSlice({
    name:"Portfilo",
    initialState:{
        posts :[],
        user:{},
        loadingUser: false,
        loadingPosts: false,
        error: null,
    },
    reducers: {},
    extraReducers:(builder)=>{
        builder
            .addCase(FetchPortfilo.pending , (state)=>{
                 state.loadingUser = true;
            })
            .addCase(FetchPortfilo.fulfilled , (state , action)=>{
                state.loadingUser = false;
                state.user = action.payload
            })
            .addCase(FetchPortfilo.rejected , (state , action)=>{
                state.loadingUser = false;
                state.error = action.error.message
            })
            .addCase(FetchPortfiloPost.pending , (state)=>{
                state.loadingPosts = true;
            })
            .addCase(FetchPortfiloPost.fulfilled , (state , action)=>{
                state.loadingPosts = false;
                state.posts = action.payload
            })
            .addCase(FetchPortfiloPost.rejected , (state , action)=>{
                state.loadingPosts = false;
                state.error = action.error.message
            })
    }
})

export default PortfiloSlice.reducer;