import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { deleteBook, deleteActions } from "../../store/bookSlice";
import { motion } from "framer-motion";

const DeleteBook = ({ id, openSnackbar }) => {
  const dispatch = useDispatch();
  const errorDELETE = useSelector((state) => state.delete.error);

  const handleDelete = React.useCallback(() => {
    dispatch(deleteBook(id));
    !errorDELETE && dispatch(deleteActions.updateId(id));
    openSnackbar();
  }, [dispatch, id, errorDELETE, openSnackbar]);

  return (
    <Button
      variant="outlined"
      component={motion.div}
      whileTap={{ scale: 0.7, transition: { duration: 0.3 } }}
      whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
      onClick={handleDelete}
      color="error"
    >
      <DeleteIcon /> &nbsp; <span>Delete</span>
    </Button>
  );
};

export default React.memo(DeleteBook);
