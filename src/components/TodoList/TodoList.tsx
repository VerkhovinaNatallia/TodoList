import React, { useState,useEffect } from 'react';
import type { Todo } from '../../types/Todo'

import AddTodo from '../AddTodo/AddTodo';
import TodoItem from '../TodoItem/TodoItem';
import styled from 'styled-components';
import { loadTodos, saveTodos } from '../../utils/localStorage';



const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  //флаг, что бы отлечить первую зарузку от последующих
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  

//пераый редер
  useEffect(() => {
    setTodos(loadTodos());
  }, []);

  useEffect(() => {
    if (isInitialLoad) {
      setIsInitialLoad(false);
      return;
    }
    saveTodos(todos);
  }, [todos,isInitialLoad]);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),// возращает количество миллисекунд 
      text,
      completed: false,
      createdAt: new Date(),
    };
    setTodos([newTodo, ...todos]);
  };

  return (
    <Wrapper>
      <h1>Список задач</h1>
      <AddTodo onAdd={addTodo} />
      <TodoItem todos={todos} setTodos={setTodos} />
    </Wrapper>
  );
};

export default TodoList;

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`