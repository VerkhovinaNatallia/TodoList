import { useState } from "react";

import type { Todo } from "../types/types";
import { useAppDispatch } from "../store/store";
import { updateTodo } from "../store/todos/todosSlice";

export const useTodoSave = (todo: Todo) => {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSave = () => {
    if (editText.trim() !== "") {
      dispatch(
        updateTodo({
          id: todo.id,
          updates: { text: editText },
        })
      );
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  return {
    isEditing,
    editText,
    setEditText,
    handleSave,
    handleCancelEdit,
    setIsEditing,
  };
};
