import express from "express";
import type { UserDTO } from "../models/DTO/UserDTO.mjs";
import { getUsers } from "../controllers/userController.mjs";

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
