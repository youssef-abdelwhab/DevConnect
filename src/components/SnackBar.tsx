import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import { useAppSelector, useAppDispatch } from "../redux/store";
import { hidingSnackBar } from "../redux/slices/UiSlice";


export default function Snackbars() {
  const dispath = useAppDispatch();

  const { snackbarOpen, snackbarMessage, snackbarSeverity } = useAppSelector(
    (state) => state.snackBar
  );

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    dispath(hidingSnackBar());
  };

  return (
    <div>
      <Snackbar
        open={snackbarOpen}
        key={Date.now()}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={snackbarSeverity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
