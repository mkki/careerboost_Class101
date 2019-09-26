import React from "react";
import styled from "styled-components";
import TodoStore from "../stores/todo";
import TodoInput from "./TodoInput";
import TodoItem from "./TodoItem";
import { observer } from "mobx-react";
import { Todo } from "../models";
import TodoFilter from "./TodoFilter";

const StyledTodoList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 1010px;
  width: 100%;
  margin: 20px auto;
  text-align: center;
`;

const StyledFolderTitle = styled.div`
  margin-bottom: 15px;
  color: #005da0;
  font-size: 1.5rem;
  font-weight: 700;
`;

interface TodoListProps {
  todoStore: TodoStore;
}

const TodoList: React.FC<TodoListProps> = observer(({ todoStore }) => {
  return (
    <StyledTodoList>
      <TodoFilter todoStore={todoStore} />
      <StyledFolderTitle>{todoStore.folderTitle}</StyledFolderTitle>
      <TodoInput folderId={todoStore.folderId} newTodo={todoStore.newTodo} />

      {todoStore.todos.map((todo: Todo) => (
        <TodoItem
          {...todo}
          key={todo.id}
          editTodoStat={todoStore.editTodoStat}
          editTodoText={todoStore.editTodoText}
          deleteTodo={todoStore.deleteTodo}
        />
      ))}
    </StyledTodoList>
  );
});

export default TodoList;
