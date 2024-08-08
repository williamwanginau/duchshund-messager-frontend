import apiClient from "./apiClient";

export const loginAPI = async (email, password) => {
  return apiClient.post("auth/login", {
    email,
    password,
  });
};

export const registerAPI = async (username, email, password) => {
  return apiClient.post("auth/register", {
    username,
    email,
    password,
  });
};
