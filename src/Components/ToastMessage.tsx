import { Alert, Snackbar } from "@mui/material";
import { hideToast } from "../store/toastSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

const ToastMessage = () => {
  const dispatch = useAppDispatch();
  const { message, open } = useAppSelector((state) => state.toast);

  function handle_close(_e?: React.SyntheticEvent | Event, reason?: string) {
    if (reason === "clickaway") {
      return;
    }
    dispatch(hideToast());
  }

  return (
    <Snackbar
      open={open}
      autoHideDuration={2000}
      onClose={handle_close}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert onClose={() => dispatch(hideToast())} severity="error">
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ToastMessage;
