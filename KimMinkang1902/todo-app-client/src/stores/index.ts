import React from "react";
import { MobXProviderContext } from "mobx-react";

import FolderStore from "./folder";
import TodoStore from "./todo";

export const useStores = () => {
  return React.useContext(MobXProviderContext);
};

class RootStore {
  folderStore: FolderStore;
  todoStore: TodoStore;

  constructor() {
    this.folderStore = new FolderStore(this);
    this.todoStore = new TodoStore(this);
  }
}

export default RootStore;
