import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import { EDIT_FOLDER_TITLE, DELETE_FOLDER } from "../queries";
import { useMutation } from "@apollo/react-hooks";

const StyledFolderItem = styled.li`
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

const StyledLink = styled(Link)`
  cursor: pointer;
  display: block;
  font-weight: 700;
  padding: 20px;
  text-decoration: none;
  color: #374047;

  &:visited,
  &:active,
  &:link,
  &:active {
    color: #374047;
  }
`;

const StyledEditing = styled.input`
  position: absolute;
  top: 5px;
  left: 5px;
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

interface FolderItemProps {
  id: string;
  title: string;
  editFolder: (id: string, title: string) => void;
  deleteFolder: (id: string) => void;
}

const FolderItem: React.FC<FolderItemProps> = ({ id, title, editFolder, deleteFolder }) => {
  const [editing, setEditing] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");

  const [editFolderTitle] = useMutation(EDIT_FOLDER_TITLE);
  const [removeFolder] = useMutation(DELETE_FOLDER);

  const renderItem = () => {
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
    return <StyledLink to={`/folders/${id}`}>{title}</StyledLink>;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue) {
      const item = await editFolderTitle({
        variables: { id: id, title: inputValue }
      });

      const folder = item.data.editFolder;
      editFolder(folder.id, folder.title);

      setEditing(false);
    }
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();

    const item = await removeFolder({
      variables: { id: id }
    });

    const folder = item.data.deleteFolder;
    deleteFolder(folder.id);
  };

  return (
    <StyledFolderItem>
      {renderItem()}
      <StyledIcon>
        <FaPen onClick={() => setEditing(true)} />
        <FaTrashAlt onClick={handleDelete} />
      </StyledIcon>
    </StyledFolderItem>
  );
};

export default FolderItem;
