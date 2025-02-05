import axios from "axios";

const INCOME_REST_API_BASE_URL = "http://localhost:8014/api/v1/incomes";

export const fetchAllIncome = () => axios.get(INCOME_REST_API_BASE_URL);

export const createIncome = (income) =>
  axios.post(INCOME_REST_API_BASE_URL, income);

export const getIncomeById = (incomeId) =>
  axios.get(INCOME_REST_API_BASE_URL + "/" + incomeId);

export const updateIncome = (incomeId, income) =>
  axios.put(INCOME_REST_API_BASE_URL + "/" + incomeId, income);

export const deleteIncomeById = (incomeId) =>
  axios.delete(INCOME_REST_API_BASE_URL + "/" + incomeId);

export const fetchIncomeByDate = (startDate, endDate) =>
  axios.get(
    INCOME_REST_API_BASE_URL + `/date?startDate=${startDate}&endDate=${endDate}`
  );
