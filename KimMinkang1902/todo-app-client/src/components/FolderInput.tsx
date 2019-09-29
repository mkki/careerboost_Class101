import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { ADD_FOLDER } from "../queries";
import { Folder } from "../models";
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
  newFolder: (item: Folder) => void;
}

const FolderInput: React.FC<FolderInputProps> = ({ newFolder }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [addFolder] = useMutation(ADD_FOLDER);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue) {
      const item = await addFolder({
        variables: { title: inputValue }
      });

      const folder = item.data.addFolder;
      newFolder(new Folder(folder.id, folder.title));

      setInputValue("");
    }
  };

  return (
    <StyledInputContainer>
      <StyledInput
        type="text"
        placeholder="Add Folder"
        value={inputValue}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
    </StyledInputContainer>
  );
};

export default FolderInput;
