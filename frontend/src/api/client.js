import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";

const api = axios.create({ baseURL });

api.interceptors.request.use((config) => {
  const access = localStorage.getItem("accessToken");
  if (access) {
    config.headers.Authorization = `Bearer ${access}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const refresh = localStorage.getItem("refreshToken");
    if (error.response?.status === 401 && refresh && !originalRequest._retry) {
      originalRequest._retry = true;
      const response = await axios.post(`${baseURL}/auth/refresh/`, { refresh });
      localStorage.setItem("accessToken", response.data.access);
      originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
      return api(originalRequest);
    }
    return Promise.reject(error);
  },
);

export default api;
