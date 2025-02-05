import { Box, Container, Paper, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import TextField from "../../components/formsUI/TextField";
import Button from "../../components/formsUI/Button";
import { Form, Formik } from "formik";
import { USER_LOGIN_VALIDATION } from "../../schemas/userLoginSchema";
import LoginIcon from "@mui/icons-material/Login";
import {
  isUserLoggedIn,
  saveLoggedInUser,
  storeToken,
  userLoginAPI,
} from "../../services/auth/AuthService";
import { userLoggedIn } from "../../reducers/userSlice";
import { useDispatch, useSelector } from "react-redux";
import HandleLoginErrors from "../../validations/HandleLoginErrors";
import { LOGIN_SESSION_EXPIRED } from "../../utils/constants";

const Login = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();

  const isJwtSessionExpired = useSelector(
    (store) => store.jwt.jwtSessionExpiredError
  );

  const USER_LOGIN_INITIAL_VALUES = {
    userNameOrEmail: "",
    password: "",
  };

  console.log("login", USER_LOGIN_INITIAL_VALUES);

  const onSubmit = (values, onSubmitProps) => {
    const loginObj = {
      userNameOrEmail: values.userNameOrEmail,
      password: values.password,
    };

    userLoginAPI(loginObj)
      .then((res) => {
        const { accessToken, tokenType, role } = res.data;
        const token = tokenType + " " + accessToken;
        storeToken(token);
        saveLoggedInUser(values.userNameOrEmail, role);
        dispatch(userLoggedIn(isUserLoggedIn()));
        onSubmitProps.resetForm();
        onSubmitProps.setSubmitting(false);
        navigator("/home");
      })
      .catch((error) => {
        console.error(error.response.data);
        HandleLoginErrors(
          error.response.data,
          onSubmitProps,
          navigator,
          dispatch
        );
        onSubmitProps.setSubmitting(false);
      });
  };

  return (
    <Box bgcolor={"#FDFDFD"}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="70vh"
      >
        <Container maxWidth="sm" sx={{ textAlign: "center" }}>
          <Paper sx={{ p: 2 }}>
            <Formik
              initialValues={USER_LOGIN_INITIAL_VALUES}
              validationSchema={USER_LOGIN_VALIDATION}
              onSubmit={onSubmit}
            >
              {(formik) => (
                <Form>
                  <Box display="flex" flexDirection="column" gap={2}>
                    <Typography variant="h4">Login In</Typography>
                    <TextField
                      type="text"
                      label="Username or Email"
                      name="userNameOrEmail"
                    />
                    <TextField
                      type="password"
                      label="Password"
                      name="password"
                    />
                    <Button
                      sx={{ py: 1 }}
                      variant="contained"
                      onClick={(e) => formik.submitForm()}
                      disabled={!formik.isValid || formik.isSubmitting}
                      endIcon={<LoginIcon />}
                    >
                      Login
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
            {isJwtSessionExpired && (
              <div style={{ color: "orangered", marginTop: "5px" }}>
                {LOGIN_SESSION_EXPIRED}
              </div>
            )}
            <span
              style={{
                display: "inline-block",
                marginTop: "20px",
                padding: "5px",
              }}
            >
              {"Don't have an account?"}
            </span>
            <Link style={{ fontSize: 18 }} to={"/register"}>
              Sign up
            </Link>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default Login;
