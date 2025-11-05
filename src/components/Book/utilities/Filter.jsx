import FilterAltIcon from "@mui/icons-material/FilterAlt";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import BookIcon from "@mui/icons-material/Book";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import PlayLessonIcon from "@mui/icons-material/PlayLesson";
import { useDispatch } from "react-redux";
import { bookActions } from "../../../store/bookSlice";
import React, { useState } from "react";
import { Menu, MenuItem, IconButton } from "@mui/material";

function Filter() {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();

  const handleReadFilter = () => {
    dispatch(bookActions.filterRead());
  };
  const handleUnReadFilter = () => {
    dispatch(bookActions.filterUnRead());
  };
  const handleReadingFilter = () => {
    dispatch(bookActions.filterReading());
  };
  const handleClearFilter = () => {
    dispatch(bookActions.clearFilter());
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <FilterAltIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleReadFilter}>
          <BookIcon color="primary" />
          <span>&nbsp; Read</span>
        </MenuItem>
        <MenuItem onClick={handleUnReadFilter}>
          <AutoStoriesIcon color="secondary" />
          <span>&nbsp; Unread</span>
        </MenuItem>
        <MenuItem onClick={handleReadingFilter}>
          <PlayLessonIcon color="info" />
          <span>&nbsp; Reading</span>
        </MenuItem>
        <MenuItem onClick={handleClearFilter}>
          <HighlightOffIcon color="error" />
          <span>&nbsp; Clear Filter</span>
        </MenuItem>
      </Menu>
    </>
  );
}

export default Filter;
