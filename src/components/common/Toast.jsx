import * as React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { motion } from "framer-motion";

export default function Toast({
  severity = "success",
  message = "This is Toast Message",
}) {
  return (
    <Stack
      component={motion.span}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      sx={{ width: "100%", mt: -6, mb: 5 }}
    >
      <Alert
        variant="filled"
        severity={severity}
        sx={{ mx: 1.5, display: "flex", justifyContent: "center", zIndex: 1 }}
      >
        {message}
      </Alert>
    </Stack>
  );
}
