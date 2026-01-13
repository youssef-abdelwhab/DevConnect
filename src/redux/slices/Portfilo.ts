import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { showSnackBar } from "./UiSlice";
import { User, ShowPost, UserId } from "../../types/Portfolio";
const API_URL = "https://tarmeezacademy.com/api/v1";

export const FetchPortfilo = createAsyncThunk<User, UserId>(
  "Portfilo/fetch",
  async ({ id }, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/users/${id}`);
      return response.data.data;
    } catch (error: any) {
      dispatch(
        showSnackBar({
          snackbarMessage: `فشل :${error}`,
          snackbarSeverity: "error",
        })
      );
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const FetchPortfiloPost = createAsyncThunk<ShowPost[], UserId>(
  "Portfilo/Post/fetch",
  async ({ id }, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/users/${id}/posts`);
      return response.data.data;
    } catch (error: any) {
      dispatch(
        showSnackBar({
          snackbarMessage: `فشل :${error}`,
          snackbarSeverity: "error",
        })
      );
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

interface PortfiloState {
  posts: ShowPost[];
  user?: User;
  loadingUser: boolean;
  loadingPosts: boolean;
  error?: string;
}
const initialState: PortfiloState = {
  posts: [],
  loadingUser: false,
  loadingPosts: false,
};

const PortfiloSlice = createSlice({
  name: "Portfilo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(FetchPortfilo.pending, (state) => {
        state.loadingUser = true;
      })
      .addCase(
        FetchPortfilo.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.loadingUser = false;
          state.user = action.payload;
        }
      )
      .addCase(FetchPortfilo.rejected, (state, action) => {
        state.loadingUser = false;
        state.error = action.error.message;
      })
      .addCase(FetchPortfiloPost.pending, (state) => {
        state.loadingPosts = true;
      })
      .addCase(
        FetchPortfiloPost.fulfilled,
        (state, action: PayloadAction<ShowPost[]>) => {
          state.loadingPosts = false;
          state.posts = action.payload;
        }
      )
      .addCase(FetchPortfiloPost.rejected, (state, action) => {
        state.loadingPosts = false;
        state.error = action.error.message;
      });
  },
});

export default PortfiloSlice.reducer;
