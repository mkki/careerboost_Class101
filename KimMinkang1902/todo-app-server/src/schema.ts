import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Todo {
    id: ID!
    text: String!
    stat: String
    folderId: String
  }

  type Folder {
    id: ID!
    title: String!
    todos: [Todo]
  }

  input TodoAddInput {
    text: String!
    folderId: String!
  }

  input TodoEditInput {
    text: String
    stat: String
  }

  input FolderInput {
    title: String
  }

  type Query {
    todo(id: String!): Todo
    todos: [Todo]
    folder(id: String!): Folder
    folders: [Folder]
  }

  type Mutation {
    addTodo(input: TodoAddInput!): Todo
    editTodo(id: String!, input: TodoEditInput!): Todo
    deleteTodo(id: String!): Todo
    deleteTodos(folderId: String!): Todo
    addFolder(input: FolderInput!): Folder
    editFolder(id: String!, input: FolderInput!): Folder
    deleteFolder(id: String!): Folder
  }
`;

export default typeDefs;
