import { type FC } from "react";
import TodoList from "../components/TodoList/TodoList";

const HomePage: FC = () => {
  return (
    <div className="home-page">
      <h1>Добро пожаловать!</h1>
      <p>Это ваша личная страница с задачами.</p>
      <TodoList />
    </div>
  );
};

export default HomePage;
