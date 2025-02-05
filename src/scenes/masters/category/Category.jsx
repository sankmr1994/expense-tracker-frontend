import { Box, Dialog, DialogContent, DialogTitle, Slide } from "@mui/material";

import Grid from "@mui/material/Grid2";
import { Form, Formik } from "formik";
import TextField from "../../../components/formsUI/TextField";
import Button from "../../../components/formsUI/Button";
import HandleJwtError from "../../../validations/HandleJwtError";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CATEGORY_VALIDATION } from "../../../schemas/categorySchema";
import {
  createCategory,
  updateCategory,
} from "../../../services/CategoryService";
import React from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Category = ({
  getAllCategoryByType,
  open,
  handleClose,
  rowData,
  categoryType,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const CATEGORY_INITIAL_VALUES = {
    categoryName: "",
    description: "",
    icon: "",
  };
  if (rowData) {
    const { categoryName, description, icon } = rowData;
    CATEGORY_INITIAL_VALUES.categoryName = categoryName;
    CATEGORY_INITIAL_VALUES.description = description;
    CATEGORY_INITIAL_VALUES.icon = icon;
  }

  const onSubmit = (values, onSubmitProps) => {
    const categoryObj = {
      categoryName: values.categoryName,
      description: values.description,
      categoryType: categoryType,
      icon: values.icon,
    };

    if (rowData) {
      updateCategory(rowData.id, categoryObj)
        .then((res) => {
          handleClose();
          getAllCategoryByType(categoryType);
        })
        .catch((error) => {
          console.error(error.response.data);
          HandleJwtError(error.response.data.errorCode, navigate, dispatch);
        });
    } else {
      createCategory(categoryObj)
        .then((res) => {
          onSubmitProps.resetForm();
          onSubmitProps.setSubmitting(false);
          getAllCategoryByType(categoryType);
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
        <DialogTitle>Add Category</DialogTitle>
        <DialogContent>
          <Box mt={2}>
            <Formik
              initialValues={CATEGORY_INITIAL_VALUES}
              validationSchema={CATEGORY_VALIDATION}
              onSubmit={onSubmit}
            >
              {(formik) => (
                <Form>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        name="categoryName"
                        label="Category Name"
                        fullWidth={true}
                        size="small"
                        autoFocus
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <TextField label="Icon" name="icon" fullWidth={true} />
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

export default Category;
