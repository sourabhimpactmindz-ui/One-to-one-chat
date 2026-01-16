import app from "./app.js";
import Dbconnect from "./Config/user_config.js";
import http from 'http'
import { socketIo } from "./src/sockets.js";

const PORT = process.env.PORT || 3000;

const server = http.createServer(app)

socketIo(server)
const runserver = async() =>{
      await Dbconnect()
}
server.listen(PORT,() =>{
    console.log(`Server is running on ${PORT}`)
})

runserver()