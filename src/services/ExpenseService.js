import axios from "axios";

const EXPENSE_REST_API_BASE_URL = "http://localhost:8014/api/v1/expenses";

export const fetchAllExpense = () => axios.get(EXPENSE_REST_API_BASE_URL);

export const createExpense = (expense) =>
  axios.post(EXPENSE_REST_API_BASE_URL, expense);

export const getExpenseById = (expenseId) =>
  axios.get(EXPENSE_REST_API_BASE_URL + "/" + expenseId);

export const updateExpense = (expenseId, expense) =>
  axios.put(EXPENSE_REST_API_BASE_URL + "/" + expenseId, expense);

export const deleteExpenseById = (expenseId) =>
  axios.delete(EXPENSE_REST_API_BASE_URL + "/" + expenseId);

export const fetchExpenseByDate = (startDate, endDate) =>
  axios.get(EXPENSE_REST_API_BASE_URL + `/date`, {
    params: {
      startDate: startDate,
      endDate: endDate,
      sort: `expenseDate,desc`,
    },
  });
