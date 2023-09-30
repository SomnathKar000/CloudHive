import React, { useRef } from "react";
import { Box, Typography, TextField, FormControl, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Login = () => {
  const emailRef = useRef(null);
  const passwordref = useRef(null);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <Box>
      <FormControl
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          gap: 5,
        }}
        onSubmit={handleSubmit}
        component={"form"}
      >
        <Typography textAlign="center" gutterBottom variant="h3">
          Coud Hive
        </Typography>
        <TextField
          inputRef={emailRef}
          type="email"
          required
          label="Email"
          fullWidth
        />
        <TextField inputRef={passwordref} required label="Password" fullWidth />
        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: "#6c63ff",
            "&:hover": { backgroundColor: "#5a50d3" },
          }}
        >
          Submit
        </Button>
        <Typography textAlign="center" variant="subtitle1" gutterBottom>
          DON'T HAVE AN ACCOUNT?{" "}
          <Link
            style={{ textDecoration: "none", color: "#6c63ff" }}
            to="/sign-up"
          >
            REGISTER
          </Link>
        </Typography>
      </FormControl>
    </Box>
  );
};

export default Login;
