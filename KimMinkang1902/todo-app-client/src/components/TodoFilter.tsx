import React from "react";
import styled from "styled-components";
import TodoStore from "../stores/todo";
import { observer } from "mobx-react";

const StyledFilter = styled.li`
  margin: 0 5px;
  list-style: none;
`;

const StyledButton = styled.button`
  outline: none;
  color: #ebedee;
  font-weight: 700;
  width: 100%;
  padding: 12px;
  border-radius: 3px;
  background-color: #cfd3d6;
  font-size: 0.6rem;
  color: white;
  border: 0;
  cursor: pointer;

  &:hover {
    background-color: #acb4b9;
  }
  &.active {
    background-color: #7f8a93;
  }
`;

interface TodoFilterProps {
  name: string;
  todoStore: TodoStore;
}

const TodoFilter: React.FC<TodoFilterProps> = observer(({ name, todoStore }) => {
  const handleOnClick = () => {
    todoStore.filter = name;
  };

  return (
    <StyledFilter onClick={handleOnClick}>
      <StyledButton type="button" className={todoStore.filter === name ? "active" : ""}>
        {name.toUpperCase()}
      </StyledButton>
    </StyledFilter>
  );
});

export default TodoFilter;
