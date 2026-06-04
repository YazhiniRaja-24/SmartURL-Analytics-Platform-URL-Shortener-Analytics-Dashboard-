import API from "./api";

// Register
export const registerUser =
  async (userData) => {
    const response =
      await API.post(
        "/auth/register",
        userData
      );

    return response.data;
  };

// Login
export const loginUser =
  async (userData) => {
    const response =
      await API.post(
        "/auth/login",
        userData
      );

    return response.data;
  };

// Get Profile
export const getProfile =
  async () => {
    const response =
      await API.get(
        "/auth/profile"
      );

    return response.data;
  };

// Update Profile
export const updateProfile =
  async (data) => {
    const response =
      await API.put(
        "/auth/update-profile",
        data
      );

    return response.data;
  };

// Change Password
export const changePassword =
  async (data) => {
    const response =
      await API.put(
        "/auth/change-password",
        data
      );

    return response.data;
  };