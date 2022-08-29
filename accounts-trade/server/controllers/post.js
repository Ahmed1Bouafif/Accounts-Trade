import PostModal from "../models/post.js"

export const createPost = async (req, res) => {
  const updatedPost = req.body
  const newPost = new PostModal({
    ...updatedPost,
    creator: req.userId,
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
  const { page } = req.query
  try {
    // const posts = await PostModal.find()
    // res.status(200).json(posts)
    const limit = 6
    const startIndex = (Number(page) - 1) * limit
    const total = await PostModal.countDocuments({})
    const posts = await PostModal.find().sort({ createdAt: -1 }).limit(limit).skip(startIndex)
    res.json({
      data: posts,
      currentPage: Number(page),
      totalPosts: total,
      numberOfPages: Math.ceil(total / limit),
    })
  } catch (error) {
    res.status(404).json({ message: "Something Went Wrong" })
  }
}
export const getPostsByUser = async (req, res) => {
  const { id } = req.params
  try {
    const posts = await PostModal.find({ creator: id })
    res.status(200).json(posts)
  } catch (error) {
    res.status(404).json({ message: "Something Went Wrong" })
  }
}
export const deletePostById = async (req, res) => {
  try {
    const posts = await PostModal.find({ _id: Object.keys(req.body)[0] })
    // console.log(Object.keys(req.body)[0])
    // console.log(posts)
    const deletedPost = await PostModal.deleteOne({ _id: Object.keys(req.body)[0] })
    // console.log("deleted======>", deletedPost)
    res.status(200).json({ posts, deletedPost })
  } catch (error) {
    res.status(404).json({ message: "Something Went Wrong" })
  }
}

export const PostLike = async (req, res) => {
  const { id } = req.params
  try {
    const post = await PostModal.findById(id)
    const index = post.likes.findIndex((id) => id === String(req.userId))
    if (index === -1) {
      post.likes.push(req.userId)
    } else {
      post.likes = post.likes.filter((id) => id !== String(req.userId))
    }
    const updatesPost = await PostModal.findByIdAndUpdate(id, post, { new: true })
    res.status(200).json(updatesPost)
  } catch (error) {
    res.status(404).json({ message: "Something Went Wrong" })
  }
}
