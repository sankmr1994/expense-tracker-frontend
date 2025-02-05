import { Box, Container, Typography } from "@mui/material";
import PieChartUI from "../components/charts/PieChart";
import { Form, Formik } from "formik";
import dayjs from "dayjs";
import Grid from "@mui/material/Grid2";
import DateTimePickerWrapper from "../components/formsUI/DatePicker";
import { useEffect } from "react";
import { formatDate } from "../utils/DateUtils";
import { fetchPieChartDetailsByDate } from "../services/charts/PieChartService";
import HandleJwtError from "../validations/HandleJwtError";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addListOfExpenseByCategory } from "../reducers/charts/pieChartSlice";
import { currencyFormatter } from "../utils/currencyUtils";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pieChartDetailsResponse = useSelector(
    (store) => store.pieChart.pieChartDetailsResponse
  );

  const { pieChartDetailsList, totalAmount } = pieChartDetailsResponse;
  const EXPENSE_PAGE_INITIAL_VALUES = {
    expenseYearMonth: dayjs(Date.now()),
  };

  useEffect(() => {
    const startDate = formatDate(dayjs().startOf("month"), "YYYY-MM-DD");
    const endDate = formatDate(dayjs().endOf("month"), "YYYY-MM-DD");
    getPieChartDetailsByDate(startDate, endDate);
  }, []);

  const getPieChartDetailsByDate = (startDate, endDate) => {
    fetchPieChartDetailsByDate(startDate, endDate)
      .then((res) => {
        if (res?.data?.pieChartDetailsList[0]?.id) {
          dispatch(addListOfExpenseByCategory(res.data));
        } else {
          dispatch(
            addListOfExpenseByCategory({
              expenseDetailsResponse: [],
              totalAmount: 0,
            })
          );
        }
      })
      .catch((error) => {
        HandleJwtError(error.response.data.errorCode, navigate, dispatch);
      })
      .finally(() => {
        // setIsLoadingExpenseData(false);
      });
  };

  const handleMonthChange = (value) => {
    const startDate = formatDate(dayjs(value).startOf("month"), "YYYY-MM-DD");
    const endDate = formatDate(dayjs(value).endOf("month"), "YYYY-MM-DD");
    getPieChartDetailsByDate(startDate, endDate);
  };

  return (
    <Box>
      <Formik initialValues={EXPENSE_PAGE_INITIAL_VALUES}>
        {(formik) => (
          <Form>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12 }}>
                <DateTimePickerWrapper
                  views={["month", "year"]}
                  name="expenseYearMonth"
                  label="Expense Month"
                  size="small"
                  handleMonthChange={handleMonthChange}
                />
              </Grid>
              <Grid size={{ xs: 3.5 }}>
                <Typography
                  fontWeight="bold"
                  mt={2}
                  ml={8}
                  color="info"
                  variant="h5"
                >
                  Expense Data
                </Typography>
                <Box mt={-3}>
                  {pieChartDetailsList && (
                    <PieChartUI data={pieChartDetailsList} />
                  )}
                  <Typography variant="h5">
                    <span style={{ color: "orangered", fontWeight: "bold" }}>
                      Total :
                    </span>{" "}
                    {currencyFormatter.format(totalAmount)}
                  </Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 3.5 }}>
                <Typography
                  fontWeight="bold"
                  mt={2}
                  ml={8}
                  color="info"
                  variant="h5"
                >
                  Income Data
                </Typography>
                <Box mt={-3}>
                  {pieChartDetailsList && (
                    <PieChartUI data={pieChartDetailsList} />
                  )}
                </Box>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default Dashboard;
