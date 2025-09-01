import { type FC } from "react";
import {TodoList} from "@/components";

export const HomePage: FC = () => {
  return (
    <div className="home-page">
      <h1>Добро пожаловать!</h1>
      <p>Это ваша личная страница с задачами.</p>
      <TodoList />
    </div>
  );
};


