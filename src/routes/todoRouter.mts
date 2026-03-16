import express from "express";
import { Todo } from "../models/Todo.mjs";
import type { ApiErrorResponse } from "../models/ApiErrorResponse.mjs";

const todos: Todo[] = [
  new Todo(1, "learn express"),
  new Todo(2, "learn routes"),
];

export const todoRouter = express.Router();

todoRouter.get("/", async (_, res) => {
  try {
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      stacktrace: error,
    } satisfies ApiErrorResponse);
  }
});

todoRouter.get("/:id", (req, res) => {
  try {
    const { id } = req.params;

    const found = todos.find((t) => t.id === +id);
    if (found) {
      res.status(200).json(found);
    } else {
      res.status(400).json({
        message: "could not find todo with id:" + id,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      stacktrace: error,
    } satisfies ApiErrorResponse);
  }
});

todoRouter.post("/", (req, res) => {
  try {
    const { todoText } = req.body;

    const newTodo = new Todo(Date.now(), todoText);

    todos.push(newTodo);

    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({
      message: "Could not create a new todo",
      stacktrace: error,
    } satisfies ApiErrorResponse);
  }
});
