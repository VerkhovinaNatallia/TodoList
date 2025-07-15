import styled from 'styled-components';
import { useTheme } from '../../context/ThemeHooks/useTheme';


interface EditTodoProps {
  text: string;
  onChange: (value: string) => void;
  onSave: () => void;
}

const EditTodo: React.FC<EditTodoProps> = ({ text, onChange, onSave }) => {
    const { theme } = useTheme();
    return(
      <Container theme={theme}>
        <input
          value={text}
          onChange={(e) => onChange(e.target.value)}
        />
        <button onClick={onSave}>Сохранить</button>
      </Container>
);
}

export default EditTodo;

interface ThemeProps {
  theme: 'light' | 'dark';
}


const Container = styled.div<ThemeProps>`
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 10px;
  width:100%;
    input{
        flex-grow: 1;
        padding: 8px 12px;
        font-size: 16px;
        border-radius: 8px;
        border: 1px solid ${({ theme }) => (theme === 'dark' ? '#555' : '#ccc')};
        background-color: ${({ theme }) => (theme === 'dark' ? '#2c2c2c' : '#fff')};
        color: ${({ theme }) => (theme === 'dark' ? '#eee' : '#333')};
        &:focus {
            outline: none;
            border-color: ${({ theme }) => (theme === 'dark' ? '#888' : '#888')};
        }
    }
     }
`;


