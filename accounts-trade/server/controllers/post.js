import PostModal from "../models/post.js"
import UserModal from "../models/user.js"
// import { io } from "../socket-io.js"
import socketIoObject from "../index.js"
// import { getIO } from "../socket-io.js"
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
  try {
    const { page } = req.query
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
export const getOnePost = async (req, res) => {
  const { post } = req.query
  try {
    // console.log("======.......==>", post)
    const posts = await PostModal.find({ _id: post })
    // console.log("=======================........>", posts)
    res.status(200).json(posts[0])
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

// export const PostLikeSocket = (r, s) => {
//   return s + r
// }
// let bob

export const PostLike = async (req, res) => {
  const { id } = req.params
  try {
    const post = await PostModal.findById(id)
    const likerr = await UserModal.findById(req.userId)
    const index = post.likes.findIndex((id) => id === String(req.userId))
    if (index === -1) {
      post.likes.push(req.userId)
    } else {
      post.likes = post.likes.filter((id) => id !== String(req.userId))
    }
    // console.log(post)
    const updatesPost = await PostModal.findByIdAndUpdate(id, post, { new: true })
    const postCreator = await UserModal.findById(post.creator)
    // console.log(postCreator.notifications.findIndex((user) => String(user.postId + user.liker) === String(id + req.userId)) === -1)
    // console.log(postCreator.notifications.findIndex((user) => String(user.liker) === String(req.userId)) === -1)
    let bob = { type: "like", postId: id, liker: { id: req.userId, name: likerr.userName, image: likerr.userImage }, poster: post.creator, sendAt: new Date(), seen: false, opened: false }
    if (postCreator.notifications.findIndex((user) => String(user?.liker?.id) === String(req.userId)) === -1 || postCreator.notifications.findIndex((user) => String(user?.postId + user?.liker?.id) === String(id + req.userId)) === -1) {
      postCreator.notifications.push(bob)
      socketIoObject.sockets.emit("receive-like", bob)
      console.log("goo", bob)
    }
    // getIO().on("send-like", () => {
    // })

    // io.on.socket.on("worksss", function (data) {
    //   console.log("dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", data)
    //   io.on.socket.emit("works", { type: "like", postId: id, liker: req.userId, poster: post.creator, sendAt: new Date(), seen: false, opened: false })
    //   console.log("fuuuuuuck", "PostLike(data)")
    // })
    // console.log("new", postCreator)

    const sendNofit = await UserModal.findByIdAndUpdate(post.creator, postCreator, { new: true })
    // console.log("newnew", sendNofit)
    // console.log("newnewnew", updatesPost)
    // const bob = { type: "like", postId: id, liker: req.userId, poster: post.creator, sendAt: new Date(), seen: false, opened: false }
    res.status(200).json({ updatesPost, sendNofit, bob })
    // PostLikeSocket("bob", "hahaha works")
    // res.status(200).json(sendNofit)
  } catch (error) {
    res.status(404).json({ message: "Something Went Wrong" })
  }
}

export const comment = async (req, res) => {
  const { id } = req.params
  // const { comment, _id } = req.body
  // console.log("1111111111", comment)
  // console.log("2222222222", _id)
  // console.log(req.body)

  try {
    const post = await PostModal.findById(id)
    const commenterr = await UserModal.findById(Object.values(req.body)[1])
    post.comments.push({ commnterName: { n: commenterr.userName, i: commenterr.userImage }, commenter: Object.values(req.body)[1], comment: Object.values(req.body)[0], sendAt: new Date(), likes: [] })
    const updatesPost = await PostModal.findByIdAndUpdate(id, post, { new: true })
    const postCreator = await UserModal.findById(post.creator)

    let bob = { type: "comment", postId: id, commenter: { id: Object.values(req.body)[1], name: commenterr.userName, image: commenterr.userImage }, poster: post.creator, sendAt: new Date(), seen: false, opened: false }
    if (postCreator.notifications.findIndex((user) => String(user?.commenter?.id) === String(Object.values(req.body)[1])) === -1 || postCreator.notifications.findIndex((user) => String(user?.postId + user?.commenter?.id) === String(id + Object.values(req.body)[1])) === -1) {
      postCreator.notifications.push(bob)
      socketIoObject.sockets.emit("receive-comment", bob)
      console.log("goo", bob)
    }
    const sendNofit = await UserModal.findByIdAndUpdate(post.creator, postCreator, { new: true })
    res.status(200).json({ updatesPost, sendNofit, bob })
  } catch (error) {
    res.status(404).json({ message: "Something Went Wrong" })
  }
}
