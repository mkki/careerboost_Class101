import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import FolderInput from "./FolderInput";
import { FolderItem } from ".";
import { Folder } from "../models";
import FolderStore from "../stores/folder";

const StyledFolderList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 1010px;
  width: 100%;
  margin: 20px auto;
`;

export interface FolderListProps {
  folderStore: FolderStore;
}

const FolderList: React.FC<FolderListProps> = observer(({ folderStore }) => {
  return (
    <StyledFolderList>
      <FolderInput newFolder={folderStore.newFolder} />
      {folderStore.folders.map((folder: Folder) => (
        <FolderItem
          {...folder}
          key={folder.id}
          editFolder={folderStore.editFolder}
          deleteFolder={folderStore.deleteFolder}
        />
      ))}
    </StyledFolderList>
  );
});

export default FolderList;
