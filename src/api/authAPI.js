import apiClient from "./apiClient";

export const loginAPI = async (email, password) => {
  try {
    const res = await apiClient.post("auth/login", {
      email,
      password,
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const registerAPI = async (username, email, password) => {
  try {
    const res = await apiClient.post("auth/register", {
      username,
      email,
      password,
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
