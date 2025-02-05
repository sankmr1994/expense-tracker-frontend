import axios from "axios";

const CATEGORY_REST_API_BASE_URL = "http://localhost:8014/api/v1/categories";

export const fetchAllCategory = () => axios.get(CATEGORY_REST_API_BASE_URL);

export const fetchAllCategoryByType = (categoryType) =>
  axios.get(CATEGORY_REST_API_BASE_URL + `/type`, {
    params: {
      categoryType: categoryType,
    },
  });

export const createCategory = (category) =>
  axios.post(CATEGORY_REST_API_BASE_URL, category);

export const getCategoryById = (categoryId) =>
  axios.get(CATEGORY_REST_API_BASE_URL + "/" + categoryId);

export const updateCategory = (categoryId, category) =>
  axios.put(CATEGORY_REST_API_BASE_URL + "/" + categoryId, category);

export const deleteCategoryById = (categoryId) =>
  axios.delete(CATEGORY_REST_API_BASE_URL + "/" + categoryId);

export const fetchAllCategoryIdAndName = (categoryType) =>
  axios.get(CATEGORY_REST_API_BASE_URL + `/getCategoryIdAndName`, {
    params: {
      categoryType: categoryType,
    },
  });

export const fetchAllCategoryTypes = () =>
  axios.get(CATEGORY_REST_API_BASE_URL + "/types");
