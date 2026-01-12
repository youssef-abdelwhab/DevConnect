import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = "https://tarmeezacademy.com/api/v1";
import { showSnackBar } from "./UiSlice";
import type { RootState } from "../store";

interface Register {
  formdata: FormData;
  rememberMe: boolean;
}
interface UserArg {
  user: User;
  token: string;
}
interface User {
  username: string;
  name: string;
  email: string;
  id: number;
  profile_image: string;
  comments_count: number;
  posts_count: number;
}

//--------------------------------{Api register}-------------------------------
export const registerUser = createAsyncThunk<UserArg, Register>(
  "auth/register",
  async ({ formdata, rememberMe }, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/register`, formdata);

      if (rememberMe) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      } else {
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("user", JSON.stringify(response.data.user));
      }
      dispatch(
        showSnackBar({
          snackbarMessage: "تم انشاء الحساب بنجاح",
          snackbarSeverity: "success",
        })
      );
      return response.data;
    } catch (error: any) {
      dispatch(
        showSnackBar({
          snackbarMessage: error.message,
          snackbarSeverity: "error",
        })
      );

      return rejectWithValue(error.response?.data);
    }
  }
);
//--------------------------------{Api Log in }-------------------------------
export const loginUser = createAsyncThunk<UserArg, Register>(
  "auth/login",
  async ({ formdata, rememberMe }, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/login`, formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (rememberMe) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      } else {
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("user", JSON.stringify(response.data.user));
      }
      dispatch(
        showSnackBar({
          snackbarMessage: "تم تسجيل الدخول بنجاح",
          snackbarSeverity: "success",
        })
      );
      return response.data;
    } catch (error: any) {
      dispatch(
        showSnackBar({
          snackbarMessage: error.message,
          snackbarSeverity: "error",
        })
      );
      return rejectWithValue(error.response?.data);
    }
  }
);

//--------------------------------{Api Log out}-------------------------------
export const logOutUser = createAsyncThunk<void, void, { state: RootState }>(
  "auth/logout",
  async (_, { dispatch, getState }) => {
    try {
      const token = getState().auth.token;
      await axios.post(
        `${API_URL}/logout`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(
        showSnackBar({
          snackbarMessage: "تم تسجيل الدخول بنجاح ",
          snackbarSeverity: "success",
        })
      );
    } catch (error: any) {
      dispatch(
        showSnackBar({
          snackbarMessage: error.message,
          snackbarSeverity: "error",
        })
      );
    }
  }
);
//--------------------------------{Api updatePorfile}-------------------------------
export const updatePorfile = createAsyncThunk(
  "auth/updatePorfile",
  async (formData) => {
    const response = await axios.post(`${API_URL}/updatePorfile`, formData);
    return response.data;
  }
);

// const storedToken =
//   localStorage.getItem("token") || sessionStorage.getItem("token");
// const storedUser: UserArg =
//   JSON.parse(localStorage.getItem("user")) ||
//   JSON.parse(sessionStorage.getItem("user"));
const storedToken =
  localStorage.getItem("token") ?? sessionStorage.getItem("token");

const storedUser: User | null = (() => {
  const data = localStorage.getItem("user") ?? sessionStorage.getItem("user");
  return data ? (JSON.parse(data) as User) : null;
})();

interface AuthState {
  user: User|null ;
  token: string | null;
  error?: string;
  loading: boolean;
}

const initialState: AuthState = {
  user: storedUser,
  token: storedToken,
  loading: false,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //----------------{ programming logic is for registerUser.}------------
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<UserArg>) => {
          state.loading = false;
          state.user = action.payload.user;
          state.token = action.payload.token;
        }
      )
      .addCase(registerUser.rejected, (state) => {
        state.loading = false;
      })
      //------------- {programming logic is for log in User.}---------------
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<UserArg>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //----------- {programming logic is for updatePorfile.}-------------
      // .addCase(updatePorfile.pending, (state) => {
      //   state.loading = true;
      // })
      // .addCase(updatePorfile.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.user = action.payload.user;
      // })
      // .addCase(updatePorfile.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.error.message;
      // })
      // --------------{programming logic is for log Out User.}-------------------
      .addCase(logOutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logOutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
      })
      .addCase(logOutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;
