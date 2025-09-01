import { type FC } from "react";

import { Container } from './TodoList.style';
import { useTodoListLogic } from "@/hooks/useTodosLogic";
import { useAppDispatch } from "@/store/store";
import { fetchTodos } from "@/store/todos/todosSlice";
import {TodoItem, PaginationControls, AddTodo} from "@/components";

export const TodoList: FC = () => {
  const dispatch = useAppDispatch();
  const {
    items: todos,
    isLoading,
    error,
    currentPage,
    totalPages,
    itemsPerPage,
    totalCount,
    handleAddTodo,
    handlePageChange,
    handleItemsPerPageChange,
  } = useTodoListLogic();

  if (error) {
    return (
      <Container>
        <div className="errormessage">{error}</div>
        <button className="retry" onClick={() => dispatch(fetchTodos())}>
          Повторить попытку
        </button>
      </Container>
    );
  }

  return (
    <Container>
      <h1>Список задач</h1>
      <AddTodo onAdd={handleAddTodo} />

      {isLoading ? (
        <div className="loading">
          <p>Загрузка задач...</p>
        </div>
      ) : todos.length === 0 ? (
        <div className="emptyTodos">
          <h2>Нет задач</h2>
          <p>Начните с добавления новой задачи</p>
        </div>
      ) : (
        <>
          <ul className="todos__conteiner">
            {todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </ul>

          {/* {totalCount > 1 && ( */}
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            totalCount={totalCount}
            isLoading={isLoading}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
          {/* )} */}
        </>
      )}
    </Container>
  );
};


