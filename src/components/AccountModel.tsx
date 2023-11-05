import react, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, TextField, Grid } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface BasicModelProps {
  open: boolean;
  type: string;
  handleClose: () => void;
}

const BasicModal: react.FC<BasicModelProps> = ({ open, handleClose, type }) => {
  const [updateData, setUpdateData] = useState<string>("");
  const [currentPassword, setCurrentPassword] = useState<string>("");

  const handleSubmit = () => {
    console.log(updateData, type, currentPassword);
    handleClose();
  };
  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component="form" sx={style}>
          <Typography
            textAlign="center"
            id="modal-modal-title"
            variant="h6"
            component="h2"
            mb={3}
          >
            Update {type}
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                value={updateData}
                variant="outlined"
                label={`Enter New ${type}`}
                fullWidth
                onChange={(e) => setUpdateData(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Enter Current Password"
                variant="outlined"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Box
            gap={5}
            sx={{ mt: 3, display: "flex", justifyContent: "center" }}
          >
            <Button
              variant="contained"
              color="success"
              type="submit"
              onClick={handleSubmit}
            >
              Submit
            </Button>
            <Button variant="contained" color="error" onClick={handleClose}>
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default BasicModal;
