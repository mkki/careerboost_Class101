import { observable, action, computed } from "mobx";
import RootStore from "./index";
import { Todo } from "../models";
import { FilterType, StatType } from "../constants";

class TodoStore {
  readonly root: RootStore;
  public folderId: string = "";
  public folderTitle: string = "";
  @observable public filter: string = FilterType.ALL;
  @observable public todos: Array<Todo> = [];

  constructor(root: RootStore) {
    this.root = root;
  }

  @action
  initialize = (folderId: string, folderTitle: string, todos: Array<Todo>) => {
    if (this.todos.length !== 0) {
      return;
    }
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
  setFilter = (filter: string) => {
    this.filter = filter;
  };

  @action
  toggleEditing = (id: string) => {
    this.todos = this.todos.map(todo => {
      if (todo.id === id) {
        todo.editing = !todo.editing;
      }

      return todo;
    });
  };

  @computed
  get activeTodos() {
    return this.todos.filter(todo => todo.stat !== StatType.DONE);
  }

  @computed
  get doneTodos() {
    return this.todos.filter(todo => todo.stat === StatType.DONE);
  }

  @computed
  get bookmaredTodos() {
    return this.todos.filter(todo => todo.stat === StatType.BOOKMARKED);
  }
}

export default TodoStore;
