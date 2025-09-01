import { type FC } from "react";
import { TextField, Button, Box } from "@mui/material";

interface EditTodoProps {
  text: string;
  onChange: (value: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

export const EditTodo: FC<EditTodoProps> = ({
  text,
  onChange,
  onSave,
  onCancel,
}) => {
  return (
    <Box sx={{ display: "flex", gap: 1, width: "100%" }}>
      <TextField
        value={text}
        onChange={(e) => onChange(e.target.value)}
        fullWidth
        autoFocus
        variant="outlined"
        size="small"
      />
      <Button variant="contained" color="success" onClick={onSave}>
        Сохранить
      </Button>
      <Button variant="outlined" color="error" onClick={onCancel}>
        Отмена
      </Button>
    </Box>
  );
};

