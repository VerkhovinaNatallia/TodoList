import axios from "axios";
import type {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import type { AuthResponse, LoginData, RegisterData } from "@/types/types";
import { handleLogout } from "@/store/auth/authSlice"; 

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setupInterceptors = () => {
  api.interceptors.request.clear();
  api.interceptors.response.clear();

  api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  api.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as CustomAxiosRequestConfig;

      if (
        error.response?.status === 401 &&
        originalRequest &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;

        try {
          const refreshToken = localStorage.getItem("refreshToken");
          if (!refreshToken) {
            throw new Error("No refresh token");
          }

          const response = await axios.post<AuthResponse>(
            `${API_BASE_URL}/auth/refresh`,
            {
              refreshToken,
            }
          );

          const { accessToken, refreshToken: newRefreshToken } = response.data;

          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", newRefreshToken);

          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          handleLogout();
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );
};

setupInterceptors();

export const authAPI = {
  register: (data: RegisterData) => {
    return api.post<AuthResponse>("/auth/register", data);
  },
  login: (data: LoginData) => api.post<AuthResponse>("/auth/login", data),
  getProfile: () => api.get("/auth/me"),
  changePassword: (data: { oldPassword: string; newPassword: string }) =>
    api.post("/auth/change-password", data),
  refreshToken: (refreshToken: string) =>
    api.post<AuthResponse>("/auth/refresh", { refreshToken }),
};

export default api;
