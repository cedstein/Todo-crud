import { Todo } from "../models/Todo.mjs";

const todos: Todo[] = [
  new Todo(1, "learn express"),
  new Todo(2, "learn routes"),
];

export const getTodos = () => {
  return todos;
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
