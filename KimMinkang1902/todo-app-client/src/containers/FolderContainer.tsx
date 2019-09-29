import React, { Fragment } from "react";
import { FolderList, Loading, Error } from "../components";
import { useQuery } from "@apollo/react-hooks";
import { GET_FOLDERS } from "../queries";

const FolderContainer: React.FC = () => {
  const { data, loading, error } = useQuery(GET_FOLDERS);
  if (loading) return <Loading />;
  if (error) return <Error text="Server Error" />;
  if (data === undefined) return <Error text="No data" />;

  return (
    <Fragment>
      <FolderList data={data} />
    </Fragment>
  );
};

export default FolderContainer;
