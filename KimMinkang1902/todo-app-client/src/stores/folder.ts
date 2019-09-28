import { observable, action } from "mobx";
import RootStore from "./index";
import { Folder } from "../models";

class FolderStore {
  readonly root: RootStore;
  @observable public folders: Array<Folder> = [];

  constructor(root: RootStore) {
    this.root = root;
  }

  @action
  initialize = (folders: Array<Folder>) => {
    if (this.folders.length !== 0) {
      return;
    }
    this.folders = folders;
  };

  @action
  newFolder = (item: Folder) => {
    this.folders.push(new Folder(item.id, item.title));
  };

  @action
  editFolder = (id: string, title: string) => {
    this.folders = this.folders.map(folder => {
      if (folder.id === id) {
        folder.title = title;
      }

      return folder;
    });
  };

  @action
  deleteFolder = (id: string) => {
    this.folders = this.folders.filter(folder => folder.id !== id);
  };
}

export default FolderStore;
