
import { createSlice } from "@reduxjs/toolkit";

const UiSnacBar = createSlice({
    name:"snackbar",
    initialState:{   
        snackbarOpen:false,      
        snackbarMessage:"",
        snackbarSeverity:"success",
 
    },
    reducers:{
        showSnackBar:(state , action)=>{
                state.snackbarOpen = true;
                state.snackbarMessage = action.payload.snackbarMessage;
                state.snackbarSeverity = action.payload.snackbarSeverity;

        },
        hidingSnackBar:(state)=>{
            state.snackbarOpen = false;
            state.snackbarMessage = "";
            state.snackbarSeverity = "success";
        }
    }
})

export const {showSnackBar , hidingSnackBar} = UiSnacBar.actions

export default UiSnacBar.reducer