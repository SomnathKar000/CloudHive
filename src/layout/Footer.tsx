import React from "react";
import { Box, Typography } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#333",
        color: "#fff",
        textAlign: "center",
        padding: "1rem",
        bottom: 0,
        width: "100%",
      }}
    >
      <Typography variant="body2">
        &copy; {new Date().getFullYear()} Somnath Kar. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
