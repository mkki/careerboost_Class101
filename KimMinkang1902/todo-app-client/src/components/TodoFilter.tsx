import React from "react";
import styled from "styled-components";
import { useStores } from "../stores";
import TodoStore from "../stores/todo";
import { GET_FOLDER_WITH_TODOS } from "../queries";
import { useQuery } from "@apollo/react-hooks";

const StyledTodoFilter = styled.div`
  display: flex;
  max-width: 400px;
  justify-content: space-around;
  color: #5f6e78;
  font-weight: 700;
  margin: 15px auto;
`;

const StyledButtonWrap = styled.div`
  margin: 0 10px;
  width: 80px;
`;

const StyledButton = styled.button`
  outline: none;
  color: #ebedee;
  font-weight: 700;
  width: 100%;
  padding: 12px 0;
  border-radius: 3px;
  background-color: #cfd3d6;
  font-size: 0.8rem;
  color: white;
  border: 0;
  cursor: pointer;

  &:hover {
    background-color: #acb4b9;
  }
  &:active {
    background-color: #7f8a93;
  }
`;

interface TodoFilterProps {
  todoStore: TodoStore;
}

const TodoFilter: React.FC<TodoFilterProps> = ({ todoStore }) => {
  const folderId = todoStore.folderId;
  const { data } = useQuery(GET_FOLDER_WITH_TODOS, {
    variables: { id: folderId }
  });

  const activeHandler = () => {
    todoStore.initialize(folderId, data.folder.title, data.folder.todos);
    todoStore.filterActiveTodo();
  };
  const doneHandler = () => {
    todoStore.initialize(folderId, data.folder.title, data.folder.todos);
    todoStore.filterDoneTodo();
  };

  const likeHandler = () => {
    todoStore.initialize(folderId, data.folder.title, data.folder.todos);
    todoStore.filterBookmarkedTodo();
  };

  return (
    <StyledTodoFilter>
      <StyledButtonWrap onClick={activeHandler}>
        <StyledButton type="button">Active</StyledButton>
      </StyledButtonWrap>
      <StyledButtonWrap onClick={doneHandler}>
        <StyledButton type="button">Done</StyledButton>
      </StyledButtonWrap>
      <StyledButtonWrap onClick={likeHandler}>
        <StyledButton type="button">Like</StyledButton>
      </StyledButtonWrap>
    </StyledTodoFilter>
  );
};

export default TodoFilter;
