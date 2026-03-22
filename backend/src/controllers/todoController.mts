import type QueryString from "qs";
import { TodoModel } from "../models/TodoSchema.mjs";
import { Todo } from "../models/Todo.mjs";

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
) => {
  const todos = await TodoModel.find();

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

export const getTodo = async (id: string) =>
  await TodoModel.findOne({ id: +id });

export const createTodo = async (text: string) => {
  const newTodo = new Todo(Date.now(), text);

  const createdInMongo = await TodoModel.create(newTodo);

  return createdInMongo;
};

export const removeTodo = async (id: string) => {
  const removedObject = await TodoModel.findOneAndDelete({ id: +id });

  if (removedObject) {
    return true;
  }

  return false;
};

export const updateTodo = async (todo: Todo) => {
  await TodoModel.findOneAndUpdate({ id: todo.id });

  return todo;
};
