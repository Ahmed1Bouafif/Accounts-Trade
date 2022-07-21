import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import userRouter from "./routes/user.js"
const app = express()

app.use(cors({ credentials: true, sameSite: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/users", userRouter)
// password: jemCUlMQhaXwLLLT
const MONGODB_URL = "mongodb+srv://ahmedbob:jemCUlMQhaXwLLLT@cluster0.b7e9h.mongodb.net/tradeaccounts?retryWrites=true&w=majority"

const port = 8000

mongoose
  .connect(MONGODB_URL)
  .then(app.listen(port, () => console.log(`server running on port ${port}`)))
  .catch((err) => {
    console.log(`${err} did not connect`)
  })
