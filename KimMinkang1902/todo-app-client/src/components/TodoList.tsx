import React from "react";
import styled from "styled-components";
import TodoStore from "../stores/todo";
import TodoInput from "./TodoInput";
import TodoItem from "./TodoItem";
import { observer } from "mobx-react";
import { Todo } from "../models";

const StyledTodoListContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 1010px;
  width: 100%;
  margin: 20px auto;
  text-align: center;
`;

const StyledFolderTitle = styled.h2`
  margin-bottom: 15px;
  color: #005da0;
  font-size: 1.5rem;
  font-weight: 700;
`;

const StyledTodoList = styled.ul`
  margin: 0 auto;
  padding: 0;
`;

interface TodoListProps {
  todoStore: TodoStore;
}

const TodoList: React.FC<TodoListProps> = observer(({ todoStore }) => {
  const filteredTodos = () => {
    const filter = todoStore.filter;
    if (filter === "active") return todoStore.activeTodos;
    if (filter === "done") return todoStore.doneTodos;
    if (filter === "bookmarked") return todoStore.bookmaredTodos;
    return todoStore.todos;
  };

  return (
    <StyledTodoListContainer>
      <StyledFolderTitle>{todoStore.folderTitle}</StyledFolderTitle>
      <TodoInput folderId={todoStore.folderId} newTodo={todoStore.newTodo} />

      <StyledTodoList>
        {filteredTodos().map((todo: Todo) => (
          <TodoItem
            {...todo}
            key={todo.id}
            editTodoStat={todoStore.editTodoStat}
            editTodoText={todoStore.editTodoText}
            deleteTodo={todoStore.deleteTodo}
          />
        ))}
      </StyledTodoList>
    </StyledTodoListContainer>
  );
});

export default TodoList;
