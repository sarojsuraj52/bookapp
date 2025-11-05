import React, { useState, useEffect } from "react";
import { InputBase } from "@material-ui/core";
import { Box } from "@material-ui/core";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useParams } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";

function SearchBar({ search }) {
  const params = useParams();
  const [searchTerm, setSearchTerm] = useState(params.id || "");
  const [isHovered, setIsHovered] = useState(false);

  const handleSearch = React.useCallback(() => {
    search(searchTerm);
  }, [search, searchTerm]);

  const handleKeyDown = React.useCallback(
    (event) => {
      if (event.key === "Enter") {
        handleSearch();
      }
    },
    [handleSearch]
  );

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <Box
      style={{
        width: "100%",
        padding: "3rem",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "fit-content",
          paddingLeft: 3,
          border: "1px solid #038aff",
          borderRadius: 5,
        }}
      >
        <InputBase
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
          style={{ margin: "0 15px", flex: 1 }}
          onKeyDown={handleKeyDown}
        ></InputBase>
        {searchTerm.length !== 0 && (
          <motion.div
            style={{
              color: isHovered ? "red" : "black",
              scale: isHovered ? 1.4 : 1,
              transition: "all 0.3s",
            }}
            onMouseEnter={() => setIsHovered((prev) => !prev)}
            onMouseLeave={() => setIsHovered((prev) => !prev)}
          >
            <CloseIcon
              onClick={() => setSearchTerm("")}
              sx={{ mr: 1.5, cursor: "pointer" }}
            />
          </motion.div>
        )}
        <IconButton
          style={{
            backgroundColor: "#038aff",
            borderRadius: 0,
            color: "white",
          }}
          onClick={handleSearch}
        >
          <SearchIcon style={{ fontSize: "2rem" }} />
        </IconButton>
      </Box>
    </Box>
  );
}

export default React.memo(SearchBar);
