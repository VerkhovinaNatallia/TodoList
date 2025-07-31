import React, { useState, useEffect } from 'react';
import { Box, Typography, Select, MenuItem, Pagination} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<string[]>([]);
  //массив задач
  const [page, setPage] = useState<number>(1);
  //состаяние текущей страницы 
  const [limit, setLimit] = useState<number>(10);
  //задачи отображающиеся на одной старанице
  const [totalPages, setTotalPages] = useState<number>(1);
//сколько всего страниц
  useEffect(() => {
    const loadTasks = async () => {
      const { tasks, totalPages } = await fetchTasks(page, limit);
      setTasks(tasks);
      setTotalPages(totalPages);
    };
    loadTasks();
  }, [page, limit]);

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleLimitChange = (event: SelectChangeEvent) => {
      const newLimit = Number(event.target.value); // преобразование string → number
    setLimit(newLimit);
    setPage(1); // сброс на первую страницу при смене лимита
  };

  return (
    <Box sx={{ width: 400, margin: 'auto', mt: 5, textAlign: 'center' }}>
      <Typography variant="h6" gutterBottom>
        Список задач (страница {page} из {totalPages})
      </Typography>

      <Box sx={{ mb: 2 }}>
        {tasks.map(task => (
          <Typography key={task}>{task}</Typography>
        ))}
      </Box>

      <Pagination
        count={totalPages}
        page={page}
        onChange={handlePageChange}
        color="primary"
      />

      <Box sx={{ mt: 2 }}>
        <Typography variant="body1" component="span" sx={{ mr: 1 }}>
          Задач на странице:
        </Typography>
        <Select value={limit.toString()} onChange={handleLimitChange}>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
        </Select>
      </Box>
    </Box>
  );
};

export default TaskList;

// Пример функции fetchTasks для компиляции
async function fetchTasks(page: number, limit: number): Promise<{ tasks: string[]; totalPages: number }> {
  // Здесь может быть реальный API-запрос
  const allTasks = ['Задача 1', 'Задача 2', 'Задача 3', 'Задача 4', 'Задача 5', 'Задача 6'];
  const start = (page - 1) * limit;
  const paginatedTasks = allTasks.slice(start, start + limit);
  const totalPages = Math.ceil(allTasks.length / limit);
  return { tasks: paginatedTasks, totalPages };
}
