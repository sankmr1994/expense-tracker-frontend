import axios from "axios";

const PAYMENT_TYPE_REST_API_BASE_URL =
  "http://localhost:8014/api/v1/paymentTypes";

export const fetchAllPaymentType = () =>
  axios.get(PAYMENT_TYPE_REST_API_BASE_URL);

export const createPaymentType = (PaymentType) =>
  axios.post(PAYMENT_TYPE_REST_API_BASE_URL, PaymentType);

export const getPaymentTypeById = (PaymentTypeId) =>
  axios.get(PAYMENT_TYPE_REST_API_BASE_URL + "/" + PaymentTypeId);

export const updatePaymentType = (PaymentTypeId, PaymentType) =>
  axios.put(PAYMENT_TYPE_REST_API_BASE_URL + "/" + PaymentTypeId, PaymentType);

export const deletePaymentTypeById = (PaymentTypeId) =>
  axios.delete(PAYMENT_TYPE_REST_API_BASE_URL + "/" + PaymentTypeId);

export const fetchAllPaymentTypeIdAndName = () =>
  axios.get(PAYMENT_TYPE_REST_API_BASE_URL + "/getPaymentTypeIdAndName");
