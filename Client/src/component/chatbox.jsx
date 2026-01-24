import { useEffect, useState } from "react";
import { getMessage, Sendmessage } from "../service/userservice/userservice";
import socket from "../Socket/socket";

const loggedUserId = JSON.parse(localStorage.getItem("user"))?._id;
console.log("mee =>" , loggedUserId)

export const Chatbox = ({ selectedUser, chatId }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");


  useEffect(() => {
    if (!chatId) return;

    const loadMessages = async () => {
      const res = await getMessage(chatId);
      setMessages(res.message || []);
    };

    loadMessages();
  }, [chatId]);

 
  useEffect(() => {
    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });


    
    return () => socket.off("receiveMessage");
  }, []);

 
  const handleSend = async () => {
    if (!text.trim()) return;

    const res = await Sendmessage({ chatId, text });
    const newMessage = res.newMessage;

    setMessages((prev) => [...prev, newMessage]);
    socket.emit("sendMessage", {
      message: newMessage,
      receiverId: selectedUser._id,
    });

    setText("");
  };

  if (!selectedUser) {
    return <div className="chat-window">Select a user</div>;
  }

  return (
    <div className="chat-window">

      
      <div className="chat-header">
        <div className="avatar">
          {selectedUser.name.charAt(0)}
        </div>
        <span>{selectedUser.name}</span>
      </div>


     <div className="messages">
  {messages.map((msg) => {
    const senderId =
  typeof msg.SenderId === "object"
    ? msg.SenderId._id
    : msg.SenderId;

const isSender = senderId?.toString() === loggedUserId?.toString();

    return (
      <div
        key={msg._id}
        className={`message ${isSender ? "sent" : "received"}`}
      >
        {msg.text}
      </div>
    );
  })}
</div>

      
      <div className="message-input">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message"
        />
        <button onClick={handleSend}>➤</button>
      </div>
    </div>
  );
};
