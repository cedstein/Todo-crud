import express from "express";
import { createUser } from "../controllers/userController.mjs";
import { convertDbUserToDto } from "../models/UserSchema.mjs";

export const registerRouter = express.Router();

registerRouter.post("/", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ message: "Missing stuff in body" });
  }

  try {
    const createdUser = await createUser(name, email, password);

    const dto = convertDbUserToDto(createdUser);

    res.status(201).json(createdUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create user" });
  }
});
