import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  createTodoApi,
  deleteTodoApi,
  fetchTodosApi,
  toggleTodoApi,
  updateTodoApi,
} from "./todosAPI";
import type { Todo, TodosState } from "../../types/types";
import type { RootState } from "../store";

const initialState: TodosState = {
  items: [],
  isLoading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  itemsPerPage: 10,
  totalCount: 0,
};

export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const { currentPage, itemsPerPage } = state.todos;
      return await fetchTodosApi(currentPage, itemsPerPage);
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      return rejectWithValue(
        error.response?.data?.message ||
          (err instanceof Error ? err.message : "Unknown error")
      );
    }
  }
);
export const createTodo = createAsyncThunk(
  "todos/createTodo",
  async (text: string, { rejectWithValue }) => {
    try {
      const response = await createTodoApi(text);
      return response;
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      return rejectWithValue(
        error.response?.data?.message ||
          (err instanceof Error ? err.message : "Unknown error")
      );
    }
  }
);

export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (id: number, { rejectWithValue }) => {
    try {
      await deleteTodoApi(id);
      return id;
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      return rejectWithValue(
        error.response?.data?.message ||
          (err instanceof Error ? err.message : "Unknown error")
      );
    }
  }
);

export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async (
    { id, updates }: { id: number; updates: Partial<Todo> },
    { rejectWithValue }
  ) => {
    try {
      const response = await updateTodoApi(id, updates);
      return response;
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      return rejectWithValue(
        error.response?.data?.message ||
          (err instanceof Error ? err.message : "Unknown error")
      );
    }
  }
);

export const toggleTodo = createAsyncThunk(
  "todos/toggleTodo",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await toggleTodoApi(id);
      return response;
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      return rejectWithValue(
        error.response?.data?.message ||
          (err instanceof Error ? err.message : "Unknown error")
      );
    }
  }
);

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setItemsPerPage(state, action: PayloadAction<number>) {
      state.itemsPerPage = action.payload;
      state.currentPage = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.data || [];
        state.totalCount = action.payload.pagination?.total || 0;
        state.currentPage = action.payload.pagination?.page || 1;
        state.itemsPerPage =
          action.payload.pagination?.limit || state.itemsPerPage;
        state.totalPages = action.payload.pagination?.totalPages || 1;

        console.log("Fetched todos:", {
          received: action.payload.pagination,
          currentState: state,
        });
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(createTodo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = [action.payload, ...state.items];
        state.totalCount += 1;
        state.totalPages = Math.ceil(state.totalCount / state.itemsPerPage);
      })
      .addCase(createTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteTodo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = state.items.filter((todo) => todo.id !== action.payload);
        state.totalCount -= 1;
        state.totalPages = Math.ceil(state.totalCount / state.itemsPerPage);
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(updateTodo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.items.findIndex(
          (todo) => todo.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = { ...state.items[index], ...action.payload };
        }
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(toggleTodo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(toggleTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.items.findIndex(
          (todo) => todo.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(toggleTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, setCurrentPage, setItemsPerPage } =
  todosSlice.actions;
export default todosSlice.reducer;
