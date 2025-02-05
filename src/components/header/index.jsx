import { AppBar, Avatar, Toolbar, Typography } from "@mui/material";
import React from "react";
import Grid from "@mui/material/Grid2";
import logo from "../../assets/logot.png";
import { useSelector } from "react-redux";

const Header = () => {
  const isAuth = useSelector((store) => store.user.isUserAuth);
  return (
    <React.Fragment>
      {!isAuth && (
        <AppBar position="static">
          <Toolbar width="100%">
            <Grid container columnSpacing={1}>
              <Grid
                display="flex"
                justifyContent="center"
                alignItems="center"
                size="grow"
              >
                <Avatar
                  alt="SSTech Logo"
                  src={logo}
                  sx={{ width: 60, height: 60 }}
                />
              </Grid>
              <Grid
                size={10}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Typography
                  color="#FDFDFD"
                  variant="h5"
                  sx={{ fontWeight: "bold" }}
                >
                  Expense Tracker
                </Typography>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      )}
    </React.Fragment>
  );
};

export default Header;
