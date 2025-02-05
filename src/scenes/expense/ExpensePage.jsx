import {
  deleteExpenseById,
  fetchExpenseByDate,
} from "../../services/ExpenseService";
import HandleJwtError from "../../validations/HandleJwtError";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid2";
import {
  Box,
  Container,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import DateTimePickerWrapper from "../../components/formsUI/DatePicker";
import dayjs from "dayjs";
import Expense from "./Expense";
import { useEffect, useState } from "react";
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { addExpenseDetails } from "../../reducers/expenseSlice";
import { currencyFormatter, inrPrice } from "../../utils/currencyUtils";
import Button from "../../components/formsUI/Button";
import { fetchAllAccountIdAndName } from "../../services/AccountsService";
import { addListOfAccountIdAndName } from "../../reducers/accountSlice";
import { fetchAllCategoryIdAndName } from "../../services/CategoryService";
import { addListOfCategoryIdAndName } from "../../reducers/categorySlice";
import { fetchAllPaymentTypeIdAndName } from "../../services/PaymentTypeService";
import { addListOfPaymentTypeIdAndName } from "../../reducers/patmentTypeSlice";
import DeleteDialogue from "../../components/dialogue/DeleteDialogue";
import { EXPENSE_PAGE_VALIDATION } from "../../schemas/expensePageSchema";
import { formatDate } from "../../utils/DateUtils";
import localizedFormat from "dayjs/plugin/localizedFormat";
import isToday from "dayjs/plugin/isToday";
import NoRow from "../../components/commons/NoRow";

const ExpensePage = () => {
  const [open, setOpen] = useState(false);
  const [openDeleteDialogue, setOpenDeleteDialogue] = useState(false);
  const [rowData, setRowData] = useState(null);
  const [isLoadingExpenseData, setIsLoadingExpenseData] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const expenses = useSelector((store) => store.expense.expenseDetailsResponse);
  const { expenseList, totalAmount } = expenses;
  let row = [];

  if (expenseList.length > 0) {
    let rowWiseSumIndex = "ROW_SUM";
    let index = 0;
    row = expenseList.map((expense) => {
      if (expense?.rowWiseTotal != null) {
        let id = rowWiseSumIndex + "-" + index;
        const copyExpense = {
          id: id,
          label: "Total",
          total: expense.rowWiseTotal,
        };
        index++;
        return copyExpense;
      }
      return expense;
    });
  }

  const EXPENSE_PAGE_INITIAL_VALUES = {
    expenseYearMonth: dayjs(Date.now()),
  };

  useEffect(() => {
    const startDate = formatDate(dayjs().startOf("month"), "YYYY-MM-DD");
    const endDate = formatDate(dayjs().endOf("month"), "YYYY-MM-DD");
    getAllExpensesByDate(startDate, endDate);
  }, []);

  useEffect(() => {
    getAllAccount();
  }, []);

  useEffect(() => {
    getAllCategory();
  }, []);

  useEffect(() => {
    getAllPaymentType();
  }, []);

  const getAllExpensesByDate = (startDate, endDate) => {
    setIsLoadingExpenseData(true);
    fetchExpenseByDate(startDate, endDate)
      .then((res) => {
        if (res?.data?.expenseList[0]?.id) {
          dispatch(addExpenseDetails(res.data));
        } else {
          dispatch(addExpenseDetails({ expenseList: [], totalAmount: 0 }));
        }
      })
      .catch((error) => {
        HandleJwtError(error.response.data.errorCode, navigate, dispatch);
      })
      .finally(() => {
        setIsLoadingExpenseData(false);
      });
  };

  //Get all accounts
  const getAllAccount = () => {
    fetchAllAccountIdAndName()
      .then((res) => {
        if (res?.data[0]) {
          dispatch(addListOfAccountIdAndName(res.data));
        } else {
          dispatch(addListOfAccountIdAndName([]));
        }
      })
      .catch((error) => {
        HandleJwtError(error.response.data.errorCode, navigate, dispatch);
      });
  };

  const getAllCategory = () => {
    fetchAllCategoryIdAndName("EXPENSE")
      .then((res) => {
        if (res?.data[0]) {
          dispatch(addListOfCategoryIdAndName(res.data));
        } else {
          dispatch(addListOfCategoryIdAndName([]));
        }
      })
      .catch((error) => {
        HandleJwtError(error.response.data.errorCode, navigate, dispatch);
      });
  };

  const getAllPaymentType = () => {
    fetchAllPaymentTypeIdAndName()
      .then((res) => {
        if (res?.data[0]) {
          dispatch(addListOfPaymentTypeIdAndName(res.data));
        } else {
          dispatch(addListOfPaymentTypeIdAndName([]));
        }
      })
      .catch((error) => {
        HandleJwtError(error.response.data.errorCode, navigate, dispatch);
      });
  };

  const columns = [
    {
      field: "expenseName",
      headerName: "Expense Name",
      minWidth: 150,
      align: "left",
      flex: 1,
      colSpan: (value, row) => {
        if (typeof row.id === "string" && row?.id?.includes("ROW_SUM")) {
          return 2;
        }
        return undefined;
      },
      valueGetter: (value, row) => {
        if (typeof row.id === "string" && row?.id?.includes("ROW_SUM")) {
          return row.label;
        }
        return value;
      },
    },

    {
      field: "expenseDate",
      headerName: "Expense Date",
      minWidth: 200,
      align: "left",
      flex: 1,
      valueFormatter: (value) => {
        const expenseDateObject = dayjs(value, "YYYY/MM/DD H:mm:ss");
        dayjs.extend(isToday);
        let expenseDate;
        // if (dayjs(expenseDateObject).isToday()) {
        //   dayjs.extend(localizedFormat);
        //   expenseDate = dayjs(expenseDateObject).format("llll");
        //   return `${expenseDate} - today`;
        // }
        dayjs.extend(localizedFormat);
        expenseDate = dayjs(expenseDateObject).format("llll");
        return expenseDate;
      },
    },

    {
      field: "amount",
      headerName: "Amount",
      ...inrPrice,
      align: "right",
      minWidth: 100,
      flex: 1,
      valueGetter: (value, row) => {
        if (typeof row.id === "string" && row?.id?.includes("ROW_SUM")) {
          return row.total;
        }
        return row.amount;
      },
    },
    {
      field: "categoryResponseDto",
      headerName: "Category",
      minWidth: 100,
      align: "left",
      flex: 1,
      valueGetter: (value) => {
        if (value) {
          return `${value?.categoryName} ${value?.icon}`;
        }
      },
    },
    {
      field: "paymentTypeResponseDto",
      headerName: "Payment Type",
      maxWidth: 130,
      flex: 1,
      align: "left",
      valueGetter: (value) => {
        if (value) {
          return `${value?.paymentTypeName}`;
        }
      },
    },
    {
      field: "accountResponseDto",
      headerName: "Account",
      minWidth: 100,
      flex: 1,
      align: "left",
      valueGetter: (value) => {
        if (value) {
          return `${value?.accountName}`;
        }
      },
    },
    {
      field: "description",
      headerName: "Description",
      minWidth: 150,
      align: "left",
      flex: 1,
    },
    {
      field: "action",
      headerName: "Actions",
      minWidth: 210,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        if (
          typeof params?.row.id === "string" &&
          params?.row?.id?.includes("ROW_SUM")
        ) {
          return null;
        }
        return (
          <Box>
            <Button
              color="secondary"
              sx={{ mr: 1 }}
              onClick={() => {
                handleExpenseUpdate(params.row);
              }}
            >
              Update
            </Button>
            <Button
              color="error"
              sx={{ mr: 1 }}
              onClick={() => {
                handleExpenseDelete(params.row);
              }}
            >
              Delete
            </Button>
          </Box>
        );
      },
    },
  ];

  const handleExpenseUpdate = (rowData) => {
    setOpen(true);
    setRowData(rowData);
  };

  const handleExpenseDelete = (rowData) => {
    setRowData(rowData);
    setOpenDeleteDialogue(true);
  };

  const handleClose = () => {
    setOpen(false);
    setRowData(null);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleMonthChange = (value) => {
    const startDate = formatDate(dayjs(value).startOf("month"), "YYYY-MM-DD");
    const endDate = formatDate(dayjs(value).endOf("month"), "YYYY-MM-DD");
    getAllExpensesByDate(startDate, endDate);
  };

  const handleDeleteClose = (isDeleted, rowData, otherProps) => {
    setOpenDeleteDialogue(false);
    setRowData(null);
    if (isDeleted && rowData) {
      const { expenseYearMonth } = otherProps;
      deleteExpenseById(rowData?.id)
        .then((res) => {
          const startDate = formatDate(
            dayjs(expenseYearMonth?.value).startOf("month"),
            "YYYY-MM-DD"
          );
          const endDate = formatDate(
            dayjs(expenseYearMonth?.value).endOf("month"),
            "YYYY-MM-DD"
          );
          getAllExpensesByDate(startDate, endDate);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const onSubmit = (values, onSubmitProps) => {
    console.log(values);
  };

  const getCellClassName = ({ row, field }) => {
    if (row.label === "Total") {
      return "bold";
    }
    return "";
  };

  return (
    <Box>
      <Formik
        initialValues={EXPENSE_PAGE_INITIAL_VALUES}
        validationSchema={EXPENSE_PAGE_VALIDATION}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form>
            <Container maxWidth="xl" sx={{ textAlign: "center" }}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 2 }}>
                  <DateTimePickerWrapper
                    views={["month", "year"]}
                    name="expenseYearMonth"
                    label="Expense Month"
                    size="small"
                    handleMonthChange={handleMonthChange}
                  />
                </Grid>

                <Grid size={{ xs: 0.5 }}>
                  <Tooltip title="Add Expense">
                    <IconButton
                      color="secondary"
                      aria-label="add an alarm"
                      size="small"
                      onClick={handleClickOpen}
                    >
                      <AddCircleTwoToneIcon sx={{ fontSize: 30 }} />
                    </IconButton>
                  </Tooltip>
                </Grid>
                <Grid>
                  <Paper sx={{ background: "white", px: 1, py: 0.5 }}>
                    <Typography variant="h5">
                      <span style={{ color: "orangered", fontWeight: "bold" }}>
                        Total :
                      </span>{" "}
                      {currencyFormatter.format(totalAmount)}
                    </Typography>
                  </Paper>
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <Box
                    sx={{
                      width: "90%",
                      "& .bold": {
                        fontWeight: 600,
                        fontSize: 18,
                      },
                    }}
                  >
                    <Paper sx={{ mb: 2 }}>
                      {row?.length === 0 ? (
                        <NoRow isLoadingData={isLoadingExpenseData} />
                      ) : (
                        <DataGrid
                          rows={row}
                          columns={columns}
                          slots={{
                            toolbar: GridToolbar,
                          }}
                          disableColumnMenu
                          checkboxSelection
                          disableRowSelectionOnClick
                          getCellClassName={getCellClassName}
                          initialState={{
                            pagination: { paginationModel: { pageSize: 10 } },
                          }}
                          pageSizeOptions={[
                            10,
                            15,
                            20,
                            { value: -1, label: "All" },
                          ]}
                          sx={{
                            "& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-cell:focus":
                              {
                                outline: "none !important",
                              },
                            "& .MuiDataGrid-columnHeader:focus-within, & .MuiDataGrid-columnHeader:focus":
                              {
                                outline: "none !important",
                              },
                            "& .MuiDataGrid-cell:hover": {
                              color: "primary.main",
                            },
                          }}
                        />
                      )}
                    </Paper>
                  </Box>
                </Grid>
                <Expense
                  open={open}
                  handleClose={handleClose}
                  rowData={rowData}
                  expenseYearMonth={formik.getFieldProps("expenseYearMonth")}
                  getAllExpensesByDate={getAllExpensesByDate}
                  handleDeleteClose={handleDeleteClose}
                />
                <DeleteDialogue
                  open={openDeleteDialogue}
                  rowData={rowData}
                  expenseYearMonth={formik.getFieldProps("expenseYearMonth")}
                  handleDeleteClose={handleDeleteClose}
                />
              </Grid>
            </Container>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default ExpensePage;
