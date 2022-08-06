import PostModal from "../models/post.js"

export const createPost = async (req, res) => {
  const post = req.body
  const newPost = new PostModal({
    ...post,
    createdAt: new Date().toISOString(),
  })

  try {
    await newPost.save()
    res.status(201).json(newPost)
  } catch (error) {
    res.status(404).json({ message: "Something Went Wrong" })
  }
}

export const getPosts = async (req, res) => {
  try {
    const posts = await PostModal.find()
    res.status(200).json(posts)
  } catch (error) {
    res.status(404).json({ message: "Something Went Wrong" })
  }
}
