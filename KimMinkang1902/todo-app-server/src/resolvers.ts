import Todo from "./models/todo.model";
import Folder from "./models/folder.model";

const resolvers = {
  Query: {
    todo: async (_: void, { id }: any) => {
      const todo: any = await Todo.findById(id);
      return todo.toObject();
    },
    todos: async () => {
      const todos = await Todo.find({});
      return todos.map(todo => todo.toObject());
    },
    folder: async (_: void, { id }: any) => {
      const folder: any = await Folder.findById(id);
      return folder.toObject();
    },
    folders: async () => {
      const folders = await Folder.find({});
      return folders.map(Folder => Folder.toObject());
    }
  },
  Mutation: {
    addTodo: async (_: void, { input }: any) => {
      const todo = await Todo.create(input);
      return todo.toObject();
    },
    editTodo: async (_: void, { id, input }: any) => {
      const todo: any = await Todo.findByIdAndUpdate(id, input, { new: true });
      return todo.toObject();
    },
    deleteTodo: async (_: void, { id }: any) => {
      const todo: any = await Todo.findByIdAndDelete(id);
      return todo.toObject();
    },
    addFolder: async (_: void, { input }: any) => {
      const folder = await Folder.create(input);
      return folder.toObject();
    },
    editFolder: async (_: void, { id, input }: any) => {
      const folder: any = await Folder.findByIdAndUpdate(id, input, { new: true });
      return folder.toObject();
    },
    deleteFolder: async (_: void, { id }: any) => {
      const folder: any = await Folder.findByIdAndDelete(id);
      await Todo.deleteMany({ folderId: id });
      return folder.toObject();
    }
  },
  Folder: {
    todos: async (folder: any) => {
      const todos = await Todo.find({ folderId: folder.id });
      return todos.map(todo => todo.toObject());
    }
  }
};

export default resolvers;
