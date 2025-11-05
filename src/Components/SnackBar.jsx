import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useSelector , useDispatch} from 'react-redux';
import {hidingSnackBar} from "../redux/slices/UiSlice";


export default function Snackbars() {

  const dispath = useDispatch();

  const {snackbarOpen , snackbarMessage ,snackbarSeverity} = useSelector(state => state.snackBar);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return ;
      dispath(hidingSnackBar())

  };

  return (
    <div>
      <Snackbar open={snackbarOpen} key={Date.now()} autoHideDuration={5000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={snackbarSeverity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}