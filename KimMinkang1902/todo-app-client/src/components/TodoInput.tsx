import React, { useState } from "react";
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

interface TodoInputProps {
  folderId: string;
  newTodo: (item: Todo) => void;
}

const TodoInput: React.FC<TodoInputProps> = ({ folderId, newTodo }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [addTodo] = useMutation(ADD_TODO);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue) {
      const item = await addTodo({
        variables: { text: inputValue, folderId: folderId }
      });

      const todo = item.data.addTodo;
      newTodo(new Todo(todo.id, todo.text, todo.folderId));

      setInputValue("");
    }
  };

  return (
    <StyledInputContainer>
      <StyledInput
        type="text"
        placeholder="Add Todo"
        value={inputValue}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
    </StyledInputContainer>
  );
};

export default TodoInput;
