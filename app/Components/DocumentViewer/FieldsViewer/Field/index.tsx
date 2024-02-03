import React from "react";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";

import { IFieldComoponent } from "@/app/utils/interfaces/documentField";

const Field = (props: IFieldComoponent) => {
  const { field, checked, handleSelectedFields, deleteHandler } = props || {};

  const { id, label, content, color } = field || {};

  return (
    <ListItem
      disablePadding
      secondaryAction={
        <>
          <Checkbox
            checked={checked}
            onChange={() =>
              handleSelectedFields(content?.position || [], id, color)
            }
          />
          <IconButton
            onClick={() => {
              deleteHandler(id);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </>
      }
      sx={{
        bgcolor: "grey.700",
        mt: 1,
      }}
    >
      <ListItemButton
        onClick={() => handleSelectedFields(content?.position || [], id, color)}
      >
        <ListItemIcon>
          <Box bgcolor={color} p={1} borderRadius={1}>
            <Typography>{label.charAt(0)}</Typography>
          </Box>
        </ListItemIcon>
        <ListItemText title={content?.orig_value}>
          <Typography>{label}</Typography>
          <Typography variant="caption">{content?.orig_value}</Typography>
        </ListItemText>
      </ListItemButton>
    </ListItem>
  );
};

export default Field;
