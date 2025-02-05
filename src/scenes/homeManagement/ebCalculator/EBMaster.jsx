import {
  Box,
  Card,
  CardActions,
  CardContent,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Formik, Form } from "formik";
import TextField from "../../../components/formsUI/TextField";
import Button from "../../../components/formsUI/Button";
import { EB_BUILDING_FORM_VALIDATION } from "../../../schemas/enMasterSchema";
import { fetchEBDetails, saveEBDetails } from "../../../services/EBService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import HandleJwtError from "../../../validations/HandleJwtError";
import React, { useEffect, useState } from "react";

const EBMaster = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [ebDetails, setEbDetails] = useState(null);

  const INITIAL_BUILDING_FORM_VALUES = {
    downHomeBill: "",
    upHomeBill: "",

    downHomeTotalUnit: "",
    upHomeTotalUnit: "",

    upHome2PreviousUnit: "",
    motorPreviousUnit: "",

    upHome2CurrentUnit: "",
    motorCurrentUnit: "",

    shopBill: "",
    shopTotalUnit: "",
    shop3PreviousUnit: "",
    shop3CurrentUnit: "",

    downHomeTotalNoPeople: "",
    upHome1TotalNoPeople: "",
    upHome2TotalNoPeople: "",
    topRoomTotalNoPeople: "",
  };

  useEffect(() => {
    getEBDetails();
  }, []);

  const getEBDetails = () => {
    fetchEBDetails()
      .then((res) => {
        setEbDetails(res?.data);
        console.log(res?.data);
      })
      .catch((error) => {
        console.log(error);
        HandleJwtError(error?.response?.data?.errorCode, navigate, dispatch);
      });
  };

  const onSubmit = (values, onSubmitProps) => {
    saveEBDetails(values)
      .then((res) => {
        console.log(res);
        onSubmitProps.resetForm();
        onSubmitProps.setSubmitting(false);
      })
      .catch((error) => {
        console.log(error);
        HandleJwtError(error.response.data.errorCode, navigate, dispatch);
        onSubmitProps.setSubmitting(false);
      });
  };

  return (
    <Box>
      <Paper sx={{ padding: 2 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Formik
            initialValues={INITIAL_BUILDING_FORM_VALUES}
            validationSchema={EB_BUILDING_FORM_VALIDATION}
            onSubmit={onSubmit}
          >
            {(formik) => (
              <Form>
                <Grid container>
                  <Grid size={{ xs: 3.5 }}>
                    <Typography
                      textAlign="center"
                      color="secondary"
                      variant="h4"
                      fontWeight="bold"
                    >
                      HOME
                    </Typography>
                    <Grid container spacing={0.5}>
                      {/* Current Bills */}
                      <Grid size={{ xs: 12 }} m={1}>
                        <Typography color="info" variant="h5">
                          Current Bills
                        </Typography>
                      </Grid>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                          name="downHomeBill"
                          size="small"
                          label="DownHome Bill"
                          fullWidth={true}
                          type="number"
                        />
                      </Grid>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                          name="upHomeBill"
                          size="small"
                          label="UpHome Bill"
                          fullWidth={true}
                          type="number"
                        />
                      </Grid>

                      {/* Total units */}
                      <Grid size={{ xs: 12 }} m={1}>
                        <Typography color="info" variant="h5">
                          Total units
                        </Typography>
                      </Grid>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                          name="downHomeTotalUnit"
                          size="small"
                          label="DownHome unit"
                          fullWidth={true}
                          type="number"
                        />
                      </Grid>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                          name="upHomeTotalUnit"
                          size="small"
                          label="UpHome unit"
                          fullWidth={true}
                          type="number"
                        />
                      </Grid>

                      {/* Uphome2 Submeter unit*/}
                      <Grid size={{ xs: 12 }} m={1}>
                        <Typography color="info" variant="h5">
                          UpHome2 Sub-Meter unit
                        </Typography>
                      </Grid>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                          name="upHome2PreviousUnit"
                          size="small"
                          label="UpHome2 Previous Unit"
                          fullWidth={true}
                          type="number"
                        />
                      </Grid>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                          name="upHome2CurrentUnit"
                          size="small"
                          label="UpHome2 Current Unit"
                          fullWidth={true}
                          type="number"
                        />
                      </Grid>

                      {/* Motor Submeter unit*/}
                      <Grid size={{ xs: 12 }} m={1}>
                        <Typography color="info" variant="h5">
                          Motor Sub-Meter unit
                        </Typography>
                      </Grid>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                          name="motorPreviousUnit"
                          size="small"
                          label="Motor Previous Unit"
                          fullWidth={true}
                          type="number"
                        />
                      </Grid>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                          name="motorCurrentUnit"
                          size="small"
                          label="Motor Current Unit"
                          fullWidth={true}
                          type="number"
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Divider orientation="vertical" flexItem sx={{ margin: 2 }} />
                  <Grid size={{ xs: 3.5 }}>
                    <Typography
                      textAlign="center"
                      color="secondary"
                      variant="h4"
                      fontWeight="bold"
                    >
                      SHOP
                    </Typography>
                    <Grid container spacing={0.5}>
                      {/* Current Bills */}
                      <Grid size={{ xs: 12 }} m={1}>
                        <Typography color="info" variant="h5">
                          Current Bills
                        </Typography>
                      </Grid>
                      <Grid size={{ xs: 12 }}>
                        <TextField
                          name="shopBill"
                          size="small"
                          label="Shop Bill"
                          fullWidth={true}
                          type="number"
                        />
                      </Grid>

                      {/* Total units */}
                      <Grid size={{ xs: 12 }} m={1}>
                        <Typography color="info" variant="h5">
                          Total units
                        </Typography>
                      </Grid>
                      <Grid size={{ xs: 12 }}>
                        <TextField
                          name="shopTotalUnit"
                          size="small"
                          label="Shop unit"
                          fullWidth={true}
                          type="number"
                        />
                      </Grid>

                      {/* shop3 Submeter unit*/}
                      <Grid size={{ xs: 12 }} m={1}>
                        <Typography color="info" variant="h5">
                          Shop3 Sub-Meter unit
                        </Typography>
                      </Grid>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                          name="shop3PreviousUnit"
                          size="small"
                          label="Shop3 Previous Unit"
                          fullWidth={true}
                          type="number"
                        />
                      </Grid>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                          name="shop3CurrentUnit"
                          size="small"
                          label="Shop3 Current Unit"
                          fullWidth={true}
                          type="number"
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Divider orientation="vertical" flexItem sx={{ margin: 2 }} />
                  <Grid size={{ xs: 3.5 }}>
                    <Typography
                      textAlign="center"
                      color="secondary"
                      variant="h4"
                      fontWeight="bold"
                    >
                      MEMBERS COUNT
                    </Typography>
                    <Grid container spacing={0.5}>
                      {/* DownHome Member Count */}
                      <Grid size={{ xs: 12 }} m={1}>
                        <Typography color="info" variant="h5">
                          DownHome
                        </Typography>
                      </Grid>
                      <Grid size={{ xs: 12 }}>
                        <TextField
                          name="downHomeTotalNoPeople"
                          size="small"
                          label="DownHome Total No People"
                          fullWidth={true}
                          type="number"
                        />
                      </Grid>

                      {/* UpHome Member Count */}
                      <Grid size={{ xs: 12 }} m={1}>
                        <Typography color="info" variant="h5">
                          UpHome
                        </Typography>
                      </Grid>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                          name="upHome1TotalNoPeople"
                          size="small"
                          label="UpHome1 Total No People"
                          fullWidth={true}
                          type="number"
                        />
                      </Grid>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                          name="upHome2TotalNoPeople"
                          size="small"
                          label="UpHome2 Total No People"
                          fullWidth={true}
                          type="number"
                        />
                      </Grid>

                      {/* Top room Member Count */}
                      <Grid size={{ xs: 12 }} m={1}>
                        <Typography color="info" variant="h5">
                          Top Room
                        </Typography>
                      </Grid>
                      <Grid size={{ xs: 12 }}>
                        <TextField
                          name="topRoomTotalNoPeople"
                          size="small"
                          label="TopRoom Total No People"
                          fullWidth={true}
                          type="number"
                        />
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid size={{ xs: 12 }} m={2}>
                    <Box textAlign="center">
                      <Divider sx={{ margin: 2 }} />
                      <Button
                        disabled={!formik.isValid || formik.isSubmitting}
                        onClick={(e) => {
                          formik.submitForm();
                        }}
                        color="success"
                      >
                        Save
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
        {ebDetails && (
          <Box sx={{ flexGrow: 1 }}>
            <Grid container>
              <Grid size={{ xs: 3.5 }}>
                <Card variant="outlined">
                  <React.Fragment>
                    <CardContent>
                      <Typography variant="h5" sx={{ mb: 1 }}>
                        Home EB Details
                      </Typography>
                      <Typography
                        sx={{ color: "text.secondary", fontSize: 14, mt: 1 }}
                      >
                        {`Down Home Bill : `}
                        <span style={{ fontWeight: "bold" }}>
                          {`${ebDetails.downHomeBill}, `}
                        </span>
                        {`Up Home Bill : `}
                        <span style={{ fontWeight: "bold" }}>
                          {ebDetails.upHomeBill}
                        </span>
                      </Typography>
                      <Typography
                        sx={{ color: "text.secondary", fontSize: 14, mt: 1 }}
                      >
                        {`Down Home Unit : `}
                        <span style={{ fontWeight: "bold" }}>
                          {`${ebDetails.downHomeTotalUnit}, `}
                        </span>
                        {`Up Home Unit : `}
                        <span style={{ fontWeight: "bold" }}>
                          {ebDetails.upHomeTotalUnit}
                        </span>
                      </Typography>

                      <Typography
                        sx={{ color: "text.secondary", fontSize: 14, mt: 1 }}
                      >
                        {`Up Home2 Previous Unit : `}
                        <span style={{ fontWeight: "bold" }}>
                          {`${ebDetails.upHome2PreviousUnit}, `}
                        </span>
                        {`Up Home2 Current Unit : `}
                        <span style={{ fontWeight: "bold" }}>
                          {ebDetails.upHome2CurrentUnit}
                        </span>
                      </Typography>
                      <Typography
                        sx={{ color: "text.secondary", fontSize: 14, mt: 1 }}
                      >
                        {`Motor Previous Unit : `}
                        <span style={{ fontWeight: "bold" }}>
                          {`${ebDetails.motorPreviousUnit}, `}
                        </span>
                        {`Motor Current Unit : `}
                        <span style={{ fontWeight: "bold" }}>
                          {ebDetails.motorCurrentUnit}
                        </span>
                      </Typography>
                    </CardContent>
                  </React.Fragment>
                </Card>
              </Grid>
              <Divider orientation="vertical" flexItem sx={{ margin: 2 }} />
              <Grid size={{ xs: 3.5 }}>
                <Card variant="outlined">
                  <React.Fragment>
                    <CardContent>
                      <Typography variant="h5" sx={{ mb: 1 }}>
                        Shop EB Details
                      </Typography>
                      <Typography
                        sx={{ color: "text.secondary", fontSize: 14, mt: 1 }}
                      >
                        {`Shop Bill : `}
                        <span style={{ fontWeight: "bold" }}>
                          {`${ebDetails.shopBill}`}
                        </span>
                      </Typography>
                      <Typography
                        sx={{ color: "text.secondary", fontSize: 14, mt: 1 }}
                      >
                        {`Shop Unit : `}
                        <span style={{ fontWeight: "bold" }}>
                          {`${ebDetails.shopTotalUnit}`}
                        </span>
                      </Typography>

                      <Typography
                        sx={{ color: "text.secondary", fontSize: 14, mt: 1 }}
                      >
                        {`Shop3 Previous Unit : `}
                        <span style={{ fontWeight: "bold" }}>
                          {`${ebDetails.shop3PreviousUnit}, `}
                        </span>
                        {`Shop3 Current Unit : `}
                        <span style={{ fontWeight: "bold" }}>
                          {ebDetails.shop3CurrentUnit || "_"}
                        </span>
                      </Typography>
                    </CardContent>
                  </React.Fragment>
                </Card>
              </Grid>
              <Divider orientation="vertical" flexItem sx={{ margin: 2 }} />
              <Grid size={{ xs: 3.5 }}>
                <Card variant="outlined">
                  <React.Fragment>
                    <CardContent>
                      <Typography variant="h5" sx={{ mb: 1 }}>
                        Members Count
                      </Typography>
                      <Typography
                        sx={{ color: "text.secondary", fontSize: 14, mt: 1 }}
                      >
                        {`Down Home : `}
                        <span style={{ fontWeight: "bold" }}>
                          {`${ebDetails.downHomeTotalNoPeople}`}
                        </span>
                      </Typography>
                      <Typography
                        sx={{ color: "text.secondary", fontSize: 14, mt: 1 }}
                      >
                        {`Up Home1 : `}
                        <span style={{ fontWeight: "bold" }}>
                          {`${ebDetails.upHome1TotalNoPeople}`}
                        </span>
                      </Typography>

                      <Typography
                        sx={{ color: "text.secondary", fontSize: 14, mt: 1 }}
                      >
                        {`Up Home1 : `}
                        <span style={{ fontWeight: "bold" }}>
                          {`${ebDetails.upHome2TotalNoPeople}`}
                        </span>
                      </Typography>
                      <Typography
                        sx={{ color: "text.secondary", fontSize: 14, mt: 1 }}
                      >
                        {`Top Room  : `}
                        <span style={{ fontWeight: "bold" }}>
                          {`${ebDetails.topRoomTotalNoPeople}`}
                        </span>
                      </Typography>
                    </CardContent>
                  </React.Fragment>
                </Card>
              </Grid>
            </Grid>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default EBMaster;
