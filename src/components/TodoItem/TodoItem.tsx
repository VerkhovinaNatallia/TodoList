import {  type FC } from 'react';
import { useAppDispatch } from '@/store/store';
import { toggleTodo, deleteTodo} from '@/store/todosSlice';
import { type Todo } from '../../store/todosSlice';
import EditTodo from '@/components/EditTodo/EditTodo';
import styled from 'styled-components';
import { useTheme } from '@/context/ThemeHooks/useTheme';
import { useTodoSave} from '@/hooks/useTodoSave';

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: FC<TodoItemProps> = ({ todo }) => {
  const dispatch = useAppDispatch();
  const {theme} = useTheme();
  const {
    isEditing,
    editText,
    setEditText,
    handleSave,
    setIsEditing
  } = useTodoSave(todo);
  return (
    <Wrapper theme = {theme}>
      {isEditing ? (
        <EditTodo
          text={editText}
          onChange={setEditText}
          onSave={handleSave}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <>
          <div>
            <TodoText theme={theme} $completed={todo.completed}
              onClick={() => dispatch(toggleTodo(todo.id))
                
              }
            >
              {todo.text}
            </TodoText>
          </div>
          <div className='btn--block'>
            <button className='btn--edit'
            
              onClick={() => {
                setIsEditing(true);
                setEditText(todo.text);
              }}
            >
              Редактировать

            </button>
            <button className='btn--delete'
              onClick={() => dispatch(deleteTodo(todo.id))}
            >
              Удалить
            </button>
            </div>
        </>
      )}
      </Wrapper>
  );
};

export default TodoItem;

interface ThemeProps {
  theme: 'light' | 'dark';
}

interface TodoTextProps extends ThemeProps {
  $completed: boolean;
}


const TodoText = styled.span<TodoTextProps>`
  margin-left: 8px;
  text-decoration: ${(props) => (props.$completed ? 'line-through' : 'none')};
  color: ${(props) => {
    if (props.$completed) {
      return props.theme === 'dark' ? '#666' : '#999';
    }
    return props.theme === 'dark' ? '#ccc' : '#000';
  }};
`;

export const Wrapper = styled.div<ThemeProps>`
  margin-bottom: 12px;
  display: flex;
  height: 80px;
  align-items: center;
  justify-content: space-between;border: 1px solid ${({ theme }) => (theme === 'dark' ? '#555' : '#ccc')};
  background-color: ${({ theme }) => (theme === 'dark' ? '#2c2c2c' : '#fff')};
  color: ${({ theme }) => (theme === 'dark' ? '#eee' : '#333')};
  padding: 12px 16px;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  
  .btn--block{
      
       .btn--edit,.btn--delete{
        margin-left: 8px;
        padding: 12px 20px;
        font-size: 14px;
        border: none;
        border-radius: 6px;
        cursor: pointer;
       }
        .btn--edit{
          background-color: #4caf50;
          color: white;

          &:hover {
            background-color:#1976d2;
          }
        }
        .btn--delete{
          background-color: #f44336;
          color: white;

          &:hover {
            background-color:#1976d2;
          }
        }
      }
`;

