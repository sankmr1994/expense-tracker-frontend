import { Box, Container, Paper, Typography } from "@mui/material";
import { Formik } from "formik";
import { Form, Link } from "react-router-dom";
import TextField from "../../components/formsUI/TextField";
import Button from "../../components/formsUI/Button";
import RadioButton from "../../components/formsUI/RadioButton";
import DateTimePicker from "../../components/formsUI/DatePicker";
import { USER_REGISTER_VALIDATION } from "../../schemas/userRegisterSchema";
import { GENDER_OPTIONS } from "../../utils/constants";
import { userRegisterAPI } from "../../services/auth/AuthService";
import HandleRegisterationErrors from "../../validations/HandleRegisterationErrors";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

const Register = () => {
  const USER_REGISTER_INITIAL_VALUES = {
    name: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "m",
    dob: null,
  };

  const onSubmit = (values, onSubmitProps) => {
    const registerObj = {
      name: values.name,
      userName: values.userName,
      email: values.email,
      password: values.password,
      gender: values.gender,
      dateOfBirth: new Date(values.dob).toISOString().split("T")[0],
    };

    userRegisterAPI(registerObj)
      .then((res) => {
        onSubmitProps.resetForm();
        onSubmitProps.setSubmitting(false);
      })
      .catch((error) => {
        console.error(error.response.data);
        HandleRegisterationErrors(error.response.data, onSubmitProps);
        onSubmitProps.setSubmitting(false);
      });
  };

  return (
    <Box bgcolor={"#FDFDFD"}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="90vh"
      >
        <Container maxWidth="sm" sx={{ textAlign: "center" }}>
          <Paper sx={{ p: 3 }}>
            <Formik
              initialValues={USER_REGISTER_INITIAL_VALUES}
              validationSchema={USER_REGISTER_VALIDATION}
              onSubmit={onSubmit}
            >
              {(formik) => {
                return (
                  <Form>
                    <Box display="flex" flexDirection="column" gap={2}>
                      <Typography variant="h4">Sign Up</Typography>
                      <TextField
                        type="text"
                        label="Name"
                        size="small"
                        name="name"
                      />
                      <TextField
                        type="text"
                        label="User Name"
                        size="small"
                        name="userName"
                      />
                      <TextField
                        type="email"
                        label="Email"
                        size="small"
                        name="email"
                      />
                      <TextField
                        type="password"
                        label="Password"
                        size="small"
                        name="password"
                      />
                      <TextField
                        type="password"
                        label="Confirm Password"
                        size="small"
                        name="confirmPassword"
                      />
                      <RadioButton
                        label="Gender"
                        name="gender"
                        options={GENDER_OPTIONS}
                      />
                      <DateTimePicker
                        name="dob"
                        label="DOB"
                        size="small"
                        fullWidth={true}
                      />
                      <Box display="flex" flexDirection="row" gap={1}>
                        <Button
                          sx={{ py: 1 }}
                          onClick={(e) => formik.resetForm()}
                          endIcon={<RestartAltIcon />}
                        >
                          Reset Form
                        </Button>
                        <Button
                          sx={{ py: 1 }}
                          variant="contained"
                          onClick={(e) => formik.submitForm()}
                          disabled={!formik.isValid || formik.isSubmitting}
                          endIcon={<ExitToAppIcon />}
                        >
                          Sign up
                        </Button>
                      </Box>
                    </Box>
                  </Form>
                );
              }}
            </Formik>
            <span
              style={{
                display: "inline-block",
                marginTop: "20px",
                padding: "5px",
              }}
            >
              {"Already have an account?"}
            </span>
            <Link style={{ fontSize: 18 }} to={"/"}>
              Login in
            </Link>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default Register;
