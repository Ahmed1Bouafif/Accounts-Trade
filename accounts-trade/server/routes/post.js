import express from "express"
import { createPost, getPosts, getPostsByUser, deletePostById, PostLike, getOnePost, comment } from "../controllers/post.js"
import auth from "../middlewares/auth.js"
const router = express.Router()

router.post("/", auth, createPost)
router.get("/", auth, getPosts)
router.get("/OnePost", auth, getOnePost)
router.get("/:id", auth, getPostsByUser)
router.patch("/delete", auth, deletePostById)
router.post("/comment/:id", auth, comment)
router.post("/like/:id", auth, PostLike)

export default router
