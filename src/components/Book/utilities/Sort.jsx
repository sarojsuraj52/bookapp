import React, { useState } from "react";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import SortIcon from '@mui/icons-material/Sort';
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useDispatch, useSelector } from "react-redux";
import { bookActions } from "../../../store/bookSlice";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

function Sort() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isTitleAscending, setIsTitleAscending] = useState(null);
  const [isDateAscending, setIsDateAscending] = useState(null);
  const dispatch = useDispatch();

  const handleSortByTitle = () => {
    setIsTitleAscending((prev) => {
      if (prev == null) {
        return true;
      }
      if (prev == true) return false;
      if (prev == false) return true;
    });
    dispatch(bookActions.sortByTitle(isTitleAscending));
  };

  const handleSortByPublicationDate = () => {
    setIsDateAscending((prev) => {
      if (prev == null) {
        return true;
      }
      if (prev == true) return false;
      if (prev == false) return true;
    });
    dispatch(bookActions.sortByPublicationDate(isDateAscending));
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <SortIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleSortByTitle}>
          <SortByAlphaIcon color="primary" />
          <span>
            &nbsp;Title{" "}
            {isTitleAscending == null
              ? ""
              : isTitleAscending
              ? "(Ascending)"
              : "(Descending)"}
          </span>
        </MenuItem>
        <MenuItem onClick={handleSortByPublicationDate}>
          <CalendarMonthIcon color="secondary" />
          <span>
            &nbsp;Date{" "}
            {isDateAscending == null
              ? ""
              : isDateAscending
              ? "(Ascending)"
              : "(Descending)"}
          </span>
        </MenuItem>
      </Menu>
    </div>
  );
}

export default Sort;
