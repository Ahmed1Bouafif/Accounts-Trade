import express from "express"
import { googleSignIn, signup, signin, searchUsers, getUser, addFriend, acceptFriend, cancelAddFriend, changeUserName } from "../controllers/user.js"
import auth from "../middlewares/auth.js"

const router = express.Router()

router.post("/signup", signup)
router.post("/signin", signin)
router.post("/googleSignIn", googleSignIn)
router.get("/searchUsers", auth, searchUsers)
router.get("/getUser/:id", auth, getUser)
router.post("/addFriend/:id", auth, addFriend)
router.post("/cancelAddFriend/:id", auth, cancelAddFriend)

router.post("/acceptFriend/:id", auth, acceptFriend)
router.post("/changeUserName/:id", auth, changeUserName)

export default router
