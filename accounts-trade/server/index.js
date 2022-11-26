import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import userRouter from "./routes/user.js"
import postRouter from "./routes/post.js"
import bodyParser from "body-parser"
import { Server } from "socket.io"
import { PostLike } from "./controllers/post.js"
// import { PostLike } from "./controllers/post.js"
import { init } from "./socket-io.js"
const app = express()
app.use(bodyParser.json({ limit: "200mb" }))
app.use(bodyParser.urlencoded({ limit: "200mb", extended: true }))
app.use(cors({ credentials: true, sameSite: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/users", userRouter)
app.use("/posts", postRouter)

// password: jemCUlMQhaXwLLLT
const MONGODB_URL = "mongodb+srv://ahmedbob:jemCUlMQhaXwLLLT@cluster0.b7e9h.mongodb.net/tradeaccounts?retryWrites=true&w=majority"

const port = 8000
const server = app.listen(port, () => console.log(`server running on port ${port}`))
mongoose
  .connect(MONGODB_URL)
  .then(server)
  .catch((err) => {
    console.log(`${err} did not connect`)
  })
export const io = init(server)
// console.log("=============== hhhhhhhhhhhhhhhhhhhhhh", io)

let onlineUsers = []
// let notifications = []
const addOnlineUser = (uid, sid) => {
  if (!onlineUsers.some(({ userId }) => userId === uid)) {
    onlineUsers.push({ userId: uid, socketId: sid })
  } else {
    let index
    if (
      onlineUsers.some(({ userId, socketId }, idx) => {
        if (userId === uid && socketId !== sid) {
          index = idx
          return true
        } else return false
      })
    ) {
      onlineUsers[index].socketId = sid
    }
  }
}
const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId)
  console.log(socketId)
}
const getUser = (id) => {
  return onlineUsers.find((user) => user.userId === id)
}
io.on("connection", (socket) => {
  // console.log("some one connected")
  // socket.emit("online_users", onlineUsers)
  // socket.emit("online_users", onlineUsers)

  socket.on("newUserOnline", (uid) => {
    addOnlineUser(uid, socket.id)
    console.log("=============Q ", onlineUsers)
    io.sockets.emit("online_users", onlineUsers)
  })
  // socket.on("send-like", function (data) {
  //   console.log("dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", data)
  //   const target = getUser(data?.poster)
  //   const targetTokent = target?.socketId || null
  //   // notifications = [...new Set([...notifications, data])]
  //   // notifications.push(data)
  //   // console.log([...new Set(notifications)])
  //   socket.to(targetTokent).emit("receive-like", data)
  //   console.log("fuuuuuuck", target)
  // })
  socket.on("send_comment", function (data) {
    console.log("dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", data)
    const target = getUser(data?.poster)
    const targetTokent = target?.socketId || null
    // notifications.push(data)
    socket.to(targetTokent).emit("receive_comment", data)
    console.log("fuuuuuuck", target)
  })
  socket.on("send_request", function (data) {
    const target = getUser(data?.poster)
    const targetTokent = target?.socketId || null
    // notifications.push(data)
    socket.to(targetTokent).emit("receive_request", data)
    console.log("fuuuuuuck", target)
  })

  socket.on("disconnect", () => {
    removeUser(socket.id)
    // socket.removeAllListeners()
    // socket.emit("online_users", onlineUsers)
    // socket.emit("online_users", onlineUsers)
    io.sockets.emit("online_users", onlineUsers)
    console.log(onlineUsers)
    console.log("oh he left")
  })
})
const socketIoObject = io
export default socketIoObject
// socket
