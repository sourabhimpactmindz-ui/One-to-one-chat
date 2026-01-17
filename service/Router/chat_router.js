import express from 'express'
import { Acesschat, Fetchchat } from "../Controllers/chat_controller.js";
import { authmiddle } from "../Middleware/user_middleware.js";
import { getMessage, sendMessage } from "../Controllers/message_controller.js";


const chatrouter = express.Router()

chatrouter.post('/access',authmiddle,Acesschat)
chatrouter.get('/',authmiddle,Fetchchat)
chatrouter.post('/message',authmiddle,sendMessage)
chatrouter.get('/message/:chatId',authmiddle,getMessage)


export default chatrouter;