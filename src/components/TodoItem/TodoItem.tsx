import { type FC } from "react";
import type { Todo } from "@/types/types";
import { useTodoSave } from "@/hooks/useTodoSave";
import {EditTodo} from "@/components";
import { useTheme } from "@/context";
import { useAppDispatch } from "@/store/store";
import { deleteTodo, toggleTodo } from "@/store/todos/todosSlice";
import { TodoText, Wrapper } from './TodoItem.styles'
interface TodoItemProps {
  todo: Todo;
}

export const TodoItem: FC<TodoItemProps> = ({ todo }) => {
  const dispatch = useAppDispatch();
  const { theme } = useTheme();
  const { isEditing, editText, setEditText, handleSave, setIsEditing } =
    useTodoSave(todo);
  return (
    <Wrapper theme={theme}>
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
            <TodoText
              theme={theme}
              $completed={todo.completed}
              onClick={() => dispatch(toggleTodo(todo.id))}
            >
              {todo.text}
            </TodoText>
          </div>
          <div className="btn--block">
            <button
              className="btn--edit"
              onClick={() => {
                setIsEditing(true);
                setEditText(todo.text);
              }}
            >
              Редактировать
            </button>
            <button
              className="btn--delete"
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

