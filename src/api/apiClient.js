import axios from "axios";
import { notify } from "../notifications/notify";

const API_BASE_URL = "http://localhost:3000";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.message === "Network Error") {
      notify("Network Error", "error");
      return;
    }
    return Promise.reject(error);
  }
);

export default apiClient;
