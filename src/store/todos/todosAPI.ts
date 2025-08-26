import axios from "axios";
import type { TodosResponse } from "../../types/types";

const API_BASE_URL = "http://localhost:3001";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const fetchTodosApi = async (
  page: number = 1,
  limit: number = 10
): Promise<TodosResponse> => {
  const response = await api.get(`/todos?page=${page}&limit=${limit}`);
  return response.data;
};

export const createTodoApi = async (text: string) => {
  const response = await api.post(`/todos`, { text });
  return response.data;
};

export const deleteTodoApi = async (id: number) => {
  await api.delete(`/todos/${id}`);
};

export const updateTodoApi = async (
  id: number,
  updates: { text?: string; completed?: boolean }
) => {
  const response = await api.put(`/todos/${id}`, updates);
  return response.data;
};

export const toggleTodoApi = async (id: number) => {
  const response = await api.patch(`/todos/${id}/toggle`);
  return response.data;
};
