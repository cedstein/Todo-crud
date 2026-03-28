import type { TodoDTO } from "./TodoDTO.mjs";

export type UserDTO = {
  name: string;
  email: string;
  todos: TodoDTO[];
};
