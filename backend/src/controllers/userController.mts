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
