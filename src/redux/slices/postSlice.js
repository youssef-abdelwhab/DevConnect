import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URl = "https://tarmeezacademy.com/api/v1"

export const fetchPost = createAsyncThunk("posts/fetchAll" , async()=>{
    const response = await axios.get(API_URl + "/posts?limit=50");
    return response.data
})