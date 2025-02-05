import Grid from "@mui/material/Grid2";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import HandleJwtError from "../../../validations/HandleJwtError";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import Button from "../../../components/formsUI/Button";
import DeleteDialogue from "../../../components/dialogue/DeleteDialogue";
import {
  deleteCategoryById,
  fetchAllCategoryByType,
} from "../../../services/CategoryService";
import Category from "./Category";
import { addListOfCategory } from "../../../reducers/categorySlice";
import NoRow from "../../../components/commons/NoRow";

const CategoryPage = () => {
  const [categoryType, setCategoryType] = useState("EXPENSE");
  const [open, setOpen] = useState(false);
  const [openDeleteDialogue, setOpenDeleteDialogue] = useState(false);
  const [rowData, setRowData] = useState(null);
  const [isLoadingCategoryData, setIsLoadingCategoryData] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categories = useSelector((store) => store.category.categoryList);

  useEffect(() => {
    getAllCategoryByType(categoryType);
  }, []);

  const getAllCategoryByType = (categoryType) => {
    setIsLoadingCategoryData(true);
    fetchAllCategoryByType(categoryType)
      .then((res) => {
        if (res?.data[0]?.id) {
          dispatch(addListOfCategory(res.data));
        } else {
          dispatch(addListOfCategory([]));
        }
      })
      .catch((error) => {
        HandleJwtError(error.response.data.errorCode, navigate, dispatch);
      })
      .finally(() => {
        setIsLoadingCategoryData(false);
      });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setRowData(null);
  };

  const handleDeleteClose = (isDeleted) => {
    setOpenDeleteDialogue(false);
    setRowData(null);
    if (isDeleted && rowData) {
      deleteCategoryById(rowData?.id)
        .then((res) => {
          getAllCategoryByType(categoryType);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleCategoryUpdate = (rowData) => {
    setOpen(true);
    setRowData(rowData);
  };

  const handleCategoryDelete = (rowData) => {
    setRowData(rowData);
    setOpenDeleteDialogue(true);
  };

  const handleCategoryTypeChange = (event) => {
    const type = event.target.value;
    getAllCategoryByType(type);
    setCategoryType(type);
  };

  const columns = [
    {
      field: "categoryName",
      headerName: "Category Name",
      minWidth: 150,
      align: "left",
      flex: 1,
    },
    {
      field: "icon",
      headerName: "Icon",
      minWidth: 100,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "description",
      headerName: "Description",
      minWidth: 300,
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
                handleCategoryUpdate(params.row);
              }}
              size="small"
            >
              Update
            </Button>
            <Button
              sx={{ marginLeft: 1 }}
              color="error"
              onClick={() => {
                handleCategoryDelete(params.row);
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
      <Grid size={{ xs: 12 }}>
        <FormControl>
          <FormLabel id="row-radio-buttons-group-label">
            <Typography variant="h6" color="info">
              Category Type
            </Typography>
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={categoryType}
            onChange={handleCategoryTypeChange}
          >
            <FormControlLabel
              value="EXPENSE"
              control={<Radio />}
              label="Expense"
            />
            <FormControlLabel
              value="INCOME"
              control={<Radio />}
              label="Income"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid size={{ xs: 2 }}>
        <Button
          startIcon={<AddIcon />}
          aria-label="add category"
          size="small"
          onClick={handleClickOpen}
        >
          Add Category
        </Button>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <Box sx={{ width: "100%" }}>
          <Paper sx={{ width: "60%", mb: 2 }}>
            {categories?.length === 0 ? (
              <NoRow isLoadingData={isLoadingCategoryData} />
            ) : (
              <DataGrid
                rows={categories}
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
      <Category
        open={open}
        rowData={rowData}
        handleClose={handleClose}
        getAllCategoryByType={getAllCategoryByType}
        categoryType={categoryType}
      />
      <DeleteDialogue
        open={openDeleteDialogue}
        rowData={rowData}
        handleDeleteClose={handleDeleteClose}
      />
    </Grid>
  );
};

export default CategoryPage;
