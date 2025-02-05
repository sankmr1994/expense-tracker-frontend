import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Outlet, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import HandleLogout from "../../utils/HandleLogout";
import { useDispatch, useSelector } from "react-redux";
import { menuList } from "../../utils/menuList";
import logo from "../../assets/logot.png";
import MenuItem from "./MenuItem";
import ExpandableMenuItem from "./ExpandableMenuItem";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { Tooltip } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import { toggleTheme } from "../../reducers/themeSlice";

const drawerWidth = 200;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "isDrawerOpen",
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ isDrawerOpen }) => isDrawerOpen,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "isDrawerOpen",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ isDrawerOpen }) => isDrawerOpen,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ isDrawerOpen }) => !isDrawerOpen,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));

const SideBar = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const theme = useTheme();
  const [isDrawerOpen, setDrawerOpen] = React.useState(true);
  const darkMode = useSelector((store) => store.theme.isDark);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleLogout = () => {
    HandleLogout(dispatch, navigator);
  };

  const createMenuList = (menuItems) => {
    const createList = (menuItems) => {
      let menu = [];
      menuItems.map((menuItem) => {
        if (Array.isArray(menuItem.items) && menuItem.items.length > 0) {
          menu.push(
            <ExpandableMenuItem
              isDrawerOpen={isDrawerOpen}
              menu={menuItem}
              key={menuItem.title}
              createMenuList={createMenuList}
            />
          );
        } else {
          menu.push(
            <MenuItem
              isDrawerOpen={isDrawerOpen}
              menu={menuItem}
              key={menuItem.title}
            />
          );
        }
      });
      return menu;
    };
    return createList(menuItems);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" isDrawerOpen={isDrawerOpen}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                marginRight: 5,
              },
              isDrawerOpen && { display: "none" },
            ]}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            color="#FDFDFD"
            sx={{ flexGrow: 1 }}
          >
            Expense Tracker
          </Typography>
          {darkMode ? (
            <IconButton
              color="secondary"
              onClick={() => dispatch(toggleTheme())}
            >
              <LightModeIcon />
            </IconButton>
          ) : (
            <IconButton onClick={() => dispatch(toggleTheme())}>
              <DarkModeIcon />
            </IconButton>
          )}

          <Tooltip
            title={
              <div style={{ color: "white", fontSize: "15px" }}>Logout</div>
            }
          >
            <IconButton color="inherit" onClick={handleLogout}>
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" isDrawerOpen={isDrawerOpen}>
        <DrawerHeader>
          <img
            src={logo}
            alt="Logo"
            width={75}
            height={65}
            style={{ marginLeft: "30%" }}
          />
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>{createMenuList(menuList)}</List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
};

export default SideBar;
