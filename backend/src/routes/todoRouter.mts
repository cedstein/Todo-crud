import express from "express";
import { Todo } from "../models/Todo.mjs";
import type { ApiErrorResponse } from "../models/ApiErrorResponse.mjs";
import {
  createTodo,
  getTodo,
  getTodos,
  removeTodo,
  updateTodo,
} from "../controllers/todoController.mjs";

export const todoRouter = express.Router();

todoRouter.get("/", async (_, res) => {
  try {
    const todos = getTodos();

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

    const found = getTodo(id);

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
    const { todoText }: { todoText: string } = req.body;

    if (todoText && todoText !== "") {
      const newTodo = createTodo(todoText);

      res.status(201).json(newTodo);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Body does not contain property todoText or an empty todoText",
      stacktrace: error,
    } satisfies ApiErrorResponse);
  }
});

todoRouter.delete("/:id", (req, res) => {
  try {
    const { id } = req.params;

    const success = removeTodo(id);

    if (success) {
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
      let found = updateTodo(todo);

      if (found) {
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
