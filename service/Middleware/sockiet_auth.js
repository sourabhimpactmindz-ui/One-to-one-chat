import jwt from 'jsonwebtoken'
import { Socket } from 'socket.io'
import 'dotenv/config'
import { User } from '../Model/user_model.js';

export const socketauth = async(socket,next) =>{
    try{

        const token = socket.handshake.auth.token;
       
        if(!token){
            return next( Error("Token missing"))
        }

        const decode = jwt.verify(token,process.env.SECRET_KEY)
        
        const user = await User.findById(decode.id).select("-password")

        if(!user){
            return next(Error ("User not found"))
        }

        socket.user = user

        next();

    }catch(err){
        console.log(err)
    }
}

