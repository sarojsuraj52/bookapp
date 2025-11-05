import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button, Typography } from "@material-ui/core";
import CommonModal from "../common/CommonModal";
import Shop2Icon from "@mui/icons-material/Shop2";
import { useMediaQuery } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Badge } from "@mui/material";
import { motion } from "framer-motion";

const ViewBook = ({ book, onClose, open }) => {
  const isSmallScreen = useMediaQuery("(max-width: 600px)");
  const [variant, setVariant] = useState("outlined");

  console.log(book)
  const useStyles = makeStyles((theme) => ({
    badge: {
      fontSize: isSmallScreen ? 4 : 8.5, // Change the font size as per your requirements
      margin: "0 -10px",
    },
    title: {
      fontWeight: "bold",
      marginBottom: theme.spacing(2),
    },
    subtitle: {
      color: theme.palette.text.secondary,
      marginBottom: theme.spacing(2),
      fontFamily: "Segoe UI",
    },
    label: {
      fontWeight: "bold",
      marginRight: theme.spacing(1.2),
    },
    value: {
      marginBottom: theme.spacing(1),
    },
  }));
  const classes = useStyles();
  if (!book) {
    return null;
  }

  return (
    <CommonModal onClose={onClose} open={open}>
      <Box sx={{ p: 0 }}>
        <Typography component="h2" variant="h5" className={classes.title}>
          {book[1].title}
        </Typography>
        <Typography className={classes.subtitle}>{book[1].author || 'Not Available'}</Typography>
        <Typography className={classes.value}>
          <span className={classes.label}>Publisher:</span>
          {book[1].publisher || 'Not Available'}
        </Typography>
        <Typography className={classes.value}>
          <span className={classes.label}>Genre:</span>
          {book[1].genre || 'Not Available'}
        </Typography>
        <Typography className={classes.value}>
          <span className={classes.label}>Publication Date:</span>
          {new Date(book[1].publicationDate).toLocaleDateString() || 'Not Available'}
        </Typography>
        <Typography className={classes.value}>
          <span className={classes.label}>Pages:</span>
          {book[1].pages || 'Not Available'}
        </Typography>
        <Typography className={classes.value}>
          <span className={classes.label}>Reading Status:</span>
          {book[1].readingStatus || 'Not Available'}
        </Typography>
        {book[1].readingStatus === "reading" && (
          <React.Fragment>
            <Typography className={classes.value}>
              <span className={classes.label}>Current Page:</span>
              {book[1].currentPage || 'Not Available'}
            </Typography>
            <Typography className={classes.value}>
              <span className={classes.label}>Start Date:</span>
              {new Date(book[1].startDate).toLocaleDateString() || 'Not Available'}
            </Typography>
          </React.Fragment>
        )}
        {book[1].readingStatus === "read" && (
          <React.Fragment>
            <Typography className={classes.value}>
              <span className={classes.label}>Start Date:</span>
              {new Date(book[1].startDate).toLocaleDateString() || 'Not Available'}
            </Typography>
            <Typography className={classes.value}>
              <span className={classes.label}>End Date:</span>
              {new Date(book[1].endDate).toLocaleDateString()}
            </Typography>
          </React.Fragment>
        )}
        <Typography className={classes.value}>
          <span className={classes.label}>Source:</span>
          {book[1].source || 'Not Available'}
        </Typography>
        <Typography className={classes.value}>
          <span className={classes.label}>Preview Link:</span>
          <a href={book[1].preview} target="_blank">
            {book[1].preview || "Not Available"}
          </a>
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "2rem",
        }}
      >
        <Button
          variant="outlined"
          className={classes.value}
          style={{ whiteSpace: "nowrap" }}
        >
          <Link
            to={`/bookStore/${book[1].title}`}
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              color: "green",
            }}
          >
            <Shop2Icon />
            &nbsp;
            {isSmallScreen
              ? "Search store"
              : "Try to search this book on store "}
          </Link>
          <Badge
            classes={{ badge: classes.badge }}
            color="error"
            badgeContent="New"
            sx={{
              ml: isSmallScreen ? -4 : -3,
              mt: isSmallScreen ? -2 : -1,
              borderRadius: 10,
              minWidth: 25,
              height: 25,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textTransform: "none",
            }}
          />
        </Button>
        <Button
          variant={variant}
          onMouseEnter={() => setVariant("contained")}
          onMouseLeave={() => setVariant("outlined")}
          component={motion.div}
          whileTap={{ scale: 0.7, transition: { duration: 0.2 } }}
          whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
          layout
          onClick={onClose}
          color="secondary"
          className={classes.value}
          style={{ whiteSpace: "nowrap" }}
        >
          Close
        </Button>
      </Box>
    </CommonModal>
  );
};

export default ViewBook;
