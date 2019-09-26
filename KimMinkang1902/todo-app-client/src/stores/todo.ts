import { observable, action, computed } from "mobx";
import RootStore from "./index";
import { Todo } from "../models";
import { StatType } from "../models/Todo";

class TodoStore {
  readonly root: RootStore;
  @observable public folderId: string = "";
  @observable public folderTitle: string = "";
  @observable public todos: Array<Todo> = [];

  constructor(root: RootStore) {
    this.root = root;
  }

  @action
  initialize = (folderId: string, folderTitle: string, todos: Array<Todo>) => {
    this.folderId = folderId;
    this.folderTitle = folderTitle;
    this.todos = todos;
  };

  @action
  newTodo = (item: Todo) => {
    this.todos.push(new Todo(item.id, item.text, item.folderId));
  };

  @action
  editTodoText = (id: string, text: string) => {
    this.todos = this.todos.map(todo => {
      if (todo.id === id) {
        todo.text = text;
      }

      return todo;
    });
  };

  @action
  editTodoStat = (id: string, stat: string) => {
    this.todos = this.todos.map(todo => {
      if (todo.id === id) {
        todo.stat = stat;
      }

      return todo;
    });
  };

  @action
  deleteTodo = (id: string) => {
    this.todos = this.todos.filter(todo => todo.id !== id);
  };

  @action
  filterActiveTodo = () => {
    this.todos = this.todos.filter(todo => todo.stat !== StatType.DONE);
  };

  @action
  filterDoneTodo = () => {
    this.todos = this.todos.filter(todo => todo.stat === StatType.DONE);
  };

  @action
  filterBookmarkedTodo = () => {
    this.todos = this.todos.filter(todo => todo.stat === StatType.BOOKMARKED);
  };

  getTodo() {
    return this.todos.slice();
  }
}

export default TodoStore;
