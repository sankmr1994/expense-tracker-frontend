import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import Login from "./scenes/auth/Login";
import RootLayout from "./layouts/RootLayout";
import Register from "./scenes/auth/Register";
import Expense from "./scenes/expense/ExpensePage";
import React from "react";
import HomeLayout from "./layouts/HomeLayout";
import Dashboard from "./scenes/Dashboard";
import Error from "./components/error/Error";
import { isUserLoggedIn } from "./services/auth/AuthService";
import Income from "./scenes/Income/IncomePage";
import MasterLayout from "./scenes/masters/MasterLayout";
import AccountPage from "./scenes/masters/account/AccountPage";
import { createTheme, ThemeProvider } from "@mui/material";
import { darkPalette, lightPalette } from "./utils/colorPalette";
import { useSelector } from "react-redux";
import CategoryPage from "./scenes/masters/category/CategoryPage";
import PaymentTypePage from "./scenes/masters/paymentType/PaymentTypePage";
import EBCalculator from "./scenes/homeManagement/ebCalculator/EBCalculator";
import EBMaster from "./scenes/homeManagement/ebCalculator/EBMaster";

function App() {
  const darkMode = useSelector((store) => store.theme.isDark);
  const theme = createTheme(darkMode ? darkPalette : lightPalette);

  const AuthenticatedRoute = ({ children }) => {
    if (isUserLoggedIn()) {
      return children;
    }
    return <Navigate to={"/"} />;
  };

  const routerNew = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <Error />,
      children: [
        {
          path: "/",
          element: <Login />,
          index: true,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/home",
          element: <HomeLayout />,
          children: [
            {
              path: "/home",
              element: (
                <AuthenticatedRoute>
                  <Dashboard />
                </AuthenticatedRoute>
              ),
              index: true,
            },
            {
              path: "/home/dashboard",
              element: (
                <AuthenticatedRoute>
                  <Dashboard />
                </AuthenticatedRoute>
              ),
            },
            {
              path: "/home/master",
              element: <MasterLayout />,
              children: [
                {
                  path: "/home/master/account",
                  element: (
                    <AuthenticatedRoute>
                      <AccountPage />
                    </AuthenticatedRoute>
                  ),
                },
                {
                  path: "/home/master/category",
                  element: (
                    <AuthenticatedRoute>
                      <CategoryPage />
                    </AuthenticatedRoute>
                  ),
                },
                {
                  path: "/home/master/paymentType",
                  element: (
                    <AuthenticatedRoute>
                      <PaymentTypePage />
                    </AuthenticatedRoute>
                  ),
                },
              ],
            },
            {
              path: "/home/expense",
              element: (
                <AuthenticatedRoute>
                  <Expense />
                </AuthenticatedRoute>
              ),
            },
            {
              path: "/home/income",
              element: (
                <AuthenticatedRoute>
                  <Income />
                </AuthenticatedRoute>
              ),
            },
            {
              path: "/home/homeMangement",
              element: (
                <AuthenticatedRoute>
                  <MasterLayout />
                </AuthenticatedRoute>
              ),
              children: [
                {
                  path: "/home/homeMangement/ebMaster",
                  element: (
                    <AuthenticatedRoute>
                      <EBMaster />
                    </AuthenticatedRoute>
                  ),
                },
                {
                  path: "/home/homeMangement/ebCalculator",
                  element: (
                    <AuthenticatedRoute>
                      <EBCalculator />
                    </AuthenticatedRoute>
                  ),
                },
              ],
            },
          ],
        },
      ],
    },
  ]);

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <RouterProvider router={routerNew} />
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
