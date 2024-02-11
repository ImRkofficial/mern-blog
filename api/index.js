import express from "express";
import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import path from 'path';

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

const __dirname = path.resolve()
  // Importing Routes
  import userRoutes from './routes/user.route.js';
  import authRoutes from './routes/auth.route.js';
  import postRoutes from './routes/post.route.js';
  import commentRoutes from './routes/comment.route.js';

  app.use('/api/user',userRoutes);
  app.use("/api/auth",authRoutes);
  app.use("/api/post",postRoutes);
  app.use("/api/comment",commentRoutes);

app.use(express.static(path.join(__dirname,'/client/dist')))

app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,'client','dist','index.html'))
})

app.listen(3000, () => {
  console.log("Server is running on Port 3000");
});
