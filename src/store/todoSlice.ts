import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTodos } from '../api/todos';

export const getTodos = createAsyncThunk(
  'todos/getTodos',
  async ({ page, limit, filter }: { page: number; limit: number; filter: string }) => {
    const data = await fetchTodos(page, limit, filter as any);
    return data;
  }
);

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

type State = {
  items: Todo[];
  page: number;
  limit: number;
  totalPages: number;
  filter: 'active' | 'completed' | 'all';
  loading: boolean;
  error: string | null;
};

const initialState: State = {
  items: [],
  page: 1,
  limit: 10,
  totalPages: 1,
  filter: 'all',
  loading: false,
  error: null,
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
    setLimit(state, action) {
      state.limit = action.payload;
    },
    setFilter(state, action) {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(getTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка загрузки';
      });
  },
});

export const { setPage, setLimit, setFilter } = todoSlice.actions;
export default todoSlice.reducer;
