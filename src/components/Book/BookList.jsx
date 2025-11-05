import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Button } from "@mui/material";
import BookForm from "./BookForm";
import BookTable from "./BookTable";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../../store/bookSlice";
import { AnimatePresence, motion } from "framer-motion";
import SnackBar from "../common/SnackBar";

const BookList = () => {
  const [openCommonModal, setCommonModal] = React.useState(false);
  const { booksArray } = useSelector((state) => state.books);
  const deletedBookId = useSelector((state) => state.delete.data);
  const addedBookId = useSelector((state) => state.post.data);
  const editBookId = useSelector((state) => state.put.data);
  const errorPOST = useSelector((state) => state.post.error);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const dispatch = useDispatch();

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    dispatch(fetchBooks());
  }, [addedBookId, editBookId, deletedBookId]);

  return (
    <>
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          mt: 5,
          p: 1,
          overflow: "hidden",
        }}
      >
        <BookTable bookData={booksArray} />
        <Button
          sx={{ marginY: 3 }}
          component={motion.div}
          whileTap={{ scale: 0.7, transition: { duration: 0.2 } }}
          whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
          layout
          size="large"
          variant="contained"
          color="success"
          onClick={() => setCommonModal(true)}
        >
          Add Book
        </Button>
      </Box>
      <AnimatePresence mode="wait">
        {openCommonModal && (
          <BookForm
            open={openCommonModal}
            onClose={() => setCommonModal(false)}
            method="POST"
            openSnackbar={() => setSnackbarOpen(true)}
          />
        )}
      </AnimatePresence>
      <SnackBar
        open={snackbarOpen}
        handleClose={handleSnackbarClose}
        message={errorPOST ? errorPOST : "Book added successfully"}
        severity={errorPOST ? "warning" : "success"}
      />
    </>
  );
};

export default BookList;
