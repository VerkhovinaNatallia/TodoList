import React, { useState,useEffect } from 'react';
import type { Todo } from '../../types/Todo'

import AddTodo from '../AddTodo/AddTodo';
import TodoItem from '../TodoItem/TodoItem';
import PaginationBlock from '../Pagination/Pagination';
import styled from 'styled-components';
import { saveTodos } from '../../utils/localStorage';
import { createTodo, fetchTodos } from '../../api/todos';



const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage, setTasksPerPage] = useState(5);

  // const [page, setPage] = useState(1);

  // Загрузка задач с сервера
useEffect(() => {
  fetchTodos(currentPage)
    .then(data => setTodos(data))
    .catch(err => console.error('Ошибка загрузки задач:', err));
}, [currentPage]);

  // Сохраняем изменения
  useEffect(() => {
    if (isInitialLoad) {
      setIsInitialLoad(false);
      return;
    }
    saveTodos(todos);
  }, [todos, isInitialLoad]);

 const addTodo = async (text: string) => {
  const newTodo = await createTodo(text);
  setTodos(prev => [newTodo, ...prev]);
};

  const indexOfLast = currentPage * tasksPerPage;
  const indexOfFirst = indexOfLast - tasksPerPage;
  const currentTodos = todos.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(todos.length / tasksPerPage);

  return (
    <Wrapper>
      <h1>Список задач</h1>
      <AddTodo onAdd={addTodo} />
      <TodoItem todos={currentTodos} setTodos={setTodos} />
      <PaginationBlock
        currentPage={currentPage}
        totalPages={totalPages}
        tasksPerPage={tasksPerPage}
        onPageChange={(value) => setCurrentPage(value)}
        onLimitChange={(value) => {
          setTasksPerPage(value);
          setCurrentPage(1);
        }}
      />
    </Wrapper>
  );
};

export default TodoList;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`