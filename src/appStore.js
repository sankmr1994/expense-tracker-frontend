import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./reducers/userSlice";
import JWTReducer from "./reducers/jwtSlice";
import AccountReducer from "./reducers/accountSlice";
import ExpenseReducer from "./reducers/expenseSlice";
import IncomeReducer from "./reducers/incomeSlice";
import CategoryReducer from "./reducers/categorySlice";
import ThemeReducer from "./reducers/themeSlice";
import paymentTypeReducer from "./reducers/patmentTypeSlice";
import PieChartReducer from "./reducers/charts/pieChartSlice";

const appStore = configureStore({
  reducer: {
    user: UserReducer,
    jwt: JWTReducer,
    account: AccountReducer,
    theme: ThemeReducer,
    expense: ExpenseReducer,
    category: CategoryReducer,
    paymentType: paymentTypeReducer,
    income: IncomeReducer,
    pieChart: PieChartReducer,
  },
});

export default appStore;
