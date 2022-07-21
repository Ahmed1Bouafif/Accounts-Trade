import mongoose from "mongoose"

const userSchema = mongoose.Schema({
  id: { type: String },
  userName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: false },
  googleId: { type: String, required: false },
})

export default mongoose.model("user", userSchema)
