import axios from "axios";

const PIE_CHART_REST_API_BASE_URL = "http://localhost:8014/api/v1/piCharts";

export const fetchPieChartDetailsByDate = (startDate, endDate) =>
  axios.get(PIE_CHART_REST_API_BASE_URL, {
    params: {
      startDate: startDate,
      endDate: endDate,
    },
  });
