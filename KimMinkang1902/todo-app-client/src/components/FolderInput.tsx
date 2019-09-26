import React, { useRef } from "react";
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
  newFolder: (item: Folder) => any;
}

const FolderInput: React.FC<FolderInputProps> = ({ newFolder }) => {
  const inputRef = useRef<any>();

  const [addFolder] = useMutation(ADD_FOLDER);

  const handleKeyPress = async (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      const item: any = await addFolder({
        variables: { title: inputRef.current.value }
      });
      inputRef.current.value = "";

      const folder = item.data.addFolder;
      newFolder(new Folder(folder.id, folder.title));
    }
  };

  return (
    <StyledInputContainer>
      <StyledInput placeholder="Add Folder" ref={inputRef} onKeyPress={handleKeyPress} />
    </StyledInputContainer>
  );
};

export default FolderInput;
