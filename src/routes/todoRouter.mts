import express from "express";
import { Todo } from "../models/Todo.mjs";

const todos: Todo[] = [
  new Todo(1, "learn express"),
  new Todo(2, "learn routes"),
];

export const todoRouter = express.Router();

todoRouter.get("/", (_, res) => {
  res.status(200).json(todos);
});

todoRouter.get("/:id", (req, res) => {
  const { id } = req.params;

  const found = todos.find((t) => t.id === +id);
  if (found) {
    res.status(200).json(found);
  } else {
    res.status(400).json({
      message: "could not find todo with id:" + id,
    });
  }
});
