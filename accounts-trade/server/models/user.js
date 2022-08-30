import mongoose from "mongoose"

const userSchema = mongoose.Schema({
  id: { type: String },
  userName: { type: String, required: true },
  email: { type: String, required: true },
  userImage: { type: String, required: false },
  password: { type: String, required: false },
  googleId: { type: String, required: false },
  sentFriendRequestes: [String],
  receivedFriendRequestes: [String],
  friends: [String],
  notifications: [],
})

export default mongoose.model("user", userSchema)
