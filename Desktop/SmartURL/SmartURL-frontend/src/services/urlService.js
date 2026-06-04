// import API from "./api";

// export const createUrl = async (
//   data
// ) => {
//   const response = await API.post(
//     "/url/create",
//     data
//   );

//   return response.data;
// };

// export const getMyUrls = async () => {
//   const response = await API.get(
//     "/url/myurls"
//   );

//   return response.data;
// };

// export const deleteUserUrl =
//   async (id) => {
//     const response =
//       await API.delete(
//         `/url/delete/${id}`
//       );

//     return response.data;
//   };

// export const updateUserUrl =
//   async (id, data) => {
//     const response =
//       await API.put(
//         `/url/update/${id}`,
//         data
//       );

//     return response.data;
//   };

import API from "./api";

export const createUrl = async (
  data
) => {
  const response = await API.post(
    "/url/create",
    data
  );

  return response.data;
};

export const getMyUrls = async () => {
  const response = await API.get(
    "/url/myurls"
  );

  return response.data;
};

export const deleteUserUrl =
  async (id) => {
    const response =
      await API.delete(
        `/url/delete/${id}`
      );

    return response.data;
  };

export const updateUserUrl =
  async (id, data) => {
    const response =
      await API.put(
        `/url/update/${id}`,
        data
      );

    return response.data;
  };

// NEW
export const getPublicStats =
  async (shortCode) => {
    const response =
      await API.get(
        `/url/public/${shortCode}`
      );

    return response.data;
  };