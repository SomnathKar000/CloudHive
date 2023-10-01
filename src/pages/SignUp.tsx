import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { Box, FormControl, Typography, TextField, Button } from "@mui/material";

const SignUp = () => {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordref = useRef(null);
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
          bgcolor: "Background.paper",
          width: 400,
          boxShadow: 24,
          p: 4,
          mt: 3,
          gap: 3,
        }}
        onSubmit={handleSubmit}
        component="form"
      >
        <Typography textAlign="center" gutterBottom variant="h3">
          Cloud Hive
        </Typography>
        <TextField label="Name" required inputRef={nameRef} />
        <TextField label="Email" type="email" required inputRef={emailRef} />
        <TextField label="Password" required inputRef={passwordRef} />
        <TextField
          label="Confirm Password"
          type="password"
          required
          inputRef={confirmPasswordref}
        />
        <Button
          variant="contained"
          type="submit"
          sx={{
            backgroundColor: "#6c63ff",
            "&:hover": { backgroundColor: "#5a50d3" },
          }}
        >
          Submit
        </Button>
        <Typography textAlign="center" variant="subtitle1" gutterBottom>
          ALREADY HAVE AN ACOUNT{" "}
          <Link
            style={{ textDecoration: "none", color: "#6c63ff" }}
            to="/login"
          >
            LOGIN
          </Link>
        </Typography>
      </FormControl>
    </Box>
  );
};

export default SignUp;
