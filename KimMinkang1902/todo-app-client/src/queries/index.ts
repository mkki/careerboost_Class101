import { gql } from "apollo-boost";

export const GET_FOLDERS = gql`
  query GetFolders {
    folders {
      id
      title
    }
  }
`;

export const ADD_FOLDER = gql`
  mutation AddFolder($title: String!) {
    addFolder(input: { title: $title }) {
      id
      title
    }
  }
`;

export const EDIT_FOLDER_TITLE = gql`
  mutation EditFolderTitle($id: String!, $title: String!) {
    editFolder(id: $id, input: { title: $title }) {
      id
      title
    }
  }
`;

export const DELETE_FOLDER = gql`
  mutation DelteFolder($id: String!) {
    deleteFolder(id: $id) {
      id
      title
    }
  }
`;

export const GET_FOLDER_WITH_TODOS = gql`
  query GetFolderWithTodos($id: String!) {
    folder(id: $id) {
      title
      todos {
        id
        text
        stat
      }
    }
  }
`;

export const ADD_TODO = gql`
  mutation AddTodo($text: String!, $folderId: String!) {
    addTodo(input: { text: $text, folderId: $folderId }) {
      id
      text
      folderId
    }
  }
`;

export const EDIT_TODO_TEXT = gql`
  mutation EditTodoText($id: String!, $text: String!) {
    editTodo(id: $id, input: { text: $text }) {
      id
      text
    }
  }
`;

export const EDIT_TODO_STAT = gql`
  mutation EditTodoStat($id: String!, $stat: String!) {
    editTodo(id: $id, input: { stat: $stat }) {
      id
      stat
    }
  }
`;

export const DELETE_TODO = gql`
  mutation DeleteTodo($id: String!) {
    deleteTodo(id: $id) {
      id
    }
  }
`;
