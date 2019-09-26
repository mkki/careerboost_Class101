import React, { Fragment } from "react";
import { RouteComponentProps } from "react-router-dom";
import { TodoList, Loading, Error } from "../components";
import { useQuery } from "@apollo/react-hooks";
import { useStores } from "../stores";
import { GET_FOLDER_WITH_TODOS } from "../queries";
import { observer } from "mobx-react";
import TodoFilter from "../components/TodoFilter";

interface MatchParams {
  id: string;
}

const TodoContainer: React.FC<RouteComponentProps<MatchParams>> = observer(({ match }) => {
  const { todoStore } = useStores();
  const folderId = match.params.id;
  const { data, loading, error } = useQuery(GET_FOLDER_WITH_TODOS, {
    variables: { id: folderId }
  });
  if (loading) return <Loading />;
  if (error) return <Error text="Server Error" />;
  if (data === undefined) return <Error text="No data" />;

  todoStore.initialize(folderId, data.folder.title, data.folder.todos);
  return (
    <Fragment>
      <TodoList todoStore={todoStore} />
    </Fragment>
  );
});

export default TodoContainer;
