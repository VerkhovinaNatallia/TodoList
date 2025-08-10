import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { fetchTodosApi, createTodoApi, deleteTodoApi, updateTodoApi, toggleTodoApi } from '../api/todos';

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodosState {
  items: Todo[];
  isLoading: boolean;
  error: string | null;
  currentPage: number;    
  totalPages: number;     
  itemsPerPage: number;   
  totalCount: number;     
}

const initialState: TodosState = {
  items: [],
  isLoading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  itemsPerPage: 5,
  totalCount: 0,
};

//загрузки задач
export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { todos: TodosState };
      const { currentPage, itemsPerPage} = state.todos;
      return await fetchTodosApi(currentPage, itemsPerPage);
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : 'Unknown error');
    }
  }
);
//создания задачи
export const createTodo = createAsyncThunk(
  'todos/createTodo',
  async (text: string, { rejectWithValue }) => {
    try {
      return await createTodoApi(text);
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : 'Unknown error');
    }
  }
);

//удаления задачи
export const deleteTodo = createAsyncThunk(
  'todos/deleteTodo',
  async (id: number, { rejectWithValue }) => {
    try {
      await deleteTodoApi(id);
      return id;
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : 'Unknown error');
    }
  }
);


//обновления задачи
export const updateTodo = createAsyncThunk(
  'todos/updateTodo',
  async ({ id, updates }: { id: number; updates: Partial<Todo> }, { rejectWithValue }) => {
    try {
      const response = await updateTodoApi(id, updates);
      return response;
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : 'Unknown error');
    }
  }
);

//переключения статуса задачи
export const toggleTodo = createAsyncThunk(
  'todos/toggleTodo',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await toggleTodoApi(id);
      return response;
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : 'Unknown error');
    }
  }
);

const todosSlice = createSlice({
  name: 'todos',
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
  state.items = action.payload.data;
  state.totalCount = action.payload.totalCount;
  state.currentPage = action.payload.page;
  state.itemsPerPage = action.payload.limit;
  state.totalPages = action.payload.totalPages;
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
        state.items = state.items.filter(todo => todo.id !== action.payload);
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
        const index = state.items.findIndex(todo => todo.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
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
        const index = state.items.findIndex(todo => todo.id === action.payload.id);
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

export const { 
  clearError, 
  setCurrentPage, 
  setItemsPerPage 
} = todosSlice.actions;
export default todosSlice.reducer;