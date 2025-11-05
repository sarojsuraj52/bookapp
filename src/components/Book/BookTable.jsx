import React, { useEffect, useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Pagination,
  PaginationItem,
  Box,
  useMediaQuery,
  Toolbar,
  Typography,
  Tooltip,
} from "@mui/material";
import { forwardRef } from "react";
import { makeStyles } from "@mui/styles";
import InfoIcon from "@mui/icons-material/Info";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";
import SnackBar from "../common/SnackBar";
import ViewBook from "./ViewBook";
import EditBook from "./EditBook";
import DeleteBook from "./DeleteBook";
import SearchBar from "./utilities/SearchBar";
import Sort from "./utilities/Sort";
import Filter from "./utilities/Filter";

function EnhancedTableToolbar() {
  const isSmallScreen = useMediaQuery("(max-width: 720px)");

  return (
    <Toolbar
      sx={{
        px: isSmallScreen ? 0 : 2,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Typography variant="h5" style={{ whiteSpace: "noWrap" }}>
        Book List
      </Typography>
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <SearchBar />
        <Sort />
        {/* <br /> */}
        <Filter />
      </Box>
    </Toolbar>
  );
}

const useStyles = makeStyles({
  tableCellHead: {
    fontWeight: 500,
    fontSize: "1.1rem",
  },
});

function BookTable({ bookData }) {
  const isSmallScreen = useMediaQuery("(max-width: 720px)");
  if (!bookData) {
    return null;
  }
  const classes = useStyles();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [page, setPage] = useState(1);
  const booksPerPage = 5;
  const numPages = Math.ceil(bookData.length / booksPerPage);
  const errorDELETE = useSelector((state) => state.delete.error);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleShowDetails = (book) => {
    setSelectedBook(book);
  };

  const handleCloseDetails = () => {
    setSelectedBook(null);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const books = useMemo(
    () => bookData?.slice((page - 1) * booksPerPage, page * booksPerPage),
    [bookData, page, booksPerPage]
  ); //slicing the book from start index and so on

  useEffect(() => {
    if (books.length === 0) {
      setPage((cur) => 1);
    }
  }, [books]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1}}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay:0.4, duration: 0.3}}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <TableContainer
        sx={{
          padding: "25px",
          marginTop: "1rem",
          width: isSmallScreen ? "95%" : "70%",
          overflow: "auto",
          boxShadow:
            "0px 0px 0px 0px rgba(0,0,0,0.2), 0px 0px 5px 0px rgba(0,0,0,0.14), 0px 4px 20px 0px rgba(0,0,0,0.12)",
        }}
        component={motion.div}
      >
        <EnhancedTableToolbar />
        <Table>
          {bookData.length !== 0 && (
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: "1.02rem" }}> SR.NO </TableCell>
                <TableCell sx={{ fontSize: "1.02rem" }}>Title</TableCell>
                <TableCell sx={{ fontSize: "1.02rem" }}>Publisher</TableCell>
                <TableCell sx={{ fontSize: "1.02rem" }}>Author</TableCell>
                <TableCell sx={{ fontSize: "1.02rem" }}>Pages</TableCell>
                <TableCell sx={{ fontSize: "1.02rem" }}>Genre</TableCell>
                <TableCell sx={{ fontSize: "1.02rem" }} align="center">
                  View More
                </TableCell>
                <TableCell
                  sx={{ fontSize: "1.02rem" }}
                  className={classes.tableCellHead}
                  align="center"
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
          )}
          <TableBody>
            {bookData.length === 0 && (
              <TableRow sx={{ height: 400 }}>
                <TableCell
                  sx={{
                    fontSize: "x-large",
                  }}
                  colSpan={3}
                  align="center"
                >
                  No Data
                </TableCell>
              </TableRow>
            )}
            {books.map((book, index) => {
              return (
                book && (
                  <TableRow
                    hover
                    key={book[0]}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      component={motion.td}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ delay: index * 0.1 }}
                      layout
                    >
                      {page > 0
                        ? (page - 1) * booksPerPage + index + 1
                        : index + 1}
                    </TableCell>
                    <TableCell
                      component={motion.td}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {book[1].title}
                    </TableCell>
                    <TableCell
                      component={motion.td}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {book[1].publisher}
                    </TableCell>
                    <TableCell
                      component={motion.td}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {book[1].author}
                    </TableCell>
                    <TableCell
                      component={motion.td}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {book[1].pages || ' '}
                    </TableCell>
                    <TableCell
                      component={motion.td}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {book[1].genre}
                    </TableCell>
                    <TableCell
                      align="center"
                      component={motion.td}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Button
                        // variant={whileHover?'contained':'text'}
                        color="info"
                        component={motion.div}
                        whileTap={{
                          scale: 0.7,
                          transition: { duration: 0.3 },
                        }}
                        whileHover={{
                          scale: 1.1,
                          transition: { duration: 0.2 },
                        }}
                        onClick={() => handleShowDetails(book)}
                      >
                        <InfoIcon style={{ fontSize: "1.35rem" }} />
                        &nbsp;
                        <span style={{ whiteSpace: "nowrap" }}>
                          Show details
                        </span>
                      </Button>
                    </TableCell>
                    <TableCell
                      align="center"
                      component={motion.td}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <EditBook bookData={book} />
                        <DeleteBook
                          id={book[0]}
                          openSnackbar={() => setSnackbarOpen(true)}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                )
              );
            })}
          </TableBody>
        </Table>
        <AnimatePresence >
          {Boolean(selectedBook) && (
            <ViewBook
              book={selectedBook}
              open={Boolean(selectedBook)}
              onClose={handleCloseDetails}
            />
          )}
        </AnimatePresence>
      </TableContainer>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 2, mt: 3 }}>
        <Pagination
          count={numPages}
          page={page}
          onChange={handlePageChange}
          renderItem={(item) => (
            <PaginationItem
              slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
              {...item}
            />
          )}
          size="large"
        />
      </Box>
      <SnackBar
        open={snackbarOpen}
        handleClose={handleSnackbarClose}
        message={errorDELETE ? errorDELETE : "Book deleted successfully"}
        severity={errorDELETE ? "warning" : "success"}
      />
    </motion.div>
  );
}

export default React.memo(BookTable);
