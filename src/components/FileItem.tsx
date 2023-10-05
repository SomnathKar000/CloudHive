import React from "react";
import {
  IconButton,
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Theme,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import {
  MoreVert,
  Image as ImageIcon,
  StarOutline,
  Star,
} from "@mui/icons-material";

const useStyles = makeStyles((theme: Theme) => ({
  listItem: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
  iconButton: {
    color: theme.palette.text.secondary,
  },
}));

interface FileItemProps {
  id: number;
  fileName: string;
  contentType: string;
  starred: boolean;
  updatedAt: string;
}

const FileItem: React.FC<FileItemProps> = ({
  fileName,
  starred,
  updatedAt,
}) => {
  const classes = useStyles();

  return (
    <ListItem className={classes.listItem}>
      <ListItemAvatar>
        <Avatar className={classes.avatar}>
          <ImageIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={fileName} secondary={updatedAt} />
      <ListItemSecondaryAction>
        <IconButton className={classes.iconButton}>
          {starred ? <Star /> : <StarOutline />}
        </IconButton>
        <IconButton
          className={classes.iconButton}
          edge="end"
          aria-label="options"
        >
          <MoreVert />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default FileItem;
