import { useState, type FC } from "react";
import {Container} from './AddTodo.styles'

interface Props {
  onAdd: (text: string) => void;
}



export const AddTodo: FC<Props> = ({ onAdd }) => {
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const handleAdd = () => {
    if (text.trim() === "") {
      setError("Поле не может быть пустым");
      return;
    }
    setError("");
    onAdd(text.trim());
    setText("");
  };

  return (
    <Container>
      <div>
        <input
          type="text"
          placeholder="Введите задачу"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={handleAdd}>Добавить</button>
      </div>
      {error ? <p>{error}</p> : null}
    </Container>
  );
};


