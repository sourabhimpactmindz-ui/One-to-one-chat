import { User } from "../Model/user_model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

export const createuser = async(req,res) =>{
    const {name,age,password} = req.body;

    try{
        const exituser = await User.findOne({name:name})

            if(exituser){
                return res.status(404).json({message:"user already exits",status:false})
            }

            const hashpassword = await bcrypt.hash(password,10)
            const newuser = await User.create({
                name : name,
                age : age,
                password : hashpassword
            })
            return res.status(200).json({message:"user created successfully",status:true,newuser:newuser})

    }catch(err){
        console.log(err)
    }
}


export const loginuser = async(req,res) =>{
    const {name,password} = req.body;

    try{
        if(!name || !password){
            return res.status(404).json({message:"name and password required !!",status:false})
        }

        const user = await User.findOne({name:name})

        if(!user){
            return res.status(404).json({message:"user not found!!",status:false})
        }

        const isvalidpassword = bcrypt.compare(password,user.password)
        if(!isvalidpassword){
            return res.status(404).json({message:"password incorrect !!",status:false})

        }
        const token = jwt.sign(
            {
               id:user._id,
                name:name,
                
            },
            process.env.SECRET_KEY,
            {expiresIn : "2d"}
        )
        return res.status(200).json({message:"user login successfully",status:true,token:token , })

    }catch(err){
        console.log(err)
    }
}


export const getuser = async(req,res) =>{
    const id = req.userid

    try{
        const user =  await User.find(id,{password:0,age:0})
    
        if(!user || user.length === 0){
            return res.status(404).json({message:"user not exits",status : false})
        }

        return res.status(200).json({message:"user fatch successfully",user:user,status:true})

    }catch(err){
        console.log(err)
    }
}