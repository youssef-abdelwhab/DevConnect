import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { showSnackBar } from "./UiSlice";
import axios from "axios";
import {FetchCommentsArg , AddComment} from "../../types/Comments"
const API_URL = "https://tarmeezacademy.com/api/v1";



export const fetchComments = createAsyncThunk<FetchCommentsArg[], number>(
  "comments/fetch",
  async (ID) => {
    const response = await axios.get(`${API_URL}/posts/${ID}`);
    return response.data.data.comments;
  }
);

export const AddComments = createAsyncThunk<FetchCommentsArg, AddComment>(
  "AddComments",
  async ({ id, body, token }, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/posts/${id}/comments`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(
        showSnackBar({
          snackbarMessage: "تم انشاء كمنت بنجاح",
          snackbarSeverity: "success",
        })
      );
      return response.data.data;
    } catch (error: any) {
      dispatch(
        showSnackBar({
          snackbarMessage: `فشل كمنت  :${error}`,
          snackbarSeverity: "error",
        })
      );
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

interface CommentsState {
  Comments: FetchCommentsArg[];
  loading: boolean;
  error?: string;
}

const initialState: CommentsState = {
  Comments: [],
  loading: false,
};

const CommentsSlice = createSlice({
  name: "Comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchComments.fulfilled,
        (state, action: PayloadAction<FetchCommentsArg[]>) => {
          state.loading = false;
          state.Comments = action.payload;
        }
      )
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;

        state.error = action.error.message;
      })
      .addCase(AddComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        AddComments.fulfilled,
        (state, action: PayloadAction<FetchCommentsArg>) => {
          state.loading = false;
          state.Comments.unshift(action.payload);
        }
      )
      .addCase(AddComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export default CommentsSlice.reducer;
