import { createSlice ,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = "https://tarmeezacademy.com/api/v1";


export const registerUser = createAsyncThunk("auth/register",async({formdata , rememberMe})=>{
    const response = await axios.post(`${API_URL}/register` , formdata)
     
      if(rememberMe){
        localStorage.setItem("token" , response.data.token)
        localStorage.setItem("user", JSON.stringify(response.data.user))
    }else{
        sessionStorage.setItem("token" , response.data.token)
        sessionStorage.setItem("user", JSON.stringify(response.data.user))
    }
    return response.data

})
export const loginUser = createAsyncThunk("auth/login",{ headers: { "Content-Type": "multipart/form-data" }},async({formdata,rememberMe})=>{
    const response = await axios.post(`${API_URL}/login` , formdata)
    if(rememberMe){
        localStorage.setItem("token" , response.data.token)
        localStorage.setItem("user" , JSON.stringify(response.data.user))
    }else{
        sessionStorage.setItem("token" , response.data.token)
        sessionStorage.setItem("user" , JSON.stringify(response.data.user) )
    }
    return response.data.data
} , )


export const logOutUser = createAsyncThunk("auth/logout", async (_, { getState }) => {
  const token = getState().auth.token;
  await axios.post(`${API_URL}/logout`, {}, {
    headers: { Authorization: `Bearer ${token}`}
  });
});

export const updatePorfile = createAsyncThunk("auth/updatePorfile",async(formData)=>{
    const response = await axios.post(`${API_URL}/updatePorfile` , formData)
    return response.data
})

const storedToken = localStorage.getItem("token") || sessionStorage.getItem("token");
const storedUser =   JSON.parse(localStorage.getItem("user")) ||  JSON.parse(sessionStorage.getItem("user"));





const authSlice = createSlice({
    name:"auth",
    initialState:{
        user:storedUser ||  {},
        token:storedToken || null,
        error:null,
        loading:false,
    },
    reducers:{},
    extraReducers:(builder)=>{
      builder
      // programming logic is for registerUser.
      .addCase(registerUser.pending , (state)=>{
        state.loading = true;
      })
      .addCase(registerUser.fulfilled , (state,action)=>{
        state.loading =false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(registerUser.rejected , (state , action)=>{
        state.loading = false ;
        state.error = action.error.message;
      })
        // programming logic is for loginUser.
        .addCase(loginUser.pending , (state)=>{
        state.loading = true;
      })
      .addCase(loginUser.fulfilled , (state,action)=>{
        state.loading =false;
        state.user = action.payload.user;
        state.token = action.payload.token;

      })
      .addCase(loginUser.rejected , (state , action)=>{
        state.loading = false ;
        state.error = action.error.message;
      })
    // programming logic is for updatePorfile.
      .addCase(updatePorfile.pending , (state)=>{
        state.loading = true;
      })
      .addCase(updatePorfile.fulfilled , (state,action)=>{
        state.loading =false;
        state.user = action.payload.user;
      })
      .addCase(updatePorfile.rejected , (state , action)=>{
        state.loading = false ;
        state.error = action.error.message;
      })
        // programming logic is for logOutUser.
      .addCase(logOutUser.pending , (state)=>{
        state.loading = true;
      })
      .addCase(logOutUser.fulfilled , (state)=>{
            state.loading=false;
            state.user = {};
            state.token = null;
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("user");
      })
      .addCase(logOutUser.rejected , (state , action)=>{
        state.loading = false ;
        state.error = action.error.message;
      })

    }
})

export default authSlice.reducer