import React, { useEffect, useState } from "react";
import { accesschats, fatchchats } from "../service/userservice/userservice";
import socket from "../Socket/socket";
import { Chatbox } from "../component/chatbox";
import Chatlist from "../component/chatlist";

const myId = JSON.parse(localStorage.getItem("user"))?._id;

const Chat = () => {
  const [chats, setChats] = useState([]);       
  const [selectedChat, setSelectedChat] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    socket.connect();
    return () => socket.disconnect();
  }, []);

  useEffect(() => {
    const loadChats = async () => {
      try {
        const data = await fatchchats();   
        setChats(data.user || []);
      } catch (err) {
        console.log(err);
        setChats([]);
      }
    };

    loadChats();
  }, []);

  const handleChat = async (userId) => {
    try {
      const chat = await accesschats({userId}); 
      setSelectedChat(chat);

      const otherUser = chat.users.find(
        (u) => u._id !== myId
      );

      if (!otherUser) return;
      setSelectedUser(otherUser);
    } catch (err) {
      console.log(err);
    }
  };
  

  return (
    <div className="chat-container">
   
      <div className="sidebar">
        <div className="sidebar-header">Chats</div>

       
        <Chatlist onSelect={(user) => handleChat(user._id)} />

      
        {Array.isArray(chats) &&
          chats.map((chat) => {
            const otherUser = chat.users?.find(
              (u) => u._id !== myId
            );

            return (
              <div
                className="chat-user"
                key={chat._id}
                onClick={() => handleChat(otherUser?._id)}
              >
                <div className="user-info">
                  <h4>{otherUser?.name}</h4>
                  <p>Click to chat</p>
                </div>
              </div>
            );
          })}
      </div>

    
      <Chatbox
        selectedUser={selectedUser}
        chatId={selectedChat?._id}
      />
    </div>
  );
};

export default Chat;
