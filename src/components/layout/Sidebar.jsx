import React, { useState } from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { NavLink } from "react-router-dom";
import Box from "@mui/material/Box/Box";
import { Typography } from "@material-ui/core";
import BookIcon from "@mui/icons-material/Book";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ViewStreamIcon from "@mui/icons-material/ViewStream";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import "./Sidebar.css";
import { makeStyles } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";
import { motion, AnimatePresence } from "framer-motion";

const AnimatedDiv = () => {
  return (
    <div className="animated-div-container">
      <ul className="cubes">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  );
};

const Sidebar = ({ open, onOpen, onClose }) => {
  const isSmallScreen = useMediaQuery("(max-width: 720px)");
  const useStyles = makeStyles({
    drawerPaper: {
      overflow: "hidden",
    },
  });
  const classes = useStyles();
  return (
    <>
      <SwipeableDrawer
        classes={{
          paper: classes.drawerPaper,
        }}
        sx={{ overflow: "hidden" }}
        open={open}
        onOpen={onOpen}
        onClose={onClose}
      >
        <motion.span
          layout="position"
          animate={{
            opacity: open ? 1 : 0,
            x: open ? 0 : -50,
            // width: open ? (isSmallScreen ? 230 : 250) : 0,
            // transition: { duration: 1 },
          }}
          transition={{ type: "spring", damping: 13, stiffness: 160 }}
          style={{
            minWidth: isSmallScreen ? 230 : 250,
          }}
          role="presentation"
          className="area"
        >
          <span
            style={{
              borderBottom: "1px solid lightgrey",
            }}
          >
            <Typography
              color="primary"
              style={{
                fontWeight: "600",
                display: "flex",
                alignItems: "center",
                margin: "10px 0",
                padding: "5px",
                color: "#038aff",
                fontSize: isSmallScreen ? "1.9rem" : "2rem",
              }}
              variant="h4"
            >
              <BookIcon fontSize="" /> BookHistory
            </Typography>
          </span>

          <Box
            className="nav"
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              mt: 10,
              fontFamily: "sans-serif",
            }}
          >
            <motion.span
              whileHover={{
                boxShadow: "inset 300px 0 0 0 #2e9dff",
                color: "#FFF",
                transition: { duration: 0.2 },
              }}
              layout="position"
              style={{
                color: "#000",
                marginTop: "8px",
              }}
            >
              <NavLink to="/" className="link">
                <DashboardIcon /> &nbsp;&nbsp;Dashboard
              </NavLink>
            </motion.span>

            <motion.span
              whileHover={{
                boxShadow: "inset 300px 0 0 0 #2e9dff",
                color: "#FFF",
                transition: { duration: 0.2 },
              }}
              layout="position"
              style={{
                color: "#000",
                marginTop: "8px",
              }}
            >
              <NavLink to="/bookList" className="link">
                <ViewStreamIcon /> &nbsp;&nbsp;Book List
              </NavLink>
            </motion.span>
            <motion.span
              whileHover={{
                boxShadow: "inset 300px 0 0 0 #2e9dff",
                color: "#FFF",
                transition: { duration: 0.2 },
              }}
              layout="position"
              style={{
                color: "#000",
                marginTop: "8px",
              }}
            >
              <NavLink to="/bookStore" className="link">
                <LocalMallIcon /> &nbsp;&nbsp;Book Store
              </NavLink>
            </motion.span>
          </Box>
        </motion.span>
        <AnimatedDiv />
      </SwipeableDrawer>
    </>
  );
};

export default React.memo(Sidebar);
