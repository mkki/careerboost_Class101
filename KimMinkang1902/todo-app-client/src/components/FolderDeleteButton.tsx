import React from "react";
import { DELETE_FOLDER } from "../queries";
import { useMutation } from "@apollo/react-hooks";
import { FaTrashAlt } from "react-icons/fa";
import { observer } from "mobx-react-lite";

interface FolderDeleteButtonProps {
  id: string;
  deleteFolder: (id: string) => void;
}

const FolderDeleteButton: React.FC<FolderDeleteButtonProps> = observer(({ id, deleteFolder }) => {
  const [removeFolder] = useMutation(DELETE_FOLDER);

  const handleDelete = async () => {
    const item = await removeFolder({
      variables: { id: id }
    });

    const folder = item.data.deleteFolder;
    deleteFolder(folder.id);
  };

  return <FaTrashAlt onClick={handleDelete} />;
});

export default FolderDeleteButton;
