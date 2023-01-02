const express = require("express");
const app = express();
const server = require("http").createServer(app);
const cors = require("cors");
const socketIo = require("socket.io")(server, {
  cors: {
    origin: process.env.FRONT_URL,
    credentials: true,
  },
});
const socket = require("./src/socket")

const port = 4000;

app.use(cors({ origin: process.env.FRONT_URL, credentials: true })) // cors 미들웨어 사용
socket(socketIo); // src/socket/index.js에 socketIo 객체를 전달

server.listen(port, () => {
  console.log(
    `##### server is running on http://localhost:4000. ${new Date().toLocaleString()} #####`
  );
});