import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import FolderInput from "./FolderInput";
import { FolderItem } from ".";
import { Folder } from "../models";
import FolderStore from "../stores/folder";
import { useStores } from "../stores";

const StyledFolderListContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 1010px;
  width: 100%;
  margin: 20px 0;
`;

const StyledFolderList = styled.ul`
  margin: 0 auto;
  padding: 0;
`;

export interface FolderListProps {
  data: FolderStore;
}

const FolderList: React.FC<FolderListProps> = observer(({ data }) => {
  const { folderStore } = useStores();
  folderStore.initialize(data.folders);

  return (
    <StyledFolderListContainer>
      <FolderInput newFolder={folderStore.newFolder} />
      <StyledFolderList>
        {folderStore.folders.map((folder: Folder) => (
          <FolderItem
            {...folder}
            key={folder.id}
            editFolder={folderStore.editFolder}
            deleteFolder={folderStore.deleteFolder}
          />
        ))}
      </StyledFolderList>
    </StyledFolderListContainer>
  );
});

export default FolderList;
