import express from "express";
import type { UserDTO } from "../models/DTO/UserDTO.mjs";
import {
  addTodoToUser,
  createUser,
  getUser,
  getUsers,
  removeUser,
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

usersRouter.get("/:userid", async (req, res) => {
  try {
    const { userid } = req.params;
    const foundUser = await getUser(userid);

    if (foundUser) {
      res.status(200).json(foundUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
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

usersRouter.delete("/removeUser/:userid", async (req, res) => {
  try {
    const { userid } = req.params;
    const success = await removeUser(userid);

    if (success) {
      res.status(204).json();
    } else {
      res.status(400).json({ message: "Can not find user with id:" + userid });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});
