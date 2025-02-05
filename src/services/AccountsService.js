import axios from "axios";

const ACCOUNT_REST_API_BASE_URL = "http://localhost:8014/api/v1/accounts";

export const fetchAllAccount = () => axios.get(ACCOUNT_REST_API_BASE_URL);

export const createAccount = (account) =>
  axios.post(ACCOUNT_REST_API_BASE_URL, account);

export const getAccountById = (accountId) =>
  axios.get(ACCOUNT_REST_API_BASE_URL + "/" + accountId);

export const updateAccount = (accountId, account) =>
  axios.put(ACCOUNT_REST_API_BASE_URL + "/" + accountId, account);

export const deleteAccountById = (accountId) =>
  axios.delete(ACCOUNT_REST_API_BASE_URL + "/" + accountId);

export const fetchAllAccountIdAndName = () =>
  axios.get(ACCOUNT_REST_API_BASE_URL + "/getAccountIdAndName");
