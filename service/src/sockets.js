import { Server } from "socket.io";
import { socketauth } from "../Middleware/sockiet_auth.js";

export const socketIo = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.use(socketauth);

  io.on("connection", (socket) => {
    console.log("user connected", socket.id);

    const userId = socket.user.id

    socket.join(userId)

    console.log(`user ${userId} join the private room`)

    socket.on("sendMessage", ({recevierId , message}) =>{
        io.to(recevierId).emit("recevieMessage" ,{
            sender : userId,
            message
        })
    })

    socket.on("disconnect", () => {
      console.log("user disconnected", socket.id);
    });
  });
};
