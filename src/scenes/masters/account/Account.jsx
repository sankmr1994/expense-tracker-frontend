import { Box, Dialog, DialogContent, DialogTitle, Slide } from "@mui/material";
import Button from "../../../components/formsUI/Button";
import Grid from "@mui/material/Grid2";
import { Form, Formik } from "formik";
import TextField from "../../../components/formsUI/TextField";
import {
  createAccount,
  updateAccount,
} from "../../../services/AccountsService";
import { ACCOUNT_VALIDATION } from "../../../schemas/accountSchema";
import HandleJwtError from "../../../validations/HandleJwtError";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import React from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Account = ({ getAllAccount, open, handleClose, rowData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const ACCOUNT_INITIAL_VALUES = {
    accountName: "",
    description: "",
    amount: "",
  };
  if (rowData) {
    const { accountName, description, amount } = rowData;
    ACCOUNT_INITIAL_VALUES.accountName = accountName;
    ACCOUNT_INITIAL_VALUES.description = description;
    ACCOUNT_INITIAL_VALUES.amount = amount;
  }

  const onSubmit = (values, onSubmitProps) => {
    const accountObj = {
      accountName: values.accountName,
      description: values.description,
      amount: values.amount,
    };

    if (rowData) {
      updateAccount(rowData.id, accountObj)
        .then((res) => {
          handleClose();
          getAllAccount();
        })
        .catch((error) => {
          console.error(error.response.data);
          HandleJwtError(error.response.data.errorCode, navigate, dispatch);
        });
    } else {
      createAccount(accountObj)
        .then((res) => {
          onSubmitProps.resetForm();
          onSubmitProps.setSubmitting(false);
          getAllAccount();
        })
        .catch((error) => {
          console.error(error.response);
          HandleJwtError(error.response.data.errorCode, navigate, dispatch);
          onSubmitProps.setSubmitting(false);
        });
    }
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="md"
        TransitionComponent={Transition}
        sx={{
          "& .MuiDialog-container": {
            justifyContent: "center",
            alignItems: "flex-start",
          },
        }}
      >
        <DialogTitle>Add Account</DialogTitle>
        <DialogContent>
          <Box mt={2}>
            <Formik
              initialValues={ACCOUNT_INITIAL_VALUES}
              validationSchema={ACCOUNT_VALIDATION}
              onSubmit={onSubmit}
              enableReinitialize={true}
            >
              {(formik) => (
                <Form>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        name="accountName"
                        label="Account Name"
                        fullWidth={true}
                        size="small"
                        autoFocus
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        name="description"
                        label="Description"
                        multiline={true}
                        rows={4}
                        fullWidth={true}
                        size="small"
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        type="number"
                        label="Amount"
                        name="amount"
                        fullWidth={true}
                      />
                    </Grid>
                    <Grid container size={{ xs: 12 }}>
                      <Grid size={{ xs: 9 }}></Grid>
                      <Grid size={{ xs: 3 }}>
                        <Button
                          type="button"
                          color="secondary"
                          onMouseDown={handleClose}
                          onClick={handleClose}
                          sx={{ marginRight: 1 }}
                          size="small"
                        >
                          Cancel
                        </Button>
                        <Button
                          disabled={!formik.isValid || formik.isSubmitting}
                          color="success"
                          type="submit"
                          size="small"
                        >
                          Submit
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Box>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default Account;
