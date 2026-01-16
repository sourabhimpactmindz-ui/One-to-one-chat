import express from 'express'
import { Router } from "express";
import { createuser, getuser, loginuser } from "../Controllers/user_controller.js";
import { authmiddle } from '../Middleware/user_middleware.js';


const userRouter = express();


userRouter.post("/create",createuser)
userRouter.post("/login",loginuser)
userRouter.get("/get",getuser)



export default userRouter