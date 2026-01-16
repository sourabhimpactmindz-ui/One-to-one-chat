import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        trim : true
    },

    age : {
        type : Number,
        trim : true
    },

    password : {
        type : String,
        trime : true
    }
},{timestamps : true})


export const User = new mongoose.model("User",userSchema)