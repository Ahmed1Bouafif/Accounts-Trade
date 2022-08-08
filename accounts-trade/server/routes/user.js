import express from "express"
import { googleSignIn, signup, signin, searchUsers, getUser } from "../controllers/user.js"
const router = express.Router()

router.post("/signup", signup)
router.post("/signin", signin)
router.post("/googleSignIn", googleSignIn)
router.get("/searchUsers", searchUsers)
router.get("/getUser/:id", getUser)

export default router
