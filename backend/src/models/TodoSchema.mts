import { model, Schema } from "mongoose";

export const todoSchema = new Schema({
  id: { type: Number, required: true },
  text: { type: String, required: true, minLength: 3 },
  done: { type: Boolean, required: true },
});

// export const TodoModel = model("todo", todoSchema);
