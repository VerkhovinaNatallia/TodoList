import axios from 'axios';

const API_URL = 'http://localhost:3001';

// Получение
export const fetchTodos = async (page: number) => {
    const response = await axios.get(`${API_URL}/todos?page=${page}`);
    return response.data;
};

//Создание 
export const createTodo= async (text: string) => {
    const response = await axios.post(`${API_URL}/todos`, {text});
    return response.data;
};

// Удаление
export const deleteTodo = async (id: number) => {
    await axios.delete(`${API_URL}/todos/${id}`);
};

//Обновление
export const updateTodo = async (id: number, updates: { text?: string; completed?: boolean }) => {
  const response = await axios.put(`${API_URL}/todos/${id}`, updates);
  return response.data;
};

// Переключение статуса выполнения
export const toggleTodo = async (id: number) => {
  const response = await axios.patch(`${API_URL}/todos/${id}/toggle`);
  return response.data;
};