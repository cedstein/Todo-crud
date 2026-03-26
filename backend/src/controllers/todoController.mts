import type QueryString from "qs";
import { Todo } from "../models/Todo.mjs";
import { User } from "../models/UserSchema.mjs";

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
  const user = await User.findOne();
  if (!user) throw new Error("Could not find logged in user");

  const todos = user.todos;
  // const todos = await TodoModel.find();

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

export const getTodo = async (id: string) => {
  const user = await User.findOne();
  if (!user) throw new Error("Could not find logged in user");
  return user.todos.find((t) => t.id === +id);
};

export const createTodo = async (text: string) => {
  const user = await User.findOne();
  if (!user) throw new Error("Could not find logged in user");

  const newTodo = new Todo(Date.now(), text);
  user.todos.push({ id: newTodo.id, text: newTodo.text, done: newTodo.done });
  await user.save();

  return newTodo;
  /*  const newTodo = new Todo(Date.now(), text);

  const createdInMongo = await TodoModel.create(newTodo);

  return createdInMongo; */
};

export const removeTodo = async (id: string) => {
  const user = await User.findOne();
  if (!user) throw new Error("Could not find logged in user");

  const index = user.todos.findIndex((t) => t.id === +id);
  if (index === -1) return false;

  user.todos.splice(index, 1);
  await user.save();
  return true;
  /*  const removedObject = await TodoModel.findOneAndDelete({ id: +id });

  if (removedObject) {
    return true;
  }

  return false; */
};

export const updateTodo = async (todo: Todo) => {
  const user = await User.findOne();
  if (!user) throw new Error("Could not find logged in user");

  const existing = user.todos.find((t) => t.id === todo.id);
  if (!existing) throw new Error("Todo not found");

  existing.text = todo.text;
  existing.done = todo.done;
  await user.save();

  return todo;
  /* await TodoModel.findOneAndUpdate({ id: todo.id });

  return todo; */
};
