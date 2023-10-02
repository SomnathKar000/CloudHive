import FileItem from "./FileItem";
import { Typography, Grid, List } from "@mui/material";
import { Files } from "../utills/helpers/arrays";
import { formatTime } from "../utills/helpers/helpers";

const FileList = () => {
  return (
    <Grid item xs={12} md={6} mb={6}>
      <Typography
        sx={{ mt: 4, mb: 2 }}
        variant="h6"
        component="div"
      ></Typography>
      <List>
        {Files.map(({ id, fileName, contentType, starred, updatedAt }) => (
          <FileItem
            key={id}
            id={id}
            fileName={fileName}
            contentType={contentType}
            starred={starred}
            updatedAt={formatTime(updatedAt)}
          />
        ))}
      </List>
    </Grid>
  );
};

export default FileList;