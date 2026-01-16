import React, { useEffect, useState } from 'react'
import { accesschats, fatchchats } from '../service/userservice/userservice'

export const Chat=() =>{
  const [chats,setchats] = useState([])
  const [selectedChat,setselectedchat] =useState(null)

    useEffect(() =>{
      const loadchats = async() =>{
        try{
        const res = await fatchchats()
        setchats(res)
      }catch(err){
      console.log(err)
    }
    }
    loadchats()

    },[])

  
    const handlechat = async(userId) =>{
      try{

        const chat = await accesschats({userId})
        setselectedchat(chat)

        if((c) => c.id == chat._id){
          setselectedchat([chat , ...chats])
        }


      }catch(err){
        console.log(err)
      }
    }


  return (
   <div className="chat-app">
      
     
      <div className="sidebar">
        <div className="sidebar-header">
          <h3>Chats</h3>
        </div>

        <div className="chat-list">
          {chats.map((chat) => {
            const otherUser = chat.users.find(u => u._id !== myId)

            return (
              <div
                key={chat._id}
                className={`chat-item ${
                  selectedChat?._id === chat._id ? "active" : ""
                }`}
                onClick={() => handlechat(otherUser?._id)}
              >
                <div className="avatar">
                  {otherUser?.name?.charAt(0).toUpperCase()}
                </div>

                <div className="chat-info">
                  <h4>{otherUser?.name}</h4>
                  <p>{chat.lastmessage?.content || "No messages yet"}</p>
                </div>

                <span className="time">
                  {chat.lastmessage
                    ? new Date(chat.lastmessage.createdAt).toLocaleTimeString()
                    : ""}
                </span>
              </div>
            )
          })}
        </div>
      </div>


      <div className="chat-window">
        {selectedChat ? (
          <>

            <div className="chat-header">
              <div className="avatar">
                {
                  selectedChat.users
                    .find(u => u._id !== myId)
                    ?.name?.charAt(0)
                }
              </div>
              <h4>
                {
                  selectedChat.users
                    .find(u => u._id !== myId)
                    ?.name
                }
              </h4>
            </div>

            <div className="messages">
              {selectedChat.messages?.length > 0 ? (
                selectedChat.messages.map((msg) => (
                  <div
                    key={msg._id}
                    className={`message ${
                      msg.sender._id === myId ? "sent" : "received"
                    }`}
                  >
                    {msg.content}
                  </div>
                ))
              ) : (
                <p className="no-msg">No messages yet</p>
              )}
            </div>

            <div className="message-input">
              <input type="text" placeholder="Type a message" />
              <button>Send</button>
            </div>
          </>
        ) : (
          <div className="no-chat">
            <h2>Select a chat to start messaging</h2>
          </div>
        )}
      </div>
    </div>
  )
}

export default Chat