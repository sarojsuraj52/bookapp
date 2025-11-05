// Snackbar.js
import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function SnackBar({ open, handleClose, message, severity }) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
      <MuiAlert
        elevation={6}
        variant="filled"
        severity={severity}
        onClose={handleClose}
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
}

export default SnackBar;
