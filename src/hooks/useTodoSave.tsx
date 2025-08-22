import { useState } from 'react';
import { useAppDispatch } from '@/store/store';
import { type Todo } from '../store/todosSlice';
import { updateTodo } from '@/store/todosSlice';

export const useTodoSave = (todo: Todo) => {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSave = () => {
    if (editText.trim() !== '') {
      dispatch(updateTodo({ 
        id: todo.id, 
        updates: { text: editText } 
      }));
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
    setIsEditing
  };
};