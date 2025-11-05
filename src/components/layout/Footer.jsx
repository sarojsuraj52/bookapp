import React from "react";
import { Typography, Box } from "@mui/material";
import { Link } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        padding: 2,
        paddingBottom: "40px",
      }}
    >
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        sx={{
          position: 'fixed',
          bottom:0,
          left: 0,
          right: 0,
          minHeight: "30px",
          padding: "8px",
          backgroundColor: "#f5f5f5",
          display:'flex',
          justifyContent:'center',
          alignItems:'center',
          zIndex:1
        }}
      >
        	&#169;
        <Link
          color="primary"
          href="https://milktrackrapp.web.app/"
          target="_blank"
          sx={{textDecoration:'none'}}
        >
          &nbsp;Suraj Solutions Pvt Ltd&nbsp;
        </Link>
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Box>
  );
};

export default Footer;
