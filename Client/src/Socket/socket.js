import React from 'react'
import { io } from "socket.io-client";

const Socket = io("http://localhost:5001",{
    reconnection: true,          
    reconnectionAttempts: 1 ,
    auth : {
    token : localStorage.getItem("token")
  }
}  
)

export default Socket