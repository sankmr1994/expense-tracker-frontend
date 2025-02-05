import DashboardIcon from "@mui/icons-material/Dashboard";
import PaidIcon from "@mui/icons-material/Paid";
import SavingsIcon from "@mui/icons-material/Savings";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CategoryIcon from "@mui/icons-material/Category";
import PaymentIcon from "@mui/icons-material/Payment";
import CalculateIcon from "@mui/icons-material/Calculate";
import DomainIcon from "@mui/icons-material/Domain";
export const menuList = [
  {
    id: 1,
    title: "DashBoard",
    icon: <DashboardIcon />,
    path: "dashboard",
    items: [],
  },
  {
    id: 2,
    title: "Masters",
    icon: <AdminPanelSettingsIcon />,
    items: [
      {
        id: 21,
        title: "Account",
        icon: <AccountBalanceIcon />,
        path: "/home/master/account",
        items: [],
      },
      {
        id: 22,
        title: "Category",
        icon: <CategoryIcon />,
        path: "/home/master/category",
        items: [],
      },
      {
        id: 23,
        title: "PaymentType",
        icon: <PaymentIcon />,
        path: "/home/master/paymentType",
        items: [],
      },
    ],
  },

  {
    id: 3,
    title: "Expense",
    icon: <PaidIcon />,
    path: "expense",
    items: [],
  },

  {
    id: 4,
    title: "Income",
    icon: <SavingsIcon />,
    path: "income",
    items: [],
  },
  {
    id: 5,
    title: "Home",
    icon: <DomainIcon />,
    path: "homeMangement",
    items: [
      {
        id: 51,
        title: "EB Master",
        icon: <AdminPanelSettingsIcon />,
        path: "/home/homeMangement/ebMaster",
        items: [],
      },
      {
        id: 51,
        title: "EB Calculator",
        icon: <CalculateIcon />,
        path: "/home/homeMangement/ebCalculator",
        items: [],
      },
    ],
  },
];
