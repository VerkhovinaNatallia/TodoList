export interface User {
  id: number;
  email: string;
  age?: number;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  status: "idle" | "loading" | "failed";
  error: string | null;
}

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface TodosState {
  items: Todo[];
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalCount: number;
}

export interface RootState {
  auth: AuthState;
  todos: TodosState;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  age?: number;
}

export interface CreateTodoData {
  text: string;
}

export interface UpdateTodoData {
  text?: string;
  completed?: boolean;
}

export interface ChangePasswordData {
  oldPassword: string;
  newPassword: string;
  confirmPassword?: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface PaginationInfo {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface TodosResponse {
  data: Todo[];
  pagination: PaginationInfo;
}

export interface SingleTodoResponse {
  todo: Todo;
}

export interface AxiosErrorResponse {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export interface ChangePasswordErrors {
  oldPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

export interface RegisterErrors {
  email?: string;
  password?: string;
  age?: string;
}
