import { Box, Divider, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Formik, Form } from "formik";
import TextField from "../../../components/formsUI/TextField";
import Button from "../../../components/formsUI/Button";
import {
  EB_BILL_FORM_VALIDATION,
  EB_UNIT_FORM_VALIDATION,
} from "../../../schemas/ebSchema";
import { useEffect, useRef, useState } from "react";
import { fetchEBDetails } from "../../../services/EBService";
import HandleJwtError from "../../../validations/HandleJwtError";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const EBCalculator = () => {
  const [ebDetails, setEbDetails] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formRef = useRef();

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

  let INITIAL_EB_UNIT_FORM_VALUES = {
    downHomeCurrentTotalUnits: ebDetails?.downHomeTotalUnit || "",
    upHomeCurrentTotalUnits: ebDetails?.upHomeTotalUnit || "",
    shopCurrentTotalUnits: ebDetails?.shopTotalUnit || "",
    upHome2PreviousSubMtrReading: ebDetails?.upHome2PreviousUnit || "",
    upHome2CurrentSubMtrReading: ebDetails?.upHome2CurrentUnit || "",
    upHome2TotalSubMtrUnit: "",
    motorPreviousSubMtrReading: ebDetails?.motorPreviousUnit || "",
    motorCurrentSubMtrReading: ebDetails?.motorCurrentUnit || "",
    motorTotalSubMtrUnit: "",
    shop3PreviousSubMtrReading: ebDetails?.shop3PreviousUnit || "",
    shop3CurrentSubMtrReading: ebDetails?.shop3CurrentUnit || "",
    shop3TotalSubMtrUnit: "",
    upHome1TotalUnit: "",
    upHome2TotalUnit: "",
    motorTotalUnit: "",
    shop1TotalUnit: "",
    shop2TotalUnit: "",
    shop3TotalUnit: "",
    upHomeAmtPerUnit: "",
  };

  const onSubmitUnits = (values, onSubmitProps, unitFormik) => {
    // Home2 Submeter Reading
    const home2Reading =
      values.upHome2CurrentSubMtrReading - values.upHome2PreviousSubMtrReading;
    onSubmitProps.setFieldValue("upHome2TotalSubMtrUnit", home2Reading, false);

    // Motor Submeter Reading
    const motorReading =
      values.motorCurrentSubMtrReading - values.motorPreviousSubMtrReading;
    onSubmitProps.setFieldValue("motorTotalSubMtrUnit", motorReading, false);

    // Shop Submeter Reading
    const shop3Reading =
      values.shop3CurrentSubMtrReading - values.shop3PreviousSubMtrReading;
    onSubmitProps.setFieldValue("shop3TotalSubMtrUnit", shop3Reading, false);

    //  Home1 Total unit
    const home1Reading =
      values.upHomeCurrentTotalUnits - (home2Reading + motorReading);
    onSubmitProps.setFieldValue("upHome1TotalUnit", home1Reading, false);

    //  Home2 Total unit
    onSubmitProps.setFieldValue("upHome2TotalUnit", home2Reading, false);

    //  motor Total unit
    onSubmitProps.setFieldValue("motorTotalUnit", motorReading, false);

    //  Shop1 Total unit
    onSubmitProps.setFieldValue(
      "shop1TotalUnit",
      values.shopCurrentTotalUnits - shop3Reading,
      true
    );

    //  Shop2 Total unit
    onSubmitProps.setFieldValue("shop2TotalUnit", 0, true);

    //  Shop3 Total unit
    onSubmitProps.setFieldValue("shop3TotalUnit", shop3Reading, true);
  };

  const INITIAL_EB_BILLS_FORM_VALUES = {
    downHomeBill: ebDetails?.downHomeBill || "",
    upHomeBill: ebDetails?.upHomeBill || "",
    shopBill: ebDetails?.shopBill || "",
    upHome1Bill: "",
    upHome2Bill: "",
    motorTotalBill: "",
    downHomeMotorBill: "",
    upHome1MotorBill: "",
    upHome2MotorBill: "",
    topRoomMotorBill: "",
    downHomeTotalBill: "",
    upHome1TotalBill: "",
    upHome2TotalBill: "",
    topRoomTotalBill: "",
    shop1TotalBill: "",
    shop2TotalBill: "",
    shop3TotalBill: "",
  };
  const onSubmitBills = (values, onSubmitProps) => {
    const {
      upHome1TotalUnit,
      upHome2TotalUnit,
      motorTotalUnit,
      shop1TotalUnit,
      shop3TotalUnit,
    } = formRef.current.values;

    const upHomeAmtPerUnit = ebDetails?.upHomeBill / ebDetails?.upHomeTotalUnit;

    // Uphome1 Bill
    const Uphome1Bill = (upHomeAmtPerUnit * upHome1TotalUnit).toFixed(1);
    onSubmitProps.setFieldValue("upHome1Bill", Uphome1Bill, false);

    // Uphome2 Bill
    const Uphome2Bill = (upHomeAmtPerUnit * upHome2TotalUnit).toFixed(1);
    onSubmitProps.setFieldValue("upHome2Bill", Uphome2Bill, false);

    // Motor Total Bill
    const motorTotalBillAmt = (upHomeAmtPerUnit * motorTotalUnit).toFixed(1);
    onSubmitProps.setFieldValue("motorTotalBill", motorTotalBillAmt, false);

    const totalMembers =
      ebDetails.downHomeTotalNoPeople +
      ebDetails.upHome1TotalNoPeople +
      ebDetails.upHome2TotalNoPeople +
      ebDetails.topRoomTotalNoPeople;

    const motorAmtPerMember = (motorTotalBillAmt / totalMembers).toFixed(1);

    // Motor Bill for DownHome
    const motorBillForDownHome = (
      motorAmtPerMember * ebDetails.downHomeTotalNoPeople
    ).toFixed(1);
    onSubmitProps.setFieldValue(
      "downHomeMotorBill",
      motorBillForDownHome,
      false
    );

    // Motor Bill for Home1
    const motorBillForUpHome1 = (
      motorAmtPerMember * ebDetails.upHome1TotalNoPeople
    ).toFixed(1);
    onSubmitProps.setFieldValue("upHome1MotorBill", motorBillForUpHome1, false);

    // Motor Bill for UpHome2
    const motorBillForUpHome2 = (
      motorAmtPerMember * ebDetails.upHome2TotalNoPeople
    ).toFixed(1);
    onSubmitProps.setFieldValue("upHome2MotorBill", motorBillForUpHome2, false);

    // Motor Bill for TopRoom
    const motorBillForTopRoom = (
      motorAmtPerMember * ebDetails.topRoomTotalNoPeople
    ).toFixed(1);
    onSubmitProps.setFieldValue("topRoomMotorBill", motorBillForTopRoom, false);

    // Total EB Bill for DownHome
    const totalEBBillForDownHome = (
      Number(motorBillForDownHome) + ebDetails.downHomeBill
    ).toFixed(2);
    onSubmitProps.setFieldValue(
      "downHomeTotalBill",
      totalEBBillForDownHome,
      false
    );

    // Total EB Bill for UpHome1
    const totalEBBillForUpHome1 = (
      Number(motorBillForUpHome1) + Number(Uphome1Bill)
    ).toFixed(2);
    onSubmitProps.setFieldValue(
      "upHome1TotalBill",
      totalEBBillForUpHome1,
      false
    );

    // Total EB Bill for UpHome2
    const totalEBBillForUpHome2 = (
      Number(motorBillForUpHome2) + Number(Uphome2Bill)
    ).toFixed(2);
    onSubmitProps.setFieldValue(
      "upHome2TotalBill",
      totalEBBillForUpHome2,
      false
    );

    // Total EB Bill for TopRoom
    onSubmitProps.setFieldValue("topRoomTotalBill", motorBillForTopRoom, false);

    const shopAmtPerUnit = Number(
      ebDetails.shopBill / ebDetails.shopTotalUnit
    ).toFixed(2);

    // Total EB Bill for Shop1
    onSubmitProps.setFieldValue(
      "shop1TotalBill",
      (shopAmtPerUnit * shop1TotalUnit).toFixed(2),
      false
    );

    // Total EB Bill for Shop2
    onSubmitProps.setFieldValue("shop2TotalBill", 0, false);

    // Total EB Bill for Shop3
    onSubmitProps.setFieldValue(
      "shop3TotalBill",
      (shopAmtPerUnit * shop3TotalUnit).toFixed(2),
      false
    );
  };

  return (
    <Box>
      <Paper sx={{ padding: 2 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container>
            <Grid size={{ xs: 5.5 }}>
              <Formik
                initialValues={INITIAL_EB_UNIT_FORM_VALUES}
                validationSchema={EB_UNIT_FORM_VALIDATION}
                onSubmit={onSubmitUnits}
                enableReinitialize={true}
                innerRef={formRef}
              >
                {(unitFormik) => (
                  <Form>
                    {/* Units Form heading */}
                    <Typography
                      textAlign="center"
                      color="secondary"
                      variant="h4"
                      fontWeight="bold"
                    >
                      Units of Service's
                    </Typography>
                    <Grid container spacing={0.5}>
                      {/* Current Total units */}
                      <Grid size={{ xs: 12 }} m={1}>
                        <Typography color="info" variant="h5">
                          Current Total Units
                        </Typography>
                      </Grid>
                      <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                          name="downHomeCurrentTotalUnits"
                          size="small"
                          label="DownHome Current Total Units"
                          fullWidth={true}
                          type="number"
                          isreadOnly={true}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                          name="upHomeCurrentTotalUnits"
                          size="small"
                          label="UpHome Current Total Units"
                          fullWidth={true}
                          type="number"
                          isreadOnly={true}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                          name="shopCurrentTotalUnits"
                          size="small"
                          label="Shop Current Total Units"
                          fullWidth={true}
                          type="number"
                          isreadOnly={true}
                        />
                      </Grid>

                      {/* UpHome2 Sub-Meter Readings */}
                      <Grid size={{ xs: 12 }} m={1}>
                        <Typography color="info" variant="h5">
                          UpHome2 Sub-Meter Readings
                        </Typography>
                      </Grid>
                      <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                          name="upHome2PreviousSubMtrReading"
                          size="small"
                          label="UpHome2 Previous SubMtr Reading"
                          fullWidth={true}
                          type="number"
                          isreadOnly={true}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                          name="upHome2CurrentSubMtrReading"
                          size="small"
                          label="UpHome2 Current SubMtr Reading"
                          fullWidth={true}
                          type="number"
                          isreadOnly={true}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                          name="upHome2TotalSubMtrUnit"
                          size="small"
                          label="UpHome2 Total SubMtr Unit"
                          fullWidth={true}
                          type="number"
                          isreadOnly={true}
                        />
                      </Grid>

                      {/* Motor Sub-Meter Readings */}
                      <Grid size={{ xs: 12 }} m={1}>
                        <Typography color="info" variant="h5">
                          Motor Sub-Meter Readings
                        </Typography>
                      </Grid>
                      <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                          name="motorPreviousSubMtrReading"
                          size="small"
                          label="Motor Previous SubMtr Reading"
                          fullWidth={true}
                          type="number"
                          isreadOnly={true}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                          name="motorCurrentSubMtrReading"
                          size="small"
                          label="Motor Current SubMtr Reading"
                          fullWidth={true}
                          type="number"
                          isreadOnly={true}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                          name="motorTotalSubMtrUnit"
                          size="small"
                          label="Motor Total SubMtr Unit"
                          fullWidth={true}
                          type="number"
                          isreadOnly={true}
                        />
                      </Grid>

                      {/* Shop3 Sub-Meter Readings */}
                      <Grid size={{ xs: 12 }} m={1}>
                        <Typography color="info" variant="h5">
                          Shop3 Sub-Meter Readings
                        </Typography>
                      </Grid>
                      <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                          name="shop3PreviousSubMtrReading"
                          size="small"
                          label="Shop3 Previous SubMtr Reading"
                          fullWidth={true}
                          type="number"
                          isreadOnly={true}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                          name="shop3CurrentSubMtrReading"
                          size="small"
                          label="Shop3 Current SubMtr Reading"
                          fullWidth={true}
                          type="number"
                          isreadOnly={true}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                          name="shop3TotalSubMtrUnit"
                          size="small"
                          label="Shop3 Total SubMtr Unit"
                          fullWidth={true}
                          type="number"
                          isreadOnly={true}
                        />
                      </Grid>

                      {/* Home Total Unit */}
                      <Grid size={{ xs: 12 }} m={1}>
                        <Typography color="info" variant="h5">
                          Home Total Unit
                        </Typography>
                      </Grid>
                      <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                          name="upHome1TotalUnit"
                          size="small"
                          label="UpHome1 Total Unit"
                          fullWidth={true}
                          type="number"
                          isreadOnly={true}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                          name="upHome2TotalUnit"
                          size="small"
                          label="UpHome2 Total Unit"
                          fullWidth={true}
                          type="number"
                          isreadOnly={true}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                          name="motorTotalUnit"
                          size="small"
                          label="Motor Total Unit"
                          fullWidth={true}
                          type="number"
                          isreadOnly={true}
                        />
                      </Grid>

                      {/* Shop Total Unit */}
                      <Grid size={{ xs: 12 }} m={1}>
                        <Typography color="info" variant="h5">
                          Shop Total Unit
                        </Typography>
                      </Grid>
                      <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                          name="shop1TotalUnit"
                          size="small"
                          label="Shop1 Total Unit"
                          fullWidth={true}
                          type="number"
                          isreadOnly={true}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                          name="shop2TotalUnit"
                          size="small"
                          label="Shop2 Total Unit"
                          fullWidth={true}
                          type="number"
                          isreadOnly={true}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                          name="shop3TotalUnit"
                          size="small"
                          label="Shop3 Total Unit"
                          fullWidth={true}
                          type="number"
                          isreadOnly={true}
                        />
                      </Grid>
                    </Grid>

                    <Grid size={{ xs: 12 }} m={2}>
                      <Box textAlign="center">
                        <Button
                          onClick={(e) => {
                            unitFormik.submitForm(unitFormik);
                          }}
                          color="success"
                        >
                          Calculate Units
                        </Button>
                      </Box>
                    </Grid>
                  </Form>
                )}
              </Formik>
            </Grid>
            <Divider orientation="vertical" flexItem sx={{ margin: 2 }} />
            <Grid size={{ xs: 5.5 }}>
              <Formik
                initialValues={INITIAL_EB_BILLS_FORM_VALUES}
                validationSchema={EB_BILL_FORM_VALIDATION}
                onSubmit={onSubmitBills}
                enableReinitialize
              >
                {(billsformik) => (
                  <Form>
                    <Typography
                      textAlign="center"
                      color="secondary"
                      variant="h4"
                      fontWeight="bold"
                    >
                      Bills of Service's
                    </Typography>
                    <Grid container spacing={0.5}>
                      <Grid size={{ xs: 12 }} m={1}>
                        <Typography color="info" variant="h5">
                          Bills of Service's
                        </Typography>
                      </Grid>
                      <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                          name="downHomeBill"
                          size="small"
                          label="DownHome(SO-031230031640)"
                          fullWidth={true}
                          type="number"
                          isreadOnly={true}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                          name="upHomeBill"
                          size="small"
                          label="UpHome(SO-031230031641)"
                          fullWidth={true}
                          type="number"
                          isreadOnly={true}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                          name="shopBill"
                          size="small"
                          label="Shop(SO-03123003484)"
                          fullWidth={true}
                          type="number"
                          isreadOnly={true}
                        />
                      </Grid>

                      <Grid size={{ xs: 12 }} m={1}>
                        <Typography variant="h5" color="success">
                          {`UpHome Bill Per Unit( ${ebDetails?.upHomeBill} / ${
                            ebDetails?.upHomeTotalUnit
                          } = ${(
                            ebDetails?.upHomeBill / ebDetails?.upHomeTotalUnit
                          ).toFixed(1)})`}
                        </Typography>
                      </Grid>

                      <Grid size={{ xs: 12 }} m={1}>
                        <Typography color="info" variant="h5">
                          {`Bills of UpHome`}
                        </Typography>
                      </Grid>
                      <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                          name="upHome1Bill"
                          size="small"
                          label="UpHome1 Bill"
                          fullWidth={true}
                          type="number"
                          isreadOnly={true}
                        />
                      </Grid>

                      <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                          name="upHome2Bill"
                          size="small"
                          label="UpHome2 Bill"
                          fullWidth={true}
                          type="number"
                          isreadOnly={true}
                        />
                      </Grid>

                      <Grid size={{ xs: 12 }} m={1}>
                        <Typography color="info" variant="h5">
                          Motor Bill
                        </Typography>
                      </Grid>
                      <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                          name="motorTotalBill"
                          size="small"
                          label="Motor Total Bill"
                          fullWidth={true}
                          type="number"
                          isreadOnly={true}
                        />
                      </Grid>

                      <Grid size={{ xs: 12 }} m={1}>
                        <Typography color="info" variant="h5">
                          Motor Bills of All Home
                        </Typography>
                      </Grid>
                      <Grid size={{ xs: 12, md: 3 }}>
                        <TextField
                          name="downHomeMotorBill"
                          size="small"
                          label={`DownHome Bill (${ebDetails?.downHomeTotalNoPeople})`}
                          fullWidth={true}
                          type="number"
                          isreadOnly="true"
                        />
                      </Grid>
                      <Grid size={{ xs: 12, md: 3 }}>
                        <TextField
                          name="upHome1MotorBill"
                          size="small"
                          label={`UpHome1 Bill (${ebDetails?.upHome1TotalNoPeople})`}
                          fullWidth={true}
                          type="number"
                          isreadOnly="true"
                        />
                      </Grid>
                      <Grid size={{ xs: 12, md: 3 }}>
                        <TextField
                          name="upHome2MotorBill"
                          size="small"
                          label={`UpHome2 Bill (${ebDetails?.upHome2TotalNoPeople})`}
                          fullWidth={true}
                          type="number"
                          isreadOnly="true"
                        />
                      </Grid>
                      <Grid size={{ xs: 12, md: 3 }}>
                        <TextField
                          name="topRoomMotorBill"
                          size="small"
                          label={`TopRoom Bill (${ebDetails?.topRoomTotalNoPeople})`}
                          fullWidth={true}
                          type="number"
                          isreadOnly="true"
                        />
                      </Grid>

                      <Grid size={{ xs: 12 }} m={1}>
                        <Typography color="info" variant="h5">
                          Total Bills of All Home
                        </Typography>
                      </Grid>
                      <Grid size={{ xs: 12, md: 3 }}>
                        <TextField
                          name="downHomeTotalBill"
                          size="small"
                          label="DownHome Bill"
                          fullWidth={true}
                          type="number"
                          isreadOnly="true"
                        />
                      </Grid>
                      <Grid size={{ xs: 12, md: 3 }}>
                        <TextField
                          name="upHome1TotalBill"
                          size="small"
                          label="UpHome1 Bill"
                          fullWidth={true}
                          type="number"
                          isreadOnly="true"
                        />
                      </Grid>
                      <Grid size={{ xs: 12, md: 3 }}>
                        <TextField
                          name="upHome2TotalBill"
                          size="small"
                          label="UpHome2 Bill"
                          fullWidth={true}
                          type="number"
                          isreadOnly="true"
                        />
                      </Grid>
                      <Grid size={{ xs: 12, md: 3 }}>
                        <TextField
                          name="topRoomTotalBill"
                          size="small"
                          label="TopRoom Bill"
                          fullWidth={true}
                          type="number"
                          isreadOnly="true"
                        />
                      </Grid>

                      <Grid size={{ xs: 12 }} m={1}>
                        <Typography color="success" variant="h5">
                          {`UpHome Bill Per Unit( ${ebDetails?.shopBill} / ${
                            ebDetails?.shopTotalUnit
                          } = ${(
                            ebDetails?.shopBill / ebDetails?.shopTotalUnit
                          ).toFixed(1)})`}
                        </Typography>
                      </Grid>

                      <Grid size={{ xs: 12 }} m={1}>
                        <Typography color="info" variant="h5">
                          Total Bills of All Shop
                        </Typography>
                      </Grid>
                      <Grid size={{ xs: 12, md: 3 }}>
                        <TextField
                          name="shop1TotalBill"
                          size="small"
                          label="Shop1 Bill"
                          fullWidth={true}
                          type="number"
                          isreadOnly="true"
                        />
                      </Grid>
                      <Grid size={{ xs: 12, md: 3 }}>
                        <TextField
                          name="shop2TotalBill"
                          size="small"
                          label="Shop2 Bill"
                          fullWidth={true}
                          type="number"
                          isreadOnly="true"
                        />
                      </Grid>
                      <Grid size={{ xs: 12, md: 3 }}>
                        <TextField
                          name="shop3TotalBill"
                          size="small"
                          label="Shop3 Bill"
                          fullWidth={true}
                          type="number"
                          isreadOnly="true"
                        />
                      </Grid>
                    </Grid>
                    <Grid size={{ xs: 12 }} m={2}>
                      <Box textAlign="center">
                        <Button
                          onClick={(e) => {
                            billsformik.submitForm();
                          }}
                          color="success"
                        >
                          Calculate Units
                        </Button>
                      </Box>
                    </Grid>
                  </Form>
                )}
              </Formik>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};

export default EBCalculator;
