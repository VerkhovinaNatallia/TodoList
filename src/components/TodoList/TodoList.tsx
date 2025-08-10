import React, { useEffect} from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../store/store';
import {
  fetchTodos,
  createTodo,
  setCurrentPage,
  setItemsPerPage,
} from '../../store/todosSlice';
import AddTodo from '../AddTodo/AddTodo';
import TodoItem from '../TodoItem/TodoItem';
import PaginationControls from '../TodoPagination/TodoPagination';
import type { SelectChangeEvent } from '@mui/material';


const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    items: todos,
    isLoading,
    error,
    currentPage,
    totalPages,
    itemsPerPage,
    totalCount,
  } = useAppSelector((state) => state.todos);

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
  }, [dispatch, currentPage, itemsPerPage]);



  const handleAddTodo = async (text: string) => {
    if (!text.trim()) return;
    
    try {
      await dispatch(createTodo(text)).unwrap();
      
      if (currentPage !== 1) {
        dispatch(setCurrentPage(1));
      }
    } catch (err) {
      console.error('Ошибка при добавлении:', err);
    }
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    dispatch(setCurrentPage(page));
  };

  const handleItemsPerPageChange = (event: SelectChangeEvent<number>) => {
    dispatch(setItemsPerPage(Number(event.target.value)));
    dispatch(setCurrentPage(1));
  };

  if (error) {
    return (
      <Container>
        <div className='errormessage'>
          {error}
        </div>
        <button className='retry'
          onClick={() => dispatch(fetchTodos())}
        >
          Повторить попытку
        </button>
      </Container>
    );
  }

  return (
    <Container>
      <h1>Список задач</h1>

      <AddTodo onAdd={handleAddTodo} />

      {isLoading ? (
        <div className='loading'>
          <p>Загрузка задач...</p>
        </div>
      ) : todos.length === 0 ? (
        <div className = 'emptyTodos'>
          <h2>Нет задач</h2>
          <p>Начните с добавления новой задачи</p>
        </div>
      ) : (
        <>

          <ul className='todos__conteiner'>
            {todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </ul>

          {totalCount > 1 && (
            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              itemsPerPage={itemsPerPage}
              totalCount={totalCount}
              isLoading={isLoading}
              onPageChange={handlePageChange}
              onItemsPerPageChange={handleItemsPerPageChange}
            />
          )}
        </>
      )}
    </Container>
  );
};

export default TodoList;


const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  hi{
      text-align: center;
      font-size: 24px;
      margin-bottom: 20px;
      color: #333;
  }
  .sort__conteiner{
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
    .sort__btn{
        padding: 8px 16px;
        border: 1px solid #ccc;
        background-color: #f5f5f5;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 8px;
        border-radius: 4px;
        transition: all 0.2s;
        span{
          font-size: 18px;
        }
    }
  }
  .loading{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 0;
    gap: 10px;
  }
  .emptyTodos{
    background-color: #f9f9f9;
    padding: 20px;
    text-align: center;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    h2{
        margin-bottom: 10px;
        font-size: 18px;
        color: #333;
    }p{
      color: #666;
    }
    }
  .todos__conteiner{
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .errormessage{
      padding: 15px;
      margin-bottom: 20px;
      background-color: #f8d7da;
      color: #721c24;
      border: 1px solid #f5c6cb;
      border-radius: 4px;
      .retry{
        padding: 8px 16px;
        background-color: #dc3545;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.2s;

        &:hover {
          background-color: #c82333;
  }
      }
  }
`;

