import express from "express";
import { todoRouter } from "./routes/todoRouter.mjs";

const app = express();

app.use("/todos", todoRouter);

app.listen(3000, (error: Error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Api is running on port 3000");
  }
});
