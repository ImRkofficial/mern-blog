import express from "express";
import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

const app = express();

app.use(express.urlencoded({extended:true}))
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Mongodb Connected Successfully");
  })
  .catch((err) => {
    console.log(err.message);
  });


  // Importing Routes
  import userRoutes from './routes/user.route.js';

  app.use('/api/users',userRoutes);

app.listen(3000, () => {
  console.log("Server is running on Port 3000");
});
