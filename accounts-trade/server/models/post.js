import mongoose from "mongoose"

const postSchema = mongoose.Schema({
  id: String || "",
  typeOfPost: String,
  title: String,
  description: String,
  name: String,
  creator: String || "",
  imageFile: {
    type: String,
    default: "bla bla",
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  likeCount: {
    type: Number,
    default: 0,
  },
})

export default mongoose.model("post", postSchema)
