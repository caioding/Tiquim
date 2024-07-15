import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

interface IErrorSnackbarProps {
  message: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<number>>;
}

export default function ErrorSnackbar({ message, open, setOpen }: IErrorSnackbarProps) {
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(0);
  };

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
