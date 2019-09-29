import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { DELETE_TODO } from "../queries";
import { observer } from "mobx-react";
import { FaTrashAlt } from "react-icons/fa";

interface TodoDeleteButtonProps {
  id: string;
  deleteTodo: (id: string) => void;
}
const TodoDeleteButton: React.FC<TodoDeleteButtonProps> = observer(({ id, deleteTodo }) => {
  const [removeTodo] = useMutation(DELETE_TODO);

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();

    const item = await removeTodo({
      variables: { id: id }
    });

    const todo = item.data.deleteTodo;
    deleteTodo(todo.id);
  };

  return <FaTrashAlt onClick={handleDelete} />;
});

export default TodoDeleteButton;
