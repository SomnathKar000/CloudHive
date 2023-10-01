import * as React from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { Tooltip, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Container from "@mui/material/Container";
import LoadingButton from "@mui/lab/LoadingButton";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
  textAlign: "center",
};

const UploadContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "16px",
});
const VisuallyHiddenInput = styled("input")({
  display: "none",
});

export default function SpeedDialWithModal() {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [fileSelected, setFileSelected] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
    setFileSelected(false);
  };
  const handleClose = () => setOpen(false);
  const handleLoading = () => setLoading(true);
  const handleLoaded = () => setLoading(false);

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      console.log("Selected file:", selectedFile);
      setFileSelected(true);
    }
  };

  const handleFileUpload = () => {
    handleLoading();
    setTimeout(() => {
      handleLoaded();
      handleClose();
    }, 6000);
  };

  return (
    <Container>
      <Box sx={{ position: "fixed", bottom: "40px", right: "40px" }}>
        <SpeedDial
          onClick={handleOpen}
          ariaLabel="SpeedDial basic example"
          icon={<SpeedDialIcon />}
        ></SpeedDial>
      </Box>

      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h6" component="h2" gutterBottom>
            Upload your file
          </Typography>
          <UploadContainer>
            <label htmlFor="file-upload">
              <Tooltip title="Select your file">
                <CloudUploadIcon fontSize="large" />
              </Tooltip>
            </label>
            <Box sx={{ display: "flex", gap: "16px" }}>
              <LoadingButton
                onClick={handleFileUpload}
                loading={loading}
                variant="contained"
                color="primary"
                disabled={!fileSelected || loading}
              >
                Upload
              </LoadingButton>
              <Button
                disabled={loading}
                variant="contained"
                color="error"
                onClick={handleClose}
              >
                Close
              </Button>
            </Box>
            <VisuallyHiddenInput
              id="file-upload"
              type="file"
              onChange={handleSelect}
              disabled={loading}
            />
          </UploadContainer>
        </Box>
      </Modal>
    </Container>
  );
}
