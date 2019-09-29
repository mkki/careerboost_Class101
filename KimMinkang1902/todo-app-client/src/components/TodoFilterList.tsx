import React from "react";
import styled from "styled-components";
import TodoStore from "../stores/todo";
import { observer } from "mobx-react";
import { FilterType } from "../constants";
import TodoFilter from "./TodoFilter";

const StyledTodoFilterListContainer = styled.section`
  padding: 5px;
`;

const StyledTodoFilterList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  max-width: 400px;
  justify-content: space-around;
  color: #5f6e78;
  font-weight: 700;
  margin: 15px auto;
  padding: 0;
`;

interface TodoFilterListProps {
  todoStore: TodoStore;
}

const TodoFilterList: React.FC<TodoFilterListProps> = observer(({ todoStore }) => {
  return (
    <StyledTodoFilterListContainer>
      <StyledTodoFilterList>
        {Object.values(FilterType).map((filter: string) => (
          <TodoFilter name={filter} todoStore={todoStore} key={filter} />
        ))}
      </StyledTodoFilterList>
    </StyledTodoFilterListContainer>
  );
});

export default TodoFilterList;
