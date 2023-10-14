import React, { useState } from "react";
import {
  IconButton,
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Menu,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/system";

import {
  MoreVert,
  Image as ImageIcon,
  StarOutline,
  Star,
} from "@mui/icons-material";

const StyledListItem = styled(ListItem)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.secondary,
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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <StyledListItem>
      <ListItemAvatar>
        <StyledAvatar>
          <ImageIcon />
        </StyledAvatar>
      </ListItemAvatar>
      <ListItemText primary={fileName} secondary={updatedAt} />
      <ListItemSecondaryAction>
        <StyledIconButton>
          {starred ? <Star /> : <StarOutline />}
        </StyledIconButton>
        <StyledIconButton edge="end" aria-label="options" onClick={handleClick}>
          <MoreVert />
        </StyledIconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Download</MenuItem>
          <MenuItem onClick={handleClose}>Delete</MenuItem>
        </Menu>
      </ListItemSecondaryAction>
    </StyledListItem>
  );
};

export default FileItem;
