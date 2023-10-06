import React, { useState } from "react";
import {
  IconButton,
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Theme,
  Menu,
  MenuItem,
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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    console.log("handleClick", event);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
          onClick={handleClick}
        >
          <MoreVert />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Download</MenuItem>
          <MenuItem onClick={handleClose}>Delete</MenuItem>
        </Menu>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default FileItem;
