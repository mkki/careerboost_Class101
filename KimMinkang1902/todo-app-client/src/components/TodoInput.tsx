import React, { useRef } from "react";
import { useMutation } from "@apollo/react-hooks";
import { ADD_TODO } from "../queries";
import { Todo } from "../models";
import styled from "styled-components";

const StyledInputContainer = styled.div`
  text-align: center;
`;

const StyledInput = styled.input`
  font-size: 16px;
  border: solid 1px #dbdbdb;
  border-radius: 3px;
  color: #262626;
  padding: 7px 33px;
  border-radius: 3px;
  color: #999;
  font-size: 14px;
  font-weight: 300;
  background: #fafafa;
`;

interface FolderInputProps {
  folderId: string;
  newTodo: (item: Todo) => any;
}

const TodoInput: React.FC<FolderInputProps> = ({ folderId, newTodo }) => {
  const inputRef = useRef<any>();

  const [addTodo] = useMutation(ADD_TODO);

  const handleKeyPress = async (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      const item: any = await addTodo({
        variables: { text: inputRef.current.value, folderId: folderId }
      });
      inputRef.current.value = "";

      const todo = item.data.addTodo;
      newTodo(new Todo(todo.id, todo.text, todo.folderId));
    }
  };

  return (
    <StyledInputContainer>
      <StyledInput placeholder="Add Todo" ref={inputRef} onKeyPress={handleKeyPress} />
    </StyledInputContainer>
  );
};

export default TodoInput;
