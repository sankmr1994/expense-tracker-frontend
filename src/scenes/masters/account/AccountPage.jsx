import Grid from "@mui/material/Grid2";
import { Box, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import {
  deleteAccountById,
  fetchAllAccount,
} from "../../../services/AccountsService";
import HandleJwtError from "../../../validations/HandleJwtError";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addListOfAccount } from "../../../reducers/accountSlice";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import Button from "../../../components/formsUI/Button";
import Account from "./Account";
import DeleteDialogue from "../../../components/dialogue/DeleteDialogue";
import { inrPrice } from "../../../utils/currencyUtils";
import NoRow from "../../../components/commons/NoRow";

const AccountPage = () => {
  const [open, setOpen] = useState(false);
  const [openDeleteDialogue, setOpenDeleteDialogue] = useState(false);
  const [rowData, setRowData] = useState(null);
  const [isLoadingAccountData, setIsLoadingAccountData] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accounts = useSelector((store) => store.account.accountList);

  useEffect(() => {
    getAllAccount();
  }, []);

  const getAllAccount = () => {
    setIsLoadingAccountData(true);
    fetchAllAccount()
      .then((res) => {
        if (res?.data[0]?.id) {
          dispatch(addListOfAccount(res.data));
        } else {
          dispatch(addListOfAccount([]));
        }
      })
      .catch((error) => {
        HandleJwtError(error.response.data.errorCode, navigate, dispatch);
      })
      .finally(() => {
        setIsLoadingAccountData(false);
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
      deleteAccountById(rowData?.id)
        .then((res) => {
          getAllAccount();
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
      field: "accountName",
      headerName: "Account Name",
      minWidth: 150,
      align: "left",
      flex: 1,
    },
    {
      field: "amount",
      headerName: "Amount",
      minWidth: 100,
      ...inrPrice,
      align: "right",
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
          aria-label="add Account"
          size="small"
          onClick={handleClickOpen}
        >
          Add Account
        </Button>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <Box sx={{ width: "100%" }}>
          <Paper sx={{ width: "70%", mb: 2 }}>
            {accounts.length === 0 ? (
              <NoRow isLoadingData={isLoadingAccountData} />
            ) : (
              <DataGrid
                rows={accounts}
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
      <Account
        open={open}
        rowData={rowData}
        handleClose={handleClose}
        getAllAccount={getAllAccount}
      />
      <DeleteDialogue
        open={openDeleteDialogue}
        rowData={rowData}
        handleDeleteClose={handleDeleteClose}
      />
    </Grid>
  );
};

export default AccountPage;
