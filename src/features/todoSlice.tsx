import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
//createSlice - упрощает создание редюсера и экшенов.
//createAsyncThunk-позволяет выполнять асинхронные запросы

type TodoState = {//тип состояния
  tasks: string[];//массив задач
  page: number;//текущая страница
  limit: number;//сколько задач на странице 
  totalPages: number;//сколько всего страниц
  loading: boolean;//идет ли загрузка
  error: string | null;//сообшение об ошибке(если есть)
};

// Асинхронный thunk для получения задач(для загрузки задач)
export const fetchTasks = createAsyncThunk(
  'todos/fetchTasks',
  //принимает page и limit
  async ({ page, limit }: { page: number; limit: number }) => {
    
    const allTasks = ['Задача 1', 'Задача 2', 'Задача 3', 'Задача 4', 'Задача 5', 'Задача 6'];
    const start = (page - 1) * limit;
    //получает нужную порцию задач 
    const paginatedTasks = allTasks.slice(start, start + limit);
    //вычислени общего количкства страниц
    const totalPages = Math.ceil(allTasks.length / limit);
    //возращает массив задач(tasks) и сколько всего страниц(totalPage)
    return { tasks: paginatedTasks, totalPages };
  }
);

//Начальное состояние 
const initialState: TodoState = {
  tasks: [],
  page: 1,
  limit: 10,
  totalPages: 1,
  loading: false,
  error: null,
};


//Слайс с экшенами 
export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {//обычгые экшены
    setPage(state, action) {//мепняет текущую страницу
      state.page = action.payload;
    },
    setLimit(state, action) {//меняет лимит задач и сбрасывает на первую
      state.limit = action.payload;
      state.page = 1;
    },
  },
  extraReducers(builder) {//обрабатывает стадии асинхронного fetchTasks:
    builder
    //начинается загрузка → показываем спиннер
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      //загрузка прошла успешно → сохраняем задачи и страницы.
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload.tasks;
        state.totalPages = action.payload.totalPages;
      })
      //произошла ошибка → показываем сообщение об ошибке.
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка при загрузке задач';
      });
  },
});

export const { setPage, setLimit } = todoSlice.actions;
export default todoSlice.reducer;
