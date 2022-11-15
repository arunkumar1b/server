
// const express = require("express");
// const app = express();
// const http = require("http");
// const cors = require("cors");
// const { Server } = require("socket.io");
// // const siofu = require("socketio-file-upload");
// app.use(cors());

// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: "http://192.168.0.110:3000",
//     methods: ["GET", "POST"],
//   },
// });
// const users = {}
// io.on("connection", (socket) => {
    
// //   console.log(`User Connected: ${socket.id}`);
//   console.log("User Connect:" + socket.id);
    
  
  
// //   socket.on("join_room", (data) => {
// //     socket.join(data);
// //     console.log(`User with ID: ${socket.id} joined room: ${data}`);
    
// //   });
 
// //   socket.on("send_message", (data) => {
// //     socket.to(data.room).emit("receive_message", data);
// //     console.log(data)
// //   });

//   socket.on("disconnect", () => {
//     console.log("User Disconnected" + socket.id);
//   });

//   socket.on("new_user", (username) => {
//     console.log("Server :" + username);

//     // users[username] = socket.id;
//     // io.emit("new_user", users)


//   });
// });

// server.listen(3001, () => {
//   console.log("SERVER RUNNING");
  
// });

const app = require("express")();
 const http = require("http");
 const cors = require("cors");
 const { Server } = require("socket.io");

 app.use(cors())
 const server = http.createServer(app);
 const io = new Server(server, {
   cors: {
     origin: "http://192.168.0.110:3000",
     methods: ["GET", "POST"],
   },
 });
// const PORT = 7000;


const users = {};

io.on("connection", (socket) => {
  console.log("someone connecte and socket id " + socket.id);

  socket.on("disconnect", () => {
    console.log(`${socket.id} disconnected`);

    for (let user in users) {
      if (users[user] === socket.id) {
        delete users[user];
      }
    }

    io.emit("all_users", users);
  });

  socket.on("new_user", (username) => {
    console.log("Server : " + username);
    users[username] = socket.id;

    //we can tell every other users someone connected
    io.emit("all_users", users);
  });

  socket.on("send_message", (data) => {
    console.log(data);

    const socketId = users[data.receiver];
    io.to(socketId).emit("new_message", data);
  });
});

// httpServer.listen(PORT, () => {
//   console.log(`Server Listening on port ${PORT}`);
// });
server.listen(3001, () => {
  console.log("SERVER RUNNING")
});