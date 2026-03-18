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
    console.error(error);
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
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
      stacktrace: error,
    } satisfies ApiErrorResponse);
  }
});

todoRouter.post("/", (req, res) => {
  try {
    const { todoText } = req.body;

    if (todoText) {
      const newTodo = new Todo(Date.now(), todoText);

      todos.push(newTodo);

      res.status(201).json(newTodo);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Could not create a new todo",
      stacktrace: error,
    } satisfies ApiErrorResponse);
  }
});

todoRouter.delete("/:id", (req, res) => {
  try {
    const { id } = req.params;

    const index = todos.findIndex((t) => t.id === +id);

    if (index >= 0) {
      todos.splice(index, 1);
      res.status(204).json();
    } else {
      res.status(400).json({ message: "Can not find todo with id:" + id });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
      stacktrace: error,
    } satisfies ApiErrorResponse);
  }
});

todoRouter.put("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const { todo }: { todo: Todo } = req.body;

    if (+id !== todo.id) {
      res.status(400).json({ message: "parameter and body does not match" });
    } else {
      let found = todos.find((t) => t.id === todo.id);

      if (found) {
        found.done = todo.done;
        found.text = todo.text;

        res.status(200).json(todo);
      } else {
        res.status(404).json({ message: "could not find the todo" });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "internal server error",
      stacktrace: error,
    } satisfies ApiErrorResponse);
  }
});
