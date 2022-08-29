import express from "express"
import { createPost, getPosts, getPostsByUser, deletePostById, PostLike } from "../controllers/post.js"
import auth from "../middlewares/auth.js"
const router = express.Router()

router.post("/", auth, createPost)
router.get("/", auth, getPosts)
router.get("/:id", auth, getPostsByUser)
router.post("/delete", auth, deletePostById)
router.patch("/like/:id", auth, PostLike)

export default router
