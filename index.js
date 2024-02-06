/** @format */

const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("user connected", socket.id);

  socket.on("join_room",(data)=>{
     if (socket.room) {
       socket.leave(socket.room);
     }
    socket.join(data);
    socket.room = data;
  })
  socket.on("SendMsg", (data) => {
    console.log(data);
    socket.to(socket.room).emit("recived_msg", data.msg, socket.id);
  });

});

server.listen(3000, () => {
  console.log("server is on 3001");
});
