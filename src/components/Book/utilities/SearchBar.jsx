import React from "react";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import { bookActions } from "../../../store/bookSlice";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Button } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";

const SearchBar = () => {
  const [searchText, setSearch] = React.useState("");
  const [isHovered, setIsHovered] = React.useState(false);
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    if (event && event.target) {
      setSearch(event.target.value);
      dispatch(bookActions.search(searchText));
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && searchText?.length !== 0) {
      handleSubmit();
    }
  };

  const clearFilter = () => {
    dispatch(bookActions.clearFilter());
  };

  React.useEffect(() => {
    if (searchText?.length === 0) {
      clearFilter();
    } else {
      clearFilter();
      handleSubmit();
    }
  }, [searchText]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mx: 1,
          border: "1px solid grey",
          borderRadius: 2,
          minWidth: "100px",
        }}
      >
        <InputBase
          onChange={(e) => handleSubmit(e)}
          value={searchText || ""}
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
          sx={{ ml: 1, flex: 1 }}
          onKeyDown={handleKeyDown}
        />
        {searchText.length !== 0 && (
          <CloseIcon
            onClick={() => setSearch("")}
            sx={{
              cursor: "pointer",
              transition: "all 0.3s",
              "&:hover": { color: "red", transform: "scale(1.2)" },
            }}
          />
        )}
        <IconButton size="medium" onClick={handleSubmit}>
          <SearchIcon />
        </IconButton>
      </Box>
    </>
  );
};

export default SearchBar;
