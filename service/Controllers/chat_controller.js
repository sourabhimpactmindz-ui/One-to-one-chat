import { Chat } from "../Model/chat_model.js";




export const Acesschat = async(req,res) =>{
      const myId = req.userid;         
     const userId = req.body?.userId;

    try{

    if(!userId) {
        return res.status(404).json({message:"User id required" ,status:false})
    }

    const chat = await Chat.findOne({
        isgroupchat : false,
        users: { $all: [myId, userId] }

    }).populate('users' , '-password')

    if(chat){
        return res.status(200).json(chat)
    }

    const newchat = await Chat.create({
        users : [userId,myId],
         isgroupchat : false
    })

    const fullChat = await Chat.findById(newchat._id).populate(
        'users',
        '-password'
    )

    return res.status(201).json(fullChat)
}catch(err){
    console.log(err)
}
}


// login user all chats ==> Frontend 

export const Fetchchat = async(req,res) =>{
    const myId = req.userid

    try{
        const chats = await Chat.find({
            users : {$in : [myId]}
        }).populate('users',"-password").populate('lastmessage')

        return res.status(200).json(chats)
    }catch(err){
        console.log(err)
    }
}