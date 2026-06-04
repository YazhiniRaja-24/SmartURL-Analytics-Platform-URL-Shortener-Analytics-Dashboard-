import API from "./api";

export const getSummary = async () => {
  const response = await API.get(
    "/analytics/summary"
  );

  return response.data;
};

export const getDailyTrends =
  async () => {
    const response =
      await API.get(
        "/analytics/daily-trends"
      );

    return response.data;
  };

export const getTopUrls =
  async () => {
    const response =
      await API.get(
        "/analytics/top-urls"
      );

    return response.data;
  };