import express from "express";

const app = express();

app.listen(3000, (error: Error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Api is running on port 3000");
  }
});
