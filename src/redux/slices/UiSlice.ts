import { createSlice } from "@reduxjs/toolkit";
type SnackbarSeverity = "success" | "error" | "warning" | "info";
interface SnackBarType{
    snackbarOpen: boolean,
    snackbarMessage: string,
    snackbarSeverity: SnackbarSeverity,

}
const initialState :SnackBarType={
    snackbarOpen: false,
    snackbarMessage: "",
    snackbarSeverity: "success",
}
const UiSnacBar = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    showSnackBar: (state, action) => {
      state.snackbarOpen = true;
      state.snackbarMessage = action.payload.snackbarMessage;
      state.snackbarSeverity = action.payload.snackbarSeverity;
    },
    hidingSnackBar: (state) => {
      state.snackbarOpen = false;
      state.snackbarMessage = "";
      state.snackbarSeverity = "success";
    },
  },
});

export const { showSnackBar, hidingSnackBar } = UiSnacBar.actions;

export default UiSnacBar.reducer;
