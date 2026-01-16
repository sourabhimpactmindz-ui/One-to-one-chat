import mongoose from 'mongoose'


const chatSchema = new mongoose.Schema(

    {
        users : [
            {
                type : mongoose.Schema.Types.ObjectId,
                ref : "User",
                required : true
            }

        ],

        isgroupchat : {
            type : Boolean,
            default : false,
        },

        lastmessage : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Message"
        }
    },{timestamps:true}
)

export const Chat = new mongoose.model('Chat',chatSchema) 