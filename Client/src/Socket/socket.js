import React from 'react'
import { io } from "socket.io-client";


const token =  localStorage.getItem("token")

const Socket = io("http://localhost:5001",{
    reconnection: true,          
    reconnectionAttempts: 1 ,
    auth : ({token}),
    autoConnect : false
}  
)

export default Socket