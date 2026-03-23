import type { TodoDTO } from "../models/DTO/TodoDTO.mjs";
import type { UserDTO } from "../models/DTO/UserDTO.mjs";
import { User } from "../models/UserSchema.mjs";

export const getUsers = async () => {
  const usersFromDb = await User.find();

  const dtos = usersFromDb.map((userFromDb) => {
    return {
      id: userFromDb.id,
      name: userFromDb.name,
      todos: userFromDb.todos.map((t) => {
        return {
          id: t.id,
          text: t.text,
          done: t.done,
        } satisfies TodoDTO;
      }),
    } satisfies UserDTO;
  });
  return dtos;
};

export const createUser = async (name: string, email: string) => {
  const theNewUser = {
    id: Date.now(),
    name,
    email,
    todos: [],
  };
  const createdUser = await User.create(theNewUser);
  return {
    id: createdUser.id,
    name: createdUser.name,
    todos: createdUser.todos.map((t) => {
      return {
        id: t.id,
        text: t.text,
        done: t.done,
      } satisfies TodoDTO;
    }),
  } satisfies UserDTO;
};

export const addTodoToUser = async (userid: string, text: string) => {
  const foundUser = await User.findOne({ id: +userid });
  if (!foundUser) return false;

  const todoToAdd = {
    id: Date.now,
    text,
    done: false,
  };
  foundUser.todos.push(todoToAdd);
  await foundUser.save();

  return true;
};
