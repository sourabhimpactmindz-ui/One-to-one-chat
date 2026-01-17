import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
       chatid :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Chat",
        require : true
       },

       SenderId :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        require : true
       },

       text : {
       type : String,
       }
    }
 
,{timestamps : true})


export const Message = new mongoose.model('Message',messageSchema)