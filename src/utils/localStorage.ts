import type { Todo } from '../types/Todo';

const LOCAL_STORAGE_KEY = 'my-todos';

export const loadTodos = (): Todo[] => {
  try {
    const saved = localStorage.getItem('my-todos');
    const parsed: Todo[] = saved ? JSON.parse(saved) : [];

    return parsed.map(todo => ({
      ...todo,
      createdAt: new Date(todo.createdAt), //не умеет хранить дату как объект
    }));
  } catch (error) {
    console.error('Ошибка при загрузке задач из localStorage:', error);
    return [];
  }
};


export const saveTodos = (todos: Todo[]) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
    // преобразет массив задач в json, и сохраняет его по ключу  

  } catch (error) {
    console.error('Ошибка при сохранении задач в localStorage:', error);
  }
};
