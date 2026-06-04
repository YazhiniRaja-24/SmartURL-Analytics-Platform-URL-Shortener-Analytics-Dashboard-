import API from "./api";

// Dashboard Summary
export const getSummary = async () => {
  const response = await API.get(
    "/analytics/summary"
  );

  return response.data;
};

// Daily Click Trends
export const getDailyTrends =
  async () => {
    const response =
      await API.get(
        "/analytics/daily-trends"
      );

    return response.data;
  };

// Top URLs
export const getTopUrls =
  async () => {
    const response =
      await API.get(
        "/analytics/top-urls"
      );

    return response.data;
  };

// Recent Clicks
export const getRecentClicks =
  async () => {
    const response =
      await API.get(
        "/analytics/recent-clicks"
      );

    return response.data;
  };

// Browser Stats
export const getBrowserStats =
  async (urlId) => {
    const response =
      await API.get(
        `/analytics/browser/${urlId}`
      );

    return response.data;
  };

// Device Stats
export const getDeviceStats =
  async (urlId) => {
    const response =
      await API.get(
        `/analytics/device/${urlId}`
      );

    return response.data;
  };

// Country Stats
export const getCountryStats =
  async (urlId) => {
    const response =
      await API.get(
        `/analytics/country/${urlId}`
      );

    return response.data;
  };