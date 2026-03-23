import express from "express";
import type { UserDTO } from "../models/DTO/UserDTO.mjs";
import {
  addTodoToUser,
  createUser,
  getUsers,
} from "../controllers/userController.mjs";

export const usersRouter = express.Router();

usersRouter.get("/", async (req, res) => {
  try {
    const users: UserDTO[] = await getUsers();

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

usersRouter.post("/", async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || "") {
      res.status(400).json({ message: "Name is missing in body" });
      return;
    }

    const newUser: UserDTO = await createUser(name, email);

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

usersRouter.put("/addtodo/:userid", async (req, res) => {
  try {
    const { userid } = req.params;
    const { todoText } = req.body;

    if (!todoText || todoText === "") {
      res.status(400).json({ message: "Missing todoText in body" });
      return;
    }
    const success = await addTodoToUser(userid, todoText);

    if (success) {
      res.status(204).send();
    } else {
      res.status(500).json({ message: "Någonting gick fel" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});
