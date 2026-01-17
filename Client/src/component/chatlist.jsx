import React, { useEffect, useState } from 'react'
import { userGet } from '../service/userservice/userservice'

const Chatlist = ({onSelect}) => {
  const [users,setuser] = useState([])

  const myId = JSON.parse(localStorage.getItem("user"))?._id;

    const fetchusers = async() =>{
      try{
        const res = await userGet()
        setuser(res.user || [])

      }catch(err){
        console.log(err)
      }
    }

    useEffect(() =>{
      fetchusers()
    },[])
  
    
  return (
   <>
   <div className="chatlist-container">
      {users
        .filter((u) => u._id !== myId) 
        .map((user) => (
          <div
            key={user._id}
            className="chat-user"
            onClick={() => onSelect(user)}
          >
            <div className="user-info">
              <h4>{user.name}</h4>
              <p>Click to chat</p>
            </div>
          </div>
        ))}
    </div>
   
   </>
  )
}

export default Chatlist