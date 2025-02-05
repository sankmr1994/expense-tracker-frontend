import { Dialog, DialogActions, DialogTitle } from "@mui/material";
import Button from "../formsUI/Button";
import React from "react";

const DeleteDialogue = ({
  open,
  handleDeleteClose,
  rowData,
  ...otherProps
}) => {
  const handleDelete = () => {
    handleDeleteClose(true, rowData, otherProps);
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleDeleteClose}
        fullWidth
        maxWidth="xs"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "& .MuiDialog-container": {
            justifyContent: "center",
            alignItems: "center",
          },
        }}
        p={2}
      >
        <DialogTitle id="alert-dialog-title">{"Want to delete?"}</DialogTitle>
        <DialogActions>
          <Button onClick={handleDeleteClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default DeleteDialogue;
