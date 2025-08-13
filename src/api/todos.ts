import axios from "axios";

const API_URL = "http://localhost:3001";


export const fetchTodosApi = async (page: number, limit: number) => {
  const response = await axios.get(`${API_URL}/todos`, {
    params: { page, limit },
  });
 
  return {
    data: response.data.data || [],
    totalCount: response.data.total || 0,
    page: response.data.page || 1,
    limit: response.data.limit || limit,
    totalPages: response.data.totalPages || 1,
  };
};
export const createTodoApi = async (text: string) => {
  const response = await axios.post(`${API_URL}/todos`, { text });
  return response.data;
};

export const deleteTodoApi = async (id: number) => {
  await axios.delete(`${API_URL}/todos/${id}`);
};

export const updateTodoApi = async (
  id: number,
  updates: { text?: string; completed?: boolean }
) => {
  const response = await axios.put(`${API_URL}/todos/${id}`, updates);
  return response.data;
};

export const toggleTodoApi = async (id: number) => {
  const response = await axios.patch(`${API_URL}/todos/${id}/toggle`);
  return response.data;
};
