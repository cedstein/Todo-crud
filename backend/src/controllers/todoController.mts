import type QueryString from "qs";
import { Todo } from "../models/Todo.mjs";
import { type Request } from "express";
import { getLoggedInUser } from "../middlewares/auth.mjs";

export const getTodos = async (
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
  req: Request,
) => {
  const foundUser = await getLoggedInUser(req);

  const todos = foundUser.todos;

  let filteredList = [...todos];

  console.log(filteredList);

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

export const getTodo = async (id: string, req: Request) => {
  const foundUser = await getLoggedInUser(req);
  return foundUser.todos.find((t) => t.id === +id);
};

export const createTodo = async (text: string, req: Request) => {
  const foundUser = await getLoggedInUser(req);

  const newTodo = new Todo(Date.now(), text);
  foundUser.todos.push({
    id: newTodo.id,
    text: newTodo.text,
    done: newTodo.done,
  });
  await foundUser.save();

  return newTodo;
};

export const removeTodo = async (id: string, req: Request) => {
  const foundUser = await getLoggedInUser(req);

  const index = foundUser.todos.findIndex((t) => t.id === +id);
  if (index === -1) return false;

  foundUser.todos.splice(index, 1);
  await foundUser.save();
  return true;
};

export const updateTodo = async (todo: Todo, req: Request) => {
  const foundUser = await getLoggedInUser(req);

  const existing = foundUser.todos.find((t) => t.id === todo.id);
  if (!existing) throw new Error("Todo not found");

  existing.text = todo.text;
  existing.done = todo.done;
  await foundUser.save();

  return todo;
};
