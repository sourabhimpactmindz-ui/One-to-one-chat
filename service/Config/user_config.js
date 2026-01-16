import mongoose from "mongoose";

const Dbconnect = async() =>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Database connected successfuly")
    }catch(err){
        console.log(err)
    }
}

export default Dbconnect;