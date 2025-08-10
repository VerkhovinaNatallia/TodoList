import axios from 'axios';

const API_URL = 'http://localhost:3001';


// api/todos.ts
export const fetchTodosApi = async (page: number, limit: number) => {
  const response = await axios.get(`${API_URL}/todos`, {
    params: { page, limit}
  });
  
  // Правильно обрабатываем структуру ответа
  return {
    data: response.data.data || [], // извлекаем массив задач
    totalCount: response.data.total || 0,
    page: response.data.page || 1,
    limit: response.data.limit || limit,
    totalPages: response.data.totalPages || 1
  };
};
//Создание 
export const createTodoApi = async (text: string) => {
    const response = await axios.post(`${API_URL}/todos`, {text});
    return response.data;
};

// Удаление
export const deleteTodoApi = async (id: number) => {
    await axios.delete(`${API_URL}/todos/${id}`);
};

//Обновление
export const updateTodoApi = async (id: number, updates: { text?: string; completed?: boolean }) => {
  const response = await axios.put(`${API_URL}/todos/${id}`, updates);
  return response.data;
};

// Переключение статуса выполнения
export const toggleTodoApi = async (id: number) => {
  const response = await axios.patch(`${API_URL}/todos/${id}/toggle`);
  return response.data;
};