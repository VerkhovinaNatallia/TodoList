import React from 'react';
import Pagination from '@mui/material/Pagination';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  tasksPerPage: number;
  onPageChange: (value: number) => void;
  onLimitChange: (value: number) => void;
}

const PaginationBlock: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  tasksPerPage,
  onPageChange,
  onLimitChange,
}) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" marginTop="1rem">
      <Select
        value={tasksPerPage}
        onChange={(e) => onLimitChange(Number(e.target.value))}
        sx={{ marginBottom: '1rem' }}
      >
        <MenuItem value={5}>5</MenuItem>
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={20}>20</MenuItem>
      </Select>

      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(e, value) => onPageChange(value)}
      />
      <Typography variant="body2" sx={{ marginTop: '0.5rem' }}>
    Всего страниц: {totalPages}
  </Typography>
    </Box>
  );
};

export default PaginationBlock;
