import { model, Schema, type InferSchemaType } from "mongoose";
import { todoSchema } from "./TodoSchema.mjs";
import type { UserDTO } from "./DTO/UserDTO.mjs";
import type { TodoDTO } from "./DTO/TodoDTO.mjs";

const UserSchema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  email: { type: String, required: false },
  todos: [todoSchema],
});

export const User = model("user", UserSchema);

export type userFromDb = InferSchemaType<typeof UserSchema>;
export const convertDbUserToDto = (dbUser: userFromDb): UserDTO => {
  return {
    id: dbUser.id,
    name: dbUser.name,
    todos: dbUser.todos.map((t) => {
      return {
        id: t.id,
        text: t.text,
        done: t.done,
      } satisfies TodoDTO;
    }),
  } satisfies UserDTO;
};
