import type { TodoDTO } from "../models/DTO/TodoDTO.mjs";
import type { UserDTO } from "../models/DTO/UserDTO.mjs";
import { convertDbUserToDto, User } from "../models/UserSchema.mjs";

export const getUsers = async () => {
  const usersFromDb = await User.find();

  return usersFromDb.map((userFromDb) => convertDbUserToDto(userFromDb));
};

export const createUser = async (name: string, email: string) => {
  const theNewUser = {
    id: Date.now(),
    name,
    email,
    todos: [],
  };
  const createdUser = await User.create(theNewUser);
  return convertDbUserToDto(createdUser);
};

export const getUser = async (userid: string) => {
  return await User.findOne({ id: +userid });
};

export const addTodoToUser = async (userid: string, text: string) => {
  const foundUser = await User.findOne({ id: +userid });
  if (!foundUser) return false;

  const todoToAdd = {
    id: Date.now(),
    text,
    done: false,
  };
  foundUser.todos.push(todoToAdd);
  await foundUser.save();

  return true;
};

export const removeUser = async (userid: string) => {
  const removedUser = await User.findOneAndDelete({ id: +userid });

  if (removedUser) {
    return true;
  }

  return false;
};
