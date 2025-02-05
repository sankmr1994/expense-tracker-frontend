import { Box, Dialog, DialogContent, DialogTitle, Slide } from "@mui/material";
import Button from "../../components/formsUI/Button";
import Grid from "@mui/material/Grid2";
import { Form, Formik } from "formik";
import DateTimePicker from "../../components/formsUI/DateTimePicker";
import TextField from "../../components/formsUI/TextField";
import Select from "../../components/formsUI/Select";
import { monthNames } from "../../utils/monthNames";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { EXPENSE_VALIDATION } from "../../schemas/expenseSchema";
import { createExpense, updateExpense } from "../../services/ExpenseService";
import HandleJwtError from "../../validations/HandleJwtError";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/DateUtils";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Expense = ({
  getAllExpensesByDate,
  open = false,
  handleClose,
  expenseYearMonth,
  rowData,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const accountIdAndNameList = useSelector(
    (store) => store.account.accountIdAndNameList
  );

  const categoryIdAndNameList = useSelector(
    (store) => store.category.categoryIdAndNameList
  );

  const paymentTypeIdAndNameList = useSelector(
    (store) => store.paymentType.paymentTypeIdAndNameList
  );

  let monthName = "";
  let monthYear = "";
  if (expenseYearMonth) {
    const month = dayjs(expenseYearMonth?.value).get("month");
    monthName = monthNames[month];
    monthYear = dayjs(expenseYearMonth?.value).get("year");
  }

  const EXPENSE_INITIAL_VALUES = {
    expenseName: "",
    expenseDate: null,
    amount: "",
    expenseAccountType: "",
    expenseCategoryType: "",
    expensePaymentType: "",
    description: "",
  };

  if (rowData) {
    dayjs.extend(customParseFormat);
    const {
      expenseName,
      expenseDate,
      amount,
      accountResponseDto,
      categoryResponseDto,
      paymentTypeResponseDto,
      description,
    } = rowData;
    EXPENSE_INITIAL_VALUES.expenseDate = dayjs(
      expenseDate,
      "YYYY/MM/DD H:mm:ss"
    );
    EXPENSE_INITIAL_VALUES.expenseName = expenseName;
    EXPENSE_INITIAL_VALUES.amount = amount;
    EXPENSE_INITIAL_VALUES.expenseAccountType = accountResponseDto?.id;
    EXPENSE_INITIAL_VALUES.expenseCategoryType = categoryResponseDto?.id;
    EXPENSE_INITIAL_VALUES.expensePaymentType = paymentTypeResponseDto?.id;
    EXPENSE_INITIAL_VALUES.description = description;
  }

  const onSubmit = (values, onSubmitProps) => {
    const expenseObj = {
      expenseName: values.expenseName,
      expenseDate: formatDate(values?.expenseDate, "YYYY-MM-DD HH:mm:ss"),
      amount: values.amount,
      description: values.description,
      categoryId: values.expenseCategoryType,
      accountId: values.expenseAccountType,
      paymentTypeId: values.expensePaymentType,
    };

    if (rowData) {
      updateExpense(rowData?.id, expenseObj)
        .then((res) => {
          handleClose();
          const startDate = formatDate(
            dayjs(expenseObj.expenseDate).startOf("month"),
            "YYYY-MM-DD"
          );
          const endDate = formatDate(
            dayjs(expenseObj.expenseDate).endOf("month"),
            "YYYY-MM-DD"
          );
          getAllExpensesByDate(startDate, endDate);
        })
        .catch((error) => {
          console.error(error.response.data);
          HandleJwtError(error.response.data.errorCode, navigate, dispatch);
        })
        .finally(() => {
          onSubmitProps.setSubmitting(false);
        });
    } else {
      createExpense(expenseObj)
        .then((res) => {
          console.log(res);
          onSubmitProps.resetForm();
          onSubmitProps.setSubmitting(false);
          const startDate = formatDate(
            dayjs(expenseObj.expenseDate).startOf("month"),
            "YYYY-MM-DD"
          );
          const endDate = formatDate(
            dayjs(expenseObj.expenseDate).endOf("month"),
            "YYYY-MM-DD"
          );
          getAllExpensesByDate(startDate, endDate);
        })
        .catch((error) => {
          console.error(error.response);
          HandleJwtError(error.response.data.errorCode, navigate, dispatch);
          onSubmitProps.setSubmitting(false);
        })
        .finally(() => {
          onSubmitProps.setSubmitting(false);
        });
    }
  };

  const handleReset = (resetForm) => {
    if (window.confirm("Reset?")) {
      resetForm();
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
        <DialogTitle>Add Expense {`(${monthName}-${monthYear})`}</DialogTitle>
        <DialogContent>
          <Box mt={2}>
            <Formik
              initialValues={EXPENSE_INITIAL_VALUES}
              validationSchema={EXPENSE_VALIDATION}
              onSubmit={onSubmit}
            >
              {(formik) => (
                <Form>
                  <Grid container spacing={1.5}>
                    <Grid size={{ xs: 6 }}>
                      <DateTimePicker
                        name="expenseDate"
                        label="Expense Date"
                        fullWidth={true}
                        size="small"
                        autoFocus
                      />
                    </Grid>

                    <Grid size={{ xs: 6 }}>
                      <TextField
                        type="text"
                        label="Expense Name"
                        name="expenseName"
                        fullWidth={true}
                        size="small"
                      />
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                      <TextField
                        type="number"
                        label="Amount"
                        name="amount"
                        fullWidth={true}
                        size="small"
                      />
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                      <Select
                        name="expenseAccountType"
                        size="small"
                        label="Account"
                        fullWidth={true}
                        options={accountIdAndNameList}
                      />
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                      <Select
                        name="expenseCategoryType"
                        size="small"
                        label="Category"
                        fullWidth={true}
                        options={categoryIdAndNameList}
                      />
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                      <Select
                        name="expensePaymentType"
                        size="small"
                        label="PaymentType"
                        fullWidth={true}
                        options={paymentTypeIdAndNameList}
                      />
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                      <TextField
                        name="description"
                        label="Description"
                        multiline={true}
                        rows={3}
                        fullWidth={true}
                        size="small"
                      />
                    </Grid>
                    <Grid container size={{ xs: 12 }}>
                      <Grid size={{ xs: 8 }}></Grid>
                      <Grid size={{ xs: 4 }}>
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
                          color="warning"
                          onClick={(e) => formik.resetForm()}
                          type="button"
                          sx={{ marginRight: 1 }}
                          size="small"
                        >
                          Reset
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

export default Expense;
