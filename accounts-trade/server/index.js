import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import userRouter from "./routes/user.js"
import postRouter from "./routes/post.js"
import bodyParser from "body-parser"
import { Server } from "socket.io"
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
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
})

io.on("connection", (socket) => {
  console.log(socket.id)
})

// socket
