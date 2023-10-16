import React from "react";
import { Box, Typography, Tooltip } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer: React.FC = () => {
  return (
    <Box
      component={"footer"}
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
      <Tooltip title="GitHub">
        <a
          href="https://github.com/SomnathKar000"
          target="_blank"
          rel="noreferrer"
        >
          <GitHubIcon
            sx={{
              fontSize: "1.5rem",
              margin: "0 1rem",
              color: "white",
            }}
          />
        </a>
      </Tooltip>
      <Tooltip title="LinkedIn">
        <a
          href="https://www.linkedin.com/in/somnath-kar-aa73aa1a3/"
          target="_blank"
          rel="noreferrer"
        >
          <LinkedInIcon
            sx={{ fontSize: "1.5rem", margin: "0 1rem", color: "#0072b1" }}
          />
        </a>
      </Tooltip>
    </Box>
  );
};

export default Footer;
