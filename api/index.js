import express from "express";
import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());

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
  import authRoutes from './routes/auth.route.js';
  import postRoutes from './routes/post.route.js';

  app.use('/api/user',userRoutes);
  app.use("/api/auth",authRoutes);
  app.use("/api/post",postRoutes);



app.listen(3000, () => {
  console.log("Server is running on Port 3000");
});
