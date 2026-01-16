import jwt from 'jsonwebtoken'
import 'dotenv/config'


export const authmiddle = async(req,res,next) =>{
    try{
    const authHeader = req.headers.authorization
   
    if(!authHeader){
        return res.status(401).json({message:"Token missing!!",status:false})
    }

    const token = authHeader.split(' ')[1]
   
        const decode = jwt.verify(token,process.env.SECRET_KEY)
        req.userid = decode.id
        next();
}
    catch(err){
        return res.status(401).json({message:"invalid",err:err.message})
    }

    
}

