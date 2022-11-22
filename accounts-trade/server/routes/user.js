import express from "express"
import { googleSignIn, signup, signin, searchUsers, getUser, addFriend, acceptFriend, cancelAddFriend, getUserNotifsSeen, getUserNoti, changeUserName, getUserNotifs } from "../controllers/user.js"
import auth from "../middlewares/auth.js"

const router = express.Router()

router.post("/signup", signup)
router.post("/signin", signin)
router.post("/googleSignIn", googleSignIn)
router.get("/searchUsers", auth, searchUsers)
router.get("/getUser/:id", auth, getUser)
router.get("/getUserNoti", auth, getUserNoti)
router.get("/getUserNotifs", auth, getUserNotifs)
router.get("/getUserNotifsSeen", auth, getUserNotifsSeen)
router.post("/addFriend/:id", auth, addFriend)
router.post("/cancelAddFriend/:id", auth, cancelAddFriend)

router.post("/acceptFriend/:id", auth, acceptFriend)
router.post("/changeUserName/:id", auth, changeUserName)

export default router
