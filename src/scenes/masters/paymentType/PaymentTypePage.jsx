import Grid from "@mui/material/Grid2";
import { Box, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import HandleJwtError from "../../../validations/HandleJwtError";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import Button from "../../../components/formsUI/Button";
import DeleteDialogue from "../../../components/dialogue/DeleteDialogue";
import PaymentType from "./PaymentType";
import { addListOfPaymentType } from "../../../reducers/patmentTypeSlice";
import {
  deletePaymentTypeById,
  fetchAllPaymentType,
} from "../../../services/PaymentTypeService";
import NoRow from "../../../components/commons/NoRow";

const PaymentTypePage = () => {
  const [open, setOpen] = useState(false);
  const [openDeleteDialogue, setOpenDeleteDialogue] = useState(false);
  const [rowData, setRowData] = useState(null);
  const [isLoadingPaymentData, setIsLoadingPaymentData] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const paymentTypes = useSelector(
    (store) => store.paymentType.paymentTypeList
  );

  useEffect(() => {
    getAllPaymentType();
  }, []);

  const getAllPaymentType = () => {
    setIsLoadingPaymentData(true);
    fetchAllPaymentType()
      .then((res) => {
        if (res?.data[0]?.id) {
          dispatch(addListOfPaymentType(res.data));
        } else {
          dispatch(addListOfPaymentType([]));
        }
      })
      .catch((error) => {
        HandleJwtError(error.response.data.errorCode, navigate, dispatch);
      })
      .finally(() => {
        setIsLoadingPaymentData(false);
      });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setRowData(null);
  };

  const handleDeleteClose = (isDeleted, rowData) => {
    setOpenDeleteDialogue(false);
    setRowData(null);
    if (isDeleted && rowData) {
      deletePaymentTypeById(rowData?.id)
        .then((res) => {
          getAllPaymentType();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleAccountUpdate = (rowData) => {
    setOpen(true);
    setRowData(rowData);
  };

  const handleAccountDelete = (rowData) => {
    setRowData(rowData);
    setOpenDeleteDialogue(true);
  };

  const columns = [
    {
      field: "paymentTypeName",
      headerName: "Account Name",
      minWidth: 150,
      align: "left",
      flex: 1,
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
        return (
          <Box>
            <Button
              color="secondary"
              onClick={() => {
                handleAccountUpdate(params.row);
              }}
              size="small"
            >
              Update
            </Button>
            <Button
              sx={{ marginLeft: 1 }}
              color="error"
              onClick={() => {
                handleAccountDelete(params.row);
              }}
              size="small"
            >
              Delete
            </Button>
          </Box>
        );
      },
    },
  ];

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 2 }}>
        <Button
          startIcon={<AddIcon />}
          aria-label="add paymentType"
          size="small"
          onClick={handleClickOpen}
        >
          Add Payment Type
        </Button>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <Box sx={{ width: "100%" }}>
          <Paper sx={{ width: "50%", mb: 2 }}>
            {paymentTypes?.length === 0 ? (
              <NoRow isLoadingData={isLoadingPaymentData} />
            ) : (
              <DataGrid
                rows={paymentTypes}
                columns={columns}
                slots={{ toolbar: GridToolbar }}
                disableColumnMenu
                checkboxSelection
                disableRowSelectionOnClick
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
                initialState={{
                  pagination: { paginationModel: { pageSize: 5 } },
                }}
                pageSizeOptions={[5, 10, 15, { value: -1, label: "All" }]}
              />
            )}
          </Paper>
        </Box>
      </Grid>
      <PaymentType
        open={open}
        rowData={rowData}
        handleClose={handleClose}
        getAllPaymentType={getAllPaymentType}
      />
      <DeleteDialogue
        open={openDeleteDialogue}
        rowData={rowData}
        handleDeleteClose={handleDeleteClose}
      />
    </Grid>
  );
};

export default PaymentTypePage;
