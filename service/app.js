import express from 'express';
import dotenv from 'dotenv';
import userRouter from './Router/user_router.js';
import cors from 'cors'
dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json())
app.use("/api",userRouter)

export default  app