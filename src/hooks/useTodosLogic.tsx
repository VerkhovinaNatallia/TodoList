import type { SelectChangeEvent } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../store/store';
import {
  fetchTodos,
  createTodo,
  setCurrentPage,
  setItemsPerPage,
} from '@/store/todosSlice';
import { useEffect, type ChangeEvent } from 'react';

export const useTodoListLogic = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.todos);

  useEffect(() => { 
    const loadData = async () => {
      try {
        await dispatch(fetchTodos()).unwrap();
      } catch (err) {
        console.error('Ошибка загрузки:', err);
      }
    };

    loadData();

    return () => {};
  }, [dispatch, state.currentPage, state.itemsPerPage]);

  const handleAddTodo = async (text: string) => {
    if (!text.trim()) return;
    
    try {
      await dispatch(createTodo(text)).unwrap();
      
      if (state.currentPage !== 1) {
        dispatch(setCurrentPage(1));
      }
    } catch (err) {
      console.error('Ошибка при добавлении:', err);
    }
  };

  const handlePageChange = (_: ChangeEvent<unknown>, page: number) => {
    dispatch(setCurrentPage(page));
  };

  const handleItemsPerPageChange = (event: SelectChangeEvent<number>) => {
    dispatch(setItemsPerPage(Number(event.target.value)));
    dispatch(setCurrentPage(1));
  };


  return {
    ...state,
    handleAddTodo,
    handlePageChange,
    handleItemsPerPageChange,
  };
};