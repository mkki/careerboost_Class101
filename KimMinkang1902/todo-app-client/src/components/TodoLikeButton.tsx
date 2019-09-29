import React from "react";
import { observer } from "mobx-react";
import { useMutation } from "@apollo/react-hooks";
import { EDIT_TODO_STAT } from "../queries";
import { StatType } from "../constants";
import { FaStar } from "react-icons/fa";

interface TodoLikeButtonProps {
  id: string;
  stat: string;
  editTodoStat: (id: string, stat: string) => void;
}

const TodoLikeButton: React.FC<TodoLikeButtonProps> = observer(({ id, stat, editTodoStat }) => {
  const [editStat] = useMutation(EDIT_TODO_STAT);

  const handleToggleLike = async (e: React.MouseEvent) => {
    e.preventDefault();

    const editedStat = stat === StatType.BOOKMARKED ? StatType.ACTIVE : StatType.BOOKMARKED;

    const item = await editStat({
      variables: { id: id, stat: editedStat }
    });

    const todo = item.data.editTodo;
    editTodoStat(todo.id, todo.stat);
  };

  return (
    <FaStar onClick={handleToggleLike} color={stat === StatType.BOOKMARKED ? "#d7c938" : ""} />
  );
});

export default TodoLikeButton;
