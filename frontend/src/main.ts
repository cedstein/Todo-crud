import "./style.css";
import { createTodo, getTodos } from "./services/todoService";
import { createHtml } from "./utils/htmlUtils";

document.getElementById("todoform")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const theUserText = (document.getElementById("todotext") as HTMLInputElement)
    .value;

  const data = await createTodo(theUserText);
  console.log(data);

  (document.getElementById("todotext") as HTMLInputElement).value = "";

  const todos = await getTodos();
  createHtml(todos);
});
const todos = await getTodos();

// Rita ut dem på skärmen
createHtml(todos);
