import { type ChangeEvent, type FC } from "react";
import {
  Box,
  Typography,
  Pagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { type SelectChangeEvent } from "@mui/material/Select";
interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalCount: number;
  isLoading: boolean;
  onPageChange: (event: ChangeEvent<unknown>, page: number) => void;
  onItemsPerPageChange: (event: SelectChangeEvent<number>) => void;
}

const PaginationControls: FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  itemsPerPage,
  totalCount,
  isLoading,
  onPageChange,
  onItemsPerPageChange,
}) => {
  const handleItemsPerPageChange = (event: SelectChangeEvent<number>) => {
    onItemsPerPageChange(event);
  };
  console.log(totalCount);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 2,
        mt: 2,
      }}
    >
      <Typography variant="body2" color="text.secondary">
        всего {Math.ceil(totalCount / itemsPerPage)} страниц
      </Typography>

      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={onPageChange}
        color="primary"
        disabled={isLoading}
        showFirstButton
        showLastButton
        sx={{ flexGrow: 1, justifyContent: "center" }}
      />

      <FormControl size="small" disabled={isLoading} sx={{ minWidth: 120 }}>
        <InputLabel>На странице</InputLabel>
        <Select
          value={itemsPerPage}
          label="На странице"
          onChange={handleItemsPerPageChange}
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default PaginationControls;
