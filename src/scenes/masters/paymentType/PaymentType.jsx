import { Box, Dialog, DialogContent, DialogTitle, Slide } from "@mui/material";

import Grid from "@mui/material/Grid2";
import { Form, Formik } from "formik";
import TextField from "../../../components/formsUI/TextField";
import Button from "../../../components/formsUI/Button";
import { PAYMENT_TYPE_VALIDATION } from "../../../schemas/paymentTypeSchema";
import HandleJwtError from "../../../validations/HandleJwtError";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  createPaymentType,
  updatePaymentType,
} from "../../../services/PaymentTypeService";
import React from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PaymentType = ({ getAllPaymentType, open, handleClose, rowData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const PAYMENT_TYPE_INITIAL_VALUES = {
    paymentTypeName: "",
    description: "",
  };
  if (rowData) {
    const { paymentTypeName, description } = rowData;
    PAYMENT_TYPE_INITIAL_VALUES.paymentTypeName = paymentTypeName;
    PAYMENT_TYPE_INITIAL_VALUES.description = description;
  }

  const onSubmit = (values, onSubmitProps) => {
    const paymentTypeObj = {
      paymentTypeName: values.paymentTypeName,
      description: values.description,
    };

    if (rowData) {
      updatePaymentType(rowData.id, paymentTypeObj)
        .then((res) => {
          handleClose();
          getAllPaymentType();
        })
        .catch((error) => {
          console.error(error.response.data);
          HandleJwtError(error.response.data.errorCode, navigate, dispatch);
        });
    } else {
      createPaymentType(paymentTypeObj)
        .then((res) => {
          onSubmitProps.resetForm();
          onSubmitProps.setSubmitting(false);
          getAllPaymentType();
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
        <DialogTitle>Add PaymentType</DialogTitle>
        <DialogContent>
          <Box mt={2}>
            <Formik
              initialValues={PAYMENT_TYPE_INITIAL_VALUES}
              validationSchema={PAYMENT_TYPE_VALIDATION}
              onSubmit={onSubmit}
            >
              {(formik) => (
                <Form>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        name="paymentTypeName"
                        label="PaymentType Name"
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
                    <Grid container size={{ xs: 12 }}>
                      <Grid size={{ xs: 9 }}></Grid>
                      <Grid size={{ xs: 3 }}>
                        <Button
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

export default PaymentType;
