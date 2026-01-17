import { Chat } from "../Model/chat_model.js"
import { Message } from "../Model/message_model.js"

export const sendMessage = async(req,res) =>{
    const {chatId , text} = req.body
   

    try{

        if(!chatId || !text){
            return res.status(404).json({message:"Missing data !!",status:false})
        }

        let newMessage = await Message.create({
            SenderId: req.userid,
            text,
            chatid : chatId
        });

        newMessage = await newMessage.populate("SenderId","name") 

        await Chat.findByIdAndUpdate(chatId,{
           lastmessage : newMessage._id
        })

        res.status(200).json({newMessage})


    }catch(err){
        console.log(err)
    }
}

export const getMessage = async(req,res) =>{
    const {chatId} = req.params;
 

    try{
        const message = await Message.find({chatid:chatId}).populate("SenderId","name")

        if(!message){
            return res.status(404).json({message : "Empty !!"})
        }

        return res.status(200).json({message})


    }catch(err){
        console.log(err)
    }
}
