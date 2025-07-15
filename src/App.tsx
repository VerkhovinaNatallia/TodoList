import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import styled from 'styled-components';
import ThemeToggle from './components/ThemeToggle';
import { ThemeProvider } from './context/ThemeProvider/ThemeProvaider';
import { useTheme } from './context/ThemeHooks/useTheme';
import TodoList from './components/TodoList/TodoList';
import { useState } from 'react';



const lightTheme = { background: 'white', text: 'black' };
const darkTheme = { background: '#121212', text: 'white' };

type Theme = {
  background: string;
  text: string;
};

const AppContainer = styled.div<{ theme: Theme }>`
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
`;

const InnerApp = () => {
  const { theme } = useTheme();

  return (
    <StyledThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <AppContainer>
        <ThemeToggle />
        <TodoList/>
      </AppContainer>
    </StyledThemeProvider>
  );
};

const Counter =()=>{
   const [count, setCount] = useState(0);
   const ocClick = () => {
    setCount(count + 1);
    setCount(count + 1);
   }
   return(
    <>
        <p>{count}</p>
        <button onClick={ocClick}>+</button> 
    </>
   )
  
}


function App() {
  return (
    <ThemeProvider>
      <InnerApp />
      <Counter/>
    </ThemeProvider>
  );
}

export default App;
