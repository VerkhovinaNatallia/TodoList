import React, { useState } from 'react';
import type {Todo}  from '../../types/Todo';
import EditTodo from '../EditTodo/EditTodo';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeHooks/useTheme';


interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoItem: React.FC<Props> = ({ todos, setTodos }) => {
    const { theme } = useTheme();
  const [editId, setEditId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');
  const [sortOrder, setSortOrder] = useState<'new' | 'old'>('new');

  const toggleComplete = (id: number) => {
    //выполненая задача(статус)
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const startEdit = (id: number, text: string) => {
    setEditId(id);
    setEditText(text);
  };

  const saveEdit = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: editText } : todo
    ));
    setEditId(null);
    setEditText('');
  };

  const sortedTodos = [...todos].sort((a, b) =>
    sortOrder === 'new'
      ? b.createdAt.getTime() - a.createdAt.getTime()
      : a.createdAt.getTime() - b.createdAt.getTime()
  );

  return (
    <Wrapper theme={theme}>
      <select onChange={(e) => setSortOrder(e.target.value as 'new' | 'old')}>
        <option value="new">Новые сначала</option>
        <option value="old">Старые сначала</option>
      </select>

      <ul>
        {sortedTodos.map(todo => (
          <li key={todo.id}>
            {editId === todo.id ? (
  <EditTodo
    text={editText}
    onChange={setEditText}
    onSave={() => saveEdit(todo.id)}
  />
) : (
              <>
                <span
                  onClick={() => toggleComplete(todo.id)}
                  style={{
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    cursor: 'pointer',
                  }}
                >
                  {todo.text}
                </span>
                <button onClick={() => startEdit(todo.id, todo.text)}>Редактировать</button>
                <button onClick={() => deleteTodo(todo.id)}>Удалить</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </Wrapper>
  );
};

export default TodoItem;


interface ThemeProps {
  theme: 'light' | 'dark';
}

export const Wrapper = styled.div<ThemeProps>`
  padding: 24px;
  border-radius: 12px;
  max-width: 600px;
  margin: 0 auto;
  box-shadow: ${({ theme }) =>
    theme === 'dark' ? '0 4px 12px rgba(255, 255, 255, 0.1)' : '0 4px 12px rgba(0, 0, 0, 0.1)'};
  background-color: ${({ theme }) => (theme === 'dark' ? '#1e1e1e' : '#f9f9f9')};
  color: ${({ theme }) => (theme === 'dark' ? '#f0f0f0' : '#333')};

  select {
    margin-bottom: 20px;
    padding: 8px 12px;
    font-size: 16px;
    border-radius: 8px;
    border: 1px solid ${({ theme }) => (theme === 'dark' ? '#444' : '#ccc')};
    background-color: ${({ theme }) => (theme === 'dark' ? '#2c2c2c' : '#fff')};
    color: ${({ theme }) => (theme === 'dark' ? '#ddd' : '#333')};
    outline: none;
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: ${({ theme }) => (theme === 'dark' ? '#2a2a2a' : '#fff')};
      padding: 12px 16px;
      border-radius: 10px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);

      span {
        flex-grow: 1;
        font-size: 16px;
        cursor: pointer;
        color: ${({ theme }) => (theme === 'dark' ? '#ccc' : '#333')};
        word-break: break-all;

        &.completed {
          text-decoration: line-through;
          color: ${({ theme }) => (theme === 'dark' ? '#666' : '#999')};
        }
      }

      button {
        margin-left: 8px;
        padding: 6px 10px;
        font-size: 14px;
        border: none;
        border-radius: 6px;
        cursor: pointer;

        &:first-of-type {
          background-color: #4caf50;
          color: white;

          &:hover {
            background-color:#1976d2;
          }
        }

        &:last-of-type {
          background-color: #f44336;
          color: white;

          &:hover {
            background-color:#1976d2;
          }
        }
      }
    }
  }
`;
