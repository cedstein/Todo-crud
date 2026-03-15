import express from "express";
import type { Todo } from "./models/Todo.mjs";

const todos: Todo[] = [];

const app = express();

app.get("/", (req, res) => {});

app.listen(3000, (error: Error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Api is running on port 3000");
  }
});
