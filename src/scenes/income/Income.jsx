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
import { INCOME_VALIDATION } from "../../schemas/incomeSchema";
import { createIncome, updateIncome } from "../../services/incomeService";
import HandleJwtError from "../../validations/HandleJwtError";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/DateUtils";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Income = ({
  getAllIncomesByDate,
  open = false,
  handleClose,
  incomeYearMonth,
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
  if (incomeYearMonth) {
    const month = dayjs(incomeYearMonth?.value).get("month");
    monthName = monthNames[month];
    monthYear = dayjs(incomeYearMonth?.value).get("year");
  }

  const INCOME_INITIAL_VALUES = {
    incomeName: "",
    incomeDate: null,
    amount: "",
    incomeAccountType: "",
    incomeCategoryType: "",
    incomePaymentType: "",
    description: "",
  };

  if (rowData) {
    dayjs.extend(customParseFormat);

    const {
      incomeName,
      incomeDate,
      amount,
      accountResponseDto,
      categoryResponseDto,
      paymentTypeResponseDto,
      description,
    } = rowData;
    console.log(rowData);
    INCOME_INITIAL_VALUES.incomeDate = dayjs(incomeDate, "YYYY/MM/DD H:mm:ss");
    INCOME_INITIAL_VALUES.incomeName = incomeName;
    INCOME_INITIAL_VALUES.amount = amount;
    INCOME_INITIAL_VALUES.incomeAccountType = accountResponseDto?.id;
    INCOME_INITIAL_VALUES.incomeCategoryType = categoryResponseDto?.id;
    INCOME_INITIAL_VALUES.incomePaymentType = paymentTypeResponseDto?.id;
    INCOME_INITIAL_VALUES.description = description;
  }

  const onSubmit = (values, onSubmitProps) => {
    const incomeObj = {
      incomeName: values.incomeName,
      incomeDate: formatDate(values?.incomeDate, "YYYY-MM-DD HH:mm:ss"),
      amount: values.amount,
      description: values.description,
      categoryId: values.incomeCategoryType,
      accountId: values.incomeAccountType,
      paymentTypeId: values.incomePaymentType,
    };

    if (rowData) {
      updateIncome(rowData?.id, incomeObj)
        .then((res) => {
          handleClose();
          const startDate = formatDate(
            dayjs(incomeObj.incomeDate).startOf("month"),
            "YYYY-MM-DD"
          );
          const endDate = formatDate(
            dayjs(incomeObj.incomeDate).endOf("month"),
            "YYYY-MM-DD"
          );
          getAllIncomesByDate(startDate, endDate);
        })
        .catch((error) => {
          console.error(error.response.data);
          HandleJwtError(error.response.data.errorCode, navigate, dispatch);
        })
        .finally(() => {
          onSubmitProps.setSubmitting(false);
        });
    } else {
      createIncome(incomeObj)
        .then((res) => {
          console.log(res);
          onSubmitProps.resetForm();
          onSubmitProps.setSubmitting(false);
          const startDate = formatDate(
            dayjs(incomeObj.incomeDate).startOf("month"),
            "YYYY-MM-DD"
          );
          const endDate = formatDate(
            dayjs(incomeObj.incomeDate).endOf("month"),
            "YYYY-MM-DD"
          );
          getAllIncomesByDate(startDate, endDate);
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
        <DialogTitle>Add Income {`(${monthName}-${monthYear})`}</DialogTitle>
        <DialogContent>
          <Box mt={2}>
            <Formik
              initialValues={INCOME_INITIAL_VALUES}
              validationSchema={INCOME_VALIDATION}
              onSubmit={onSubmit}
            >
              {(formik) => (
                <Form>
                  <Grid container spacing={1.5}>
                    <Grid size={{ xs: 6 }}>
                      <DateTimePicker
                        name="incomeDate"
                        label="Income Date"
                        fullWidth={true}
                        size="small"
                        autoFocus
                      />
                    </Grid>

                    <Grid size={{ xs: 6 }}>
                      <TextField
                        type="text"
                        label="Income Name"
                        name="incomeName"
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
                        name="incomeAccountType"
                        size="small"
                        label="Account"
                        fullWidth={true}
                        options={accountIdAndNameList}
                      />
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                      <Select
                        name="incomeCategoryType"
                        size="small"
                        label="Category"
                        fullWidth={true}
                        options={categoryIdAndNameList}
                      />
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                      <Select
                        name="incomePaymentType"
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

export default Income;
