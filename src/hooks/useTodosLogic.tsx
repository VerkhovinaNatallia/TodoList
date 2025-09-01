import type { SelectChangeEvent } from "@mui/material";
import { useEffect, type ChangeEvent, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  createTodo,
  fetchTodos,
  setCurrentPage,
  setItemsPerPage,
} from "@/store/todos/todosSlice";

export const useTodoListLogic = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.todos);

  const totalPages = useMemo(() => {
    return Math.ceil(state.totalCount / state.itemsPerPage) || 1;
  }, [state.totalCount, state.itemsPerPage]);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch, state.currentPage, state.itemsPerPage]);

  const handleAddTodo = async (text: string) => {
    if (!text.trim()) return;

    try {
      await dispatch(createTodo(text)).unwrap();
      if (state.currentPage !== 1) {
        dispatch(setCurrentPage(1));
      }
    } catch (err) {
      console.error("Ошибка при добавлении:", err);
    }
  };

  const handlePageChange = (_: ChangeEvent<unknown>, page: number) => {
    if (page < 1 || page > totalPages) return;
    dispatch(setCurrentPage(page));
  };

  const handleItemsPerPageChange = (event: SelectChangeEvent<number>) => {
    const newItemsPerPage = Number(event.target.value);
    dispatch(setItemsPerPage(newItemsPerPage));
    dispatch(setCurrentPage(1));
  };

  return {
    ...state,
    totalPages,
    handleAddTodo,
    handlePageChange,
    handleItemsPerPageChange,
  };
};
