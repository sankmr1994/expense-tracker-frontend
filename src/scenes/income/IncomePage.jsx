import {
  deleteIncomeById,
  fetchIncomeByDate,
} from "../../services/IncomeService";
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
import Income from "./Income";
import { useEffect, useState } from "react";
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { addIncomeDetails } from "../../reducers/incomeSlice";
import { currencyFormatter, inrPrice } from "../../utils/currencyUtils";
import Button from "../../components/formsUI/Button";
import { fetchAllAccountIdAndName } from "../../services/AccountsService";
import { addListOfAccountIdAndName } from "../../reducers/accountSlice";
import { fetchAllCategoryIdAndName } from "../../services/CategoryService";
import { addListOfCategoryIdAndName } from "../../reducers/categorySlice";
import { fetchAllPaymentTypeIdAndName } from "../../services/PaymentTypeService";
import { addListOfPaymentTypeIdAndName } from "../../reducers/patmentTypeSlice";
import DeleteDialogue from "../../components/dialogue/DeleteDialogue";
import { INCOME_PAGE_VALIDATION } from "../../schemas/incomePageSchema";
import { formatDate } from "../../utils/DateUtils";
import localizedFormat from "dayjs/plugin/localizedFormat";
import isToday from "dayjs/plugin/isToday";
import NoRow from "../../components/commons/NoRow";

const IncomePage = () => {
  const [open, setOpen] = useState(false);
  const [openDeleteDialogue, setOpenDeleteDialogue] = useState(false);
  const [rowData, setRowData] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const incomes = useSelector((store) => store.income.incomeDetailsResponse);
  const { incomeList, totalAmount } = incomes;
  let row = [];

  if (incomeList.length > 0) {
    let rowWiseSumIndex = "ROW_SUM";
    let index = 0;
    row = incomeList.map((income) => {
      if (income?.rowWiseTotal != null) {
        let id = rowWiseSumIndex + "-" + index;
        const copyIncome = {
          id: id,
          label: "Total",
          total: income.rowWiseTotal,
        };
        index++;
        return copyIncome;
      }
      return income;
    });
  }

  const INCOME_PAGE_INITIAL_VALUES = {
    incomeYearMonth: dayjs(Date.now()),
  };

  useEffect(() => {
    const startDate = formatDate(dayjs().startOf("month"), "YYYY-MM-DD");
    const endDate = formatDate(dayjs().endOf("month"), "YYYY-MM-DD");
    getAllIncomesByDate(startDate, endDate);
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

  const getAllIncomesByDate = (startDate, endDate) => {
    fetchIncomeByDate(startDate, endDate)
      .then((res) => {
        if (res?.data?.incomeList[0]?.id) {
          dispatch(addIncomeDetails(res.data));
        } else {
          dispatch(addIncomeDetails({ incomeList: [], totalAmount: 0 }));
        }
      })
      .catch((error) => {
        HandleJwtError(error.response.data.errorCode, navigate, dispatch);
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
    fetchAllCategoryIdAndName("INCOME")
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
      field: "incomeName",
      headerName: "Income Name",
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
      field: "incomeDate",
      headerName: "Income Date",
      minWidth: 200,
      align: "left",
      flex: 1,
      valueFormatter: (value) => {
        const incomeDateObject = dayjs(value, "YYYY/MM/DD H:mm:ss");
        dayjs.extend(isToday);
        let incomeDate;
        // if (dayjs(incomeDateObject).isToday()) {
        //   dayjs.extend(localizedFormat);
        //   incomeDate = dayjs(incomeDateObject).format("llll");
        //   return `${incomeDate} - today`;
        // }
        dayjs.extend(localizedFormat);
        incomeDate = dayjs(incomeDateObject).format("llll");
        return incomeDate;
      },
    },

    {
      field: "amount",
      headerName: "Amount",
      ...inrPrice,
      minWidth: 200,
      align: "right",
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
      align: "left",
      flex: 1,
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
      align: "left",
      flex: 1,
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
      minWidth: 200,
      headerAlign: "center",
      align: "center",
      flex: 1,
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
              onClick={() => {
                handleIncomeUpdate(params.row);
              }}
            >
              Update
            </Button>
            <Button
              sx={{ marginLeft: 1 }}
              color="error"
              onClick={() => {
                handleIncomeDelete(params.row);
              }}
            >
              Delete
            </Button>
          </Box>
        );
      },
    },
  ];

  const handleIncomeUpdate = (rowData) => {
    setOpen(true);
    setRowData(rowData);
  };

  const handleIncomeDelete = (rowData) => {
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
    getAllIncomesByDate(startDate, endDate);
  };

  const handleDeleteClose = (isDeleted, rowData, otherProps) => {
    const { incomeYearMonth } = otherProps;
    setOpenDeleteDialogue(false);
    setRowData(null);
    if (isDeleted && rowData) {
      deleteIncomeById(rowData?.id)
        .then((res) => {
          const startDate = formatDate(
            dayjs(incomeYearMonth?.value).startOf("month"),
            "YYYY-MM-DD"
          );
          const endDate = formatDate(
            dayjs(incomeYearMonth?.value).endOf("month"),
            "YYYY-MM-DD"
          );
          getAllIncomesByDate(startDate, endDate);
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
        initialValues={INCOME_PAGE_INITIAL_VALUES}
        validationSchema={INCOME_PAGE_VALIDATION}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form>
            <Container maxWidth="xl" sx={{ textAlign: "center" }}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 2 }}>
                  <DateTimePickerWrapper
                    views={["month", "year"]}
                    name="incomeYearMonth"
                    label="Income Month"
                    size="small"
                    handleMonthChange={handleMonthChange}
                  />
                </Grid>
                <Grid size={{ xs: 0.5 }}>
                  <Tooltip title="Add Income">
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
                      {incomes?.length === 0 ? (
                        <NoRow />
                      ) : (
                        <DataGrid
                          rows={row}
                          columns={columns}
                          slots={{ toolbar: GridToolbar }}
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
                <Income
                  open={open}
                  handleClose={handleClose}
                  rowData={rowData}
                  incomeYearMonth={formik.getFieldProps("incomeYearMonth")}
                  getAllIncomesByDate={getAllIncomesByDate}
                  handleDeleteClose={handleDeleteClose}
                />
                <DeleteDialogue
                  open={openDeleteDialogue}
                  rowData={rowData}
                  incomeYearMonth={formik.getFieldProps("incomeYearMonth")}
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

export default IncomePage;
