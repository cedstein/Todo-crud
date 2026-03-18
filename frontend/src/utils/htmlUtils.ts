import type { Todo } from "../models/Todo";
import { getTodos, removeTodo, updateTodo } from "../services/todoService";

export const createHtml = (todos: Todo[]) => {
  const ul = document.getElementById("todos");

  if (ul) {
    ul.innerHTML = "";
  }

  todos.forEach((todo) => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const toggleButton = document.createElement("button");
    const removeButton = document.createElement("button");

    span.innerHTML = todo.text;
    toggleButton.innerHTML = "Ändra";
    removeButton.innerHTML = "Ta bort";

    if (todo.done) {
      span.className = "done";
    }

    removeButton.addEventListener("click", async () => {
      const success = await removeTodo(todo.id);

      if (success) {
        const todos = await getTodos();
        createHtml(todos);
      } else {
        console.error("could not remove todo");
      }
    });

    toggleButton.addEventListener("click", async () => {
      const success = await updateTodo(todo.id, { ...todo, done: !todo.done });

      if (success) {
        const todos = await getTodos();
        createHtml(todos);
      } else {
        console.error("Could not update todo");
      }
    });

    li.appendChild(span);
    li.appendChild(toggleButton);
    li.appendChild(removeButton);

    ul?.appendChild(li);
  });
};
