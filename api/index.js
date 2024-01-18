import express from "express";
import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

const app = express();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Mongodb Connected Successfully");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.listen(3000, () => {
  console.log("Server is running on Port 3000");
});
