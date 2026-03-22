import express, { json } from "express";
import { todoRouter } from "./routes/todoRouter.mjs";
import cors from "cors";
import mongoose from "mongoose";
import { config } from "dotenv";

config();

const mongoUri = process.env.MONGO_URI || "";
const port = process.env.PORT || 4000;

if (mongoUri === "") {
  throw "MONGO_URI does not exist in .env";
}

const app = express();

app.use(json());

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use("/todos", todoRouter);

app.listen(3000, async (error) => {
  try {
    if (error) {
      console.error(error);
    }
    await mongoose.connect(mongoUri);
    console.log(`Api is running on port: ${port}, connected to the database`);
  } catch {
    console.error(error);
  }
});
