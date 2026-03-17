import express, { json } from "express";
import { todoRouter } from "./routes/todoRouter.mjs";
import cors from "cors";

const app = express();

app.use(json());

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use("/todos", todoRouter);

app.listen(3000, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Api is running on port 3000");
  }
});
