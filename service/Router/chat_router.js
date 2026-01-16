import { Router } from "express";
import { Acesschat, Fetchchat } from "../Controllers/chat_controller.js";
import { authmiddle } from "../Middleware/user_middleware.js";


const chatrouter = express()

chatrouter.post('/chat',authmiddle,Acesschat)
chatrouter.get('/chat',authmiddle,Fetchchat)