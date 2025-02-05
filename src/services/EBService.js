import axios from "axios";

const ACCOUNT_REST_API_BASE_URL = "http://localhost:8014/api/v1/ebMaster";

export const fetchEBDetails = () => axios.get(ACCOUNT_REST_API_BASE_URL);

export const saveEBDetails = (ebDetails) =>
  axios.post(ACCOUNT_REST_API_BASE_URL, ebDetails);
