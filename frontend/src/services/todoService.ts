import type { Todo } from "../models/Todo";

export const getTodos = async () => {
  try {
    const response = await fetch("http://localhost3000/todos");
    const data: Todo[] = await response.json();
    return data;
  } catch {
    console.error("could not fetch data from API");
    return [];
  }
};

export const getTodoById = async (id: number) => {
  const response = await fetch("http://localhost3000/todos" + id);
  const data: Todo = await response.json();
  return data;
};

export const createTodo = async (text: string) => {
  const response = await fetch("http://localhost3000/todos", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ todoText: text }),
  });
  const data: Todo = await response.json();
  return data;
};

export const removeTodo = async (id: number) => {
  try {
    const response = await fetch("http://localhost:3000/todos/" + id, {
      method: "DELETE",
    });

    return response.ok;
  } catch {
    return false;
  }
};

export const updateTodo = async (id: number, todo: Todo) => {
  try {
    const response = await fetch(`http://localhost:3000/todos/${id}`, {
      method: "put",
      body: JSON.stringify({ todo }),
      headers: {
        "content-type": "application/json",
      },
    });
    return response.ok;
  } catch (error) {
    return false;
  }
};
