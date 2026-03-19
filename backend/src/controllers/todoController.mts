import type QueryString from "qs";
import { Todo } from "../models/Todo.mjs";

const todos: Todo[] = [
  new Todo(1, "learn express"),
  new Todo(2, "learn routes"),
];

export const getTodos = (
  q:
    | string
    | QueryString.ParsedQs
    | (string | QueryString.ParsedQs)[]
    | undefined,
  sort:
    | string
    | QueryString.ParsedQs
    | (string | QueryString.ParsedQs)[]
    | undefined,
) => {
  let filteredList = [...todos];

  if (q) {
    filteredList = filteredList.filter((t) =>
      t.text.toLowerCase().startsWith(q as string),
    );
  }

  if ((sort as string) === "asc") {
    filteredList.sort((a, b) => {
      if (a.text.toLowerCase() < b.text.toLowerCase()) return -1;
      if (b.text.toLowerCase() < a.text.toLowerCase()) return 1;
      return 0;
    });
  } else {
    filteredList.sort((a, b) => {
      if (a.text.toLowerCase() < b.text.toLowerCase()) return 1;
      if (b.text.toLowerCase() < a.text.toLowerCase()) return -1;
      return 0;
    });
  }
  return filteredList;
};

export const getTodo = (id: string) => todos.find((t) => t.id === +id);

export const createTodo = (text: string) => {
  const newTodo = new Todo(Date.now(), text);

  todos.push(newTodo);

  return newTodo;
};

export const removeTodo = (id: string) => {
  const index = todos.findIndex((t) => t.id === +id);

  if (index >= 0) {
    todos.splice(index, 1);
    return true;
  }
  return false;
};

export const updateTodo = (todo: Todo) => {
  let found = todos.find((t) => t.id === todo.id);

  if (found) {
    found.done = todo.done;
    found.text = todo.text;
  }
  return found;
};
