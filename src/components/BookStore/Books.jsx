import React, { useState, useEffect } from "react";
import { makeStyles, useMediaQuery } from "@material-ui/core";
import { Grid, Typography, CircularProgress, Box } from "@material-ui/core";
import { Pagination, PaginationItem, Button } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import noImage from "../../assets/noImage.png";
import { addBook } from "../../store/bookSlice";
import { useDispatch } from "react-redux";
import SnackBar from "../common/SnackBar";
import { fetchBooks } from "../../store/bookSlice";
import { addToCart } from "../../store/bookStoreSlice";
import "./Book.css";

const Books = ({ bookStoreData, search }) => {
  const navigate = useNavigate();
  const [selectedBook, setSelectedBook] = useState(null);
  const isSmallScreen = useMediaQuery("(max-width: 720px)");
  const isMediumScreen = useMediaQuery("(max-width: 960px)");
  const dispatch = useDispatch();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const errorPost = useSelector((state) => state.post.error);
  const lastAddedBook = useSelector((state) => state.post.data);
  const booksArray = useSelector((state) => state.books.recoverBooksArray);

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    },
    title: {
      display: "flex",
      alignItems: "center",
      fontSize: "3rem",
    },
    loading: {
      display: "block",
      margin: "auto",
      marginTop: theme.spacing(20),
    },
    bookTitle: {
      fontWeight: "bold",
      fontSize: isMediumScreen ? "0.88rem" : isSmallScreen ? "0.8rem" : "1rem",
      marginTop: isSmallScreen ? "1rem" : "0",
    },
    bookAuthor: {
      color: theme.palette.text.secondary,
      marginBottom: theme.spacing(1),
      fontSize: isMediumScreen
        ? "0.75rem"
        : isSmallScreen
        ? "0.85rem"
        : "0.90rem",
    },
    link: {
      textDecoration: "none",
      color: "inherit",
    },
    pagination: {
      marginTop: theme.spacing(3),
      display: "flex",
      justifyContent: "center",
    },
  }));

  const classes = useStyles();
  const status = useSelector((state) => state.bookStore.status);
  const [page, setPage] = useState(1);
  const booksPerPage = 10;
  const numPages = Math.ceil(bookStoreData?.length / booksPerPage) || 0;
  const startIndex = (page - 1) * booksPerPage;
  const books = bookStoreData?.slice(startIndex, startIndex + booksPerPage);
  const books12 = bookStoreData?.slice(startIndex, startIndex + booksPerPage);

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleBookClick = (book) => {
    setSelectedBook(book);
    const imagePosition = document
      .getElementById(book.id)
      .getBoundingClientRect().top;

    // Scroll to the top of the book image
    if (selectedBook == null) {
      window.scrollTo({
        top: window.pageYOffset + imagePosition,
        behavior: "smooth",
      });
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  //Add google book to booklist from store
  const handleAddToBookList = (book) => {
    const {
      title,
      authors,
      publisher,
      categories,
      previewLink,
      publishedDate,
      pageCount,
    } = book.volumeInfo;

    const bookData = {
      title,
      author: authors,
      publisher,
      genre: categories,
      preview: previewLink,
      publicationDate: publishedDate,
      pages: pageCount,
      readingStatus: "Unread",
      currentPage: "",
      startDate: "",
      endDate: "",
      source: "Google Books",
    };

    dispatch(addBook(bookData));
    setSnackbarOpen(true);
  };

  const handleAddToCart = (book) => {
    const {
      title,
      imageLinks,
      pageCount,
    } = book.volumeInfo;

    const cartItemToPost = {
      title,
      imageLinks,
      price:pageCount,
      quantity:1
    }
    console.log(cartItemToPost)
    dispatch(addToCart(cartItemToPost))
  };

  const isBookInBookList = booksArray.some(([_, book]) => {
    return (
      book?.title === selectedBook?.volumeInfo.title &&
      book?.author?.includes(selectedBook?.volumeInfo.authors[0])
    );
  });

  useEffect(() => {
    dispatch(fetchBooks());
  }, [search, lastAddedBook]);

  const groupedBooks = {};
  books?.forEach((book) => {
    const genre = book.volumeInfo.categories?.[0] || "Uncategorized";
    if (groupedBooks[genre]) {
      groupedBooks[genre].push(book);
    } else {
      groupedBooks[genre] = [book];
    }
  });

  return (
    <div className={classes.root}>
      {selectedBook && (
        <Button
          variant="contained"
          color="primary"
          component={motion.button}
          whileTap={{ scale: 0.7, transition: { duration: 0.3 } }}
          whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
          onClick={() => setSelectedBook(null)}
          sx={{ my: isSmallScreen ? 3 : 3 }}
        >
          Close Book
        </Button>
      )}
      {bookStoreData?.length !== 0 && status == "loading" ? (
        <CircularProgress className={classes.loading} size={50} />
      ) : (
        <>
          <Grid
            container
            style={{
              display: "flex",
              justifyContent: "center",
              width: isSmallScreen ? "100%" : "80%",
              textAlign: "center",
            }}
          >
            {Object.entries(groupedBooks).map(([genre, books]) => (
              <Grid item xs={12} key={genre}>
                <Typography
                  component={motion.p}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  transition={{
                    layout: { type: "spring", damping: 17 },
                  }}
                  layout="position"
                  variant={isSmallScreen ? "h6" : "h5"}
                  style={{ marginBottom: "1rem" }}
                >
                  {genre}
                </Typography>
                <Grid
                  container
                  spacing={1}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {books?.map((book, index) => (
                    <Grid
                      id={book.id}
                      className="book-container"
                      component={motion.span}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 50 }}
                      transition={{
                        delay: index * 0.1,
                        layout: { type: "spring", damping: 17 },
                      }}
                      layout="position"
                      item
                      xs={selectedBook && selectedBook.id === book.id ? 12 : 4}
                      sm={selectedBook && selectedBook.id === book.id ? 12 : 4}
                      md={selectedBook && selectedBook.id === book.id ? 12 : 2}
                      key={book.id}
                      onClick={() => handleBookClick(book)}
                      style={{
                        margin: isSmallScreen
                          ? selectedBook && selectedBook.id === book.id
                            ? "3rem 1.5rem"
                            : "1.5rem"
                          : "3rem",
                        borderRadius: "15px",
                        padding:
                          selectedBook && selectedBook.id === book.id
                            ? "15px"
                            : " ",
                        boxShadow:
                          "0px 0px 0px 0px rgba(0,0,0,0.2), 0px 0px 0px 0px rgba(0,0,0,0.14), 0px 4px 20px 0px rgba(0,0,0,0.12)",
                        maxHeight: isSmallScreen ? "600px" : "none",
                        overflow: "auto",
                        backgroundColor:
                          selectedBook && selectedBook.id === book.id
                            ? "#36454F"
                            : "white",
                        color:
                          selectedBook && selectedBook.id === book.id
                            ? "white"
                            : "black",
                      }}
                    >
                      <div
                        style={{
                          borderRadius: "15px 15px 0 0",
                        }}
                      >
                        <motion.img
                          layout={true}
                          src={book.volumeInfo.imageLinks?.thumbnail || noImage}
                          alt={book.volumeInfo.title}
                          className={classes.image}
                          style={{
                            width: "100%",
                            aspectRatio: 3 / 3,
                            objectFit:
                              selectedBook && selectedBook.id === book.id
                                ? "contain"
                                : "cover",
                            height: "auto",
                            marginBottom: isSmallScreen ? "0" : "1rem",
                            maxWidth:
                              selectedBook && selectedBook.id === book.id
                                ? "300px"
                                : "none",
                          }}
                        />
                      </div>
                      <div style={{ padding: "0 5px" }}>
                        <Typography
                          component={motion.p}
                          layout="position"
                          variant="h6"
                          className={classes.bookTitle}
                          style={{ marginTop: isSmallScreen ? "0.8rem" : "" }}
                        >
                          {book.volumeInfo.title}
                        </Typography>
                        <Typography
                          component={motion.p}
                          layout="position"
                          variant="subtitle1"
                          className={classes.bookAuthor}
                          style={{
                            color:
                              selectedBook && selectedBook.id === book.id
                                ? "white"
                                : "grey",
                          }}
                        >
                          {book.volumeInfo.authors?.join(", ")}
                        </Typography>
                      </div>

                      <AnimatePresence mode="wait">
                        {selectedBook && selectedBook.id === book.id && (
                          <Box
                            style={{
                              marginBottom: "30px",
                              textAlign: "start",
                              padding: "15px",
                            }}
                            layout="position"
                            component={motion.span}
                            initial={{ opacity: 0, y: -30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30 }}
                          >
                            <Typography variant="subtitle1">
                              <b>Description : </b>
                              {selectedBook.volumeInfo.description ||
                                "Not Available"}
                            </Typography>
                            <Typography variant="subtitle1">
                              <b>Average Rating: </b>
                              {selectedBook.volumeInfo.averageRating ||
                                "Not Available"}
                            </Typography>
                            <Typography variant="subtitle1">
                              <b>Page Count: </b>
                              {selectedBook.volumeInfo.pageCount ||
                                "Not Available"}
                            </Typography>
                            <Typography
                              variant="subtitle1"
                              style={{ wordBreak: "break-all" }}
                            >
                              <b>Preview: </b>
                              <a
                                style={{
                                  color:
                                    selectedBook && selectedBook.id === book.id
                                      ? "white"
                                      : "inherit",
                                }}
                                href={selectedBook.volumeInfo.previewLink}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {selectedBook.volumeInfo.previewLink ||
                                  "Not Available"}
                              </a>
                            </Typography>
                            <br />
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-evenly",
                              }}
                            >
                              <Button
                                id="add-to-list-btn"
                                disabled={isBookInBookList ? true : false}
                                variant="contained"
                                color="primary"
                                component={motion.button}
                                whileTap={{ scale: 0.7 }}
                                whileHover={{
                                  scale: 1.05,
                                }}
                                // transition={{ duration: 0.6 }}
                                onClick={() => handleAddToBookList(book)}
                                style={{
                                  color: "white",
                                  border: isBookInBookList
                                    ? "1px solid white"
                                    : "inherit",
                                  cursor: isBookInBookList
                                    ? "crosshair"
                                    : "pointer",

                                  transition: "all 0.2s",
                                }}
                              >
                                {isBookInBookList
                                  ? "Already Added"
                                  : "Add To BookList"}
                              </Button>
                              <Button
                                variant="contained"
                                color="primary"
                                component={motion.button}
                                whileTap={{ scale: 0.7 }}
                                whileHover={{
                                  scale: 1.05,
                                }}
                                onClick={() => handleAddToCart(book)}
                                style={{
                                  color: "white",
                                  border: isBookInBookList
                                    ? "1px solid white"
                                    : "inherit",
                                  cursor: isBookInBookList
                                    ? "crosshair"
                                    : "pointer",

                                  transition: "all 0.2s",
                                }}
                              >
                                Add To Cart
                              </Button>
                            </div>
                          </Box>
                        )}
                      </AnimatePresence>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            ))}
          </Grid>

          {numPages !== 0 ? (
            <Pagination
              className={classes.pagination}
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
          ) : (
            <Typography
              component={motion.span}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duratiom: 0.6 }}
              style={{ fontSize: "2rem", color: "grey", marginTop: "4rem" }}
            >
              No Book Found
            </Typography>
          )}
        </>
      )}
      <SnackBar
        open={snackbarOpen}
        handleClose={handleSnackbarClose}
        message={errorPost ? errorPost : "Book added successfully"}
        severity={errorPost ? "warning" : "success"}
      />
      <Button
        variant="contained"
        color="primary"
        component={motion.button}
        whileTap={{ scale: 0.7, transition: { duration: 0.3 } }}
        whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
        onClick={() => navigate("/bookList")} //navigating to booklist on click
        sx={{
          my: isSmallScreen ? 3 : 3,
          position: "fixed",
          bottom: "5rem",
          right: "3rem",
        }}
      >
        Go To LIST ➤
      </Button>
    </div>
  );
};

export default Books;
