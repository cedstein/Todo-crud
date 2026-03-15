import express from "express";
import { Todo } from "./models/Todo.mjs";

const todos: Todo[] = [
  new Todo(1, "learn express"),
  new Todo(2, "learn routes"),
];

const app = express();

app.get("/", (_, res) => {
  res.status(200).json(todos);
});

app.listen(3000, (error: Error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Api is running on port 3000");
  }
});
