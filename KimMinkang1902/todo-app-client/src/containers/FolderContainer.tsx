import React, { Fragment } from "react";
import { FolderList, Loading, Error } from "../components";
import { useQuery } from "@apollo/react-hooks";
import { GET_FOLDERS } from "../queries";
import { observer } from "mobx-react";
import { useStores } from "../stores";

const FolderContainer: React.FC = observer(() => {
  const { folderStore } = useStores();
  const { data, loading, error } = useQuery(GET_FOLDERS);
  if (loading) return <Loading />;
  if (error) return <Error text="Server Error" />;
  if (data === undefined) return <Error text="No data" />;

  folderStore.initialize(data.folders);
  return (
    <Fragment>
      <FolderList folderStore={folderStore} />
    </Fragment>
  );
});

export default FolderContainer;
