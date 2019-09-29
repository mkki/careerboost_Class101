import React, { useState } from "react";
import styled from "styled-components";
import { FaPen, FaStar } from "react-icons/fa";
import { EDIT_TODO_STAT, EDIT_TODO_TEXT } from "../queries";
import { useMutation } from "@apollo/react-hooks";
import { StatType } from "../constants";
import { observer } from "mobx-react";
import { TodoDeleteButton } from ".";

const StyledTodoItem = styled.li`
  display: flex;
  position: relative;
  font-size: 1.2rem;
  background-color: transparent;
  border: 1px solid rgba(0, 0, 0, 0.0975);
  min-width: 300px;
  justify-content: center;
  align-items: center;
  margin: 10px auto;
  height: 70px;
`;

const StyledIcon = styled.span`
  position: absolute;
  right: 10px;
  bottom: 10px;

  svg {
    cursor: pointer;
    width: 0.8rem;
    height: 0.8rem;
    margin-right: 10px;
  }
`;

const StyledText = styled.div`
  display: block;
  font-weight: 700;
  padding: 20px;
  cursor: pointer;
  text-decoration: none;
  color: #374047;

  &.done {
    text-decoration: line-through;
  }
`;

const StyledEditing = styled.input`
  position: absolute;
  top: 5px;
  left: 5px;
  font-size: 16px;
  border: solid 1px #dbdbdb;
  border-radius: 3px;
  padding: 7px 33px;
  border-radius: 3px;
  color: #999;
  font-size: 14px;
  font-weight: 300;
  background: #fafafa;
`;

interface TodoItemProps {
  id: string;
  text: string;
  stat: string;
  editTodoText: (id: string, text: string) => void;
  editTodoStat: (id: string, stat: string) => void;
  deleteTodo: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = observer(
  ({ id, text, stat, editTodoText, editTodoStat, deleteTodo }) => {
    const [editing, setEditing] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>("");

    const [editText] = useMutation(EDIT_TODO_TEXT);
    const [editStat] = useMutation(EDIT_TODO_STAT);

    const handleEditClick = () => {
      setEditing(true);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.currentTarget.value);
    };

    const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && inputValue) {
        const item = await editText({
          variables: { id: id, text: inputValue }
        });

        const todo = item.data.editTodo;
        editTodoText(todo.id, todo.text);

        setEditing(false);
      }
    };

    const handleToggleLike = async (e: React.MouseEvent) => {
      e.preventDefault();

      const editedStat = stat === StatType.BOOKMARKED ? StatType.ACTIVE : StatType.BOOKMARKED;

      const item = await editStat({
        variables: { id: id, stat: editedStat }
      });

      const todo = item.data.editTodo;
      editTodoStat(todo.id, todo.stat);
    };

    const handleToggleDone = async (e: React.MouseEvent) => {
      e.preventDefault();

      const editedStat = stat === StatType.DONE ? StatType.ACTIVE : StatType.DONE;

      const item = await editStat({
        variables: { id: id, stat: editedStat }
      });

      const todo = item.data.editTodo;
      editTodoStat(todo.id, todo.stat);
    };

    const renderTitle = () => {
      if (editing) {
        return (
          <StyledEditing
            type="text"
            value={inputValue}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
          />
        );
      }

      return (
        <StyledText className={stat === StatType.DONE ? "done" : ""} onClick={handleToggleDone}>
          {text}
        </StyledText>
      );
    };

    return (
      <StyledTodoItem>
        {renderTitle()}
        <StyledIcon>
          <FaPen onClick={handleEditClick} />
          <TodoDeleteButton id={id} deleteTodo={deleteTodo} />
          <FaStar
            onClick={handleToggleLike}
            color={stat === StatType.BOOKMARKED ? "#d7c938" : ""}
          />
        </StyledIcon>
      </StyledTodoItem>
    );
  }
);

export default TodoItem;
