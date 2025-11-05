import * as React from "react";
import Box from "@mui/material/Box";
import { Modal, duration } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

const style = {
  position: "absolute",
  backgroundColor: "white",
  margin: "0 auto",
  left: "50%",
  top: "50%",
  transform: "translate(-50%,-50%)",
  width: "82%",
  maxWidth: "600px",
  height: "auto",
  maxHeight: "600px",
  overflow: "auto",
  bgcolor: "background.paper",
  boxShadow: 10,
  p: 2,
  borderRadius: "5px",
  padding: "1rem",
};

export default function CommonModal({ onClose, open, children }) {
  return (
    <>
      <Modal
        disableScrollLock={true}
        open={open}
        onClose={onClose}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <motion.span
          style={{ width: "100%", scrollBehavior: "smooth" }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: 1,
            opacity: 1,
            // transition: { type: "spring",damping:17,stiffness:150 },
          }}
          exit={{ scale: 0.8, opacity: 0, transition: { duration: 0.2 } }}
          layout='position'
          transition={{duration:0.65,type: "spring"}}
        >
          <Box sx={style}>{children}</Box>
        </motion.span>
      </Modal>
    </>
  );
}
