import bcrypt from "bcryptjs"
import Jwt from "jsonwebtoken"

import UserModal from "../models/user.js"
import socketIoObject from "../index.js"

const secret = "bobthebuilder"

export const signin = async (req, res) => {
  const { email, password } = req.body
  try {
    const userExisted = await UserModal.findOne({ email })

    if (!userExisted) return res.status(404).json({ message: "user doesn't exist" })

    const isPasswordCorrect = await bcrypt.compare(password, userExisted.password)

    if (!isPasswordCorrect) return res.status(400).json({ message: "password isn't correct" })

    const token = Jwt.sign(
      {
        id: userExisted._id,
        email: userExisted.email,
      },
      secret,
      { expiresIn: "5h" }
    )

    res.status(200).json({ result: userExisted, token })
  } catch (error) {
    res.status(500).json({ message: "something went wrong" })
    // console.log(error)
  }
}

export const signup = async (req, res) => {
  const { firstName, lastName, email, password, userImage } = req.body
  try {
    const userExisted = await UserModal.findOne({ email })

    if (userExisted) {
      return res.status(400).json({ message: "User Already Existed" })
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const result = await UserModal.create({
      email,
      password: hashedPassword,
      userName: `${firstName} ${lastName}`,
      userImage,
    })

    const token = Jwt.sign(
      {
        id: result._id,
        email: result.email,
      },
      secret,
      { expiresIn: "5h" }
    )

    res.status(201).json({ result, token })
  } catch (error) {
    res.status(500).json({ message: "something went wrong" })
  }
}

export const googleSignIn = async (req, res) => {
  const { email, userName, token, googleId, userImage, sentFriendRequestes, receivedFriendRequestes, friends } = req.body
  try {
    const olduser = await UserModal.findOne({ email })
    if (olduser) {
      const result = { _id: olduser._id.toString(), email, userName, userImage, sentFriendRequestes, receivedFriendRequestes, friends }
      return res.status(200).json({ result, token })
    }
    const result = await UserModal.create({
      email,
      userName,
      userImage,
      googleId,
      sentFriendRequestes,
      receivedFriendRequestes,
      friends,
    })
    res.status(200).json({ result, token })
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" })
  }
}

export const searchUsers = async (req, res) => {
  try {
    const allUsers = await UserModal.find()
    res.status(200).json(allUsers)
  } catch (error) {
    res.status(500).json({ message: "Something Went Wrong" })
  }
}

export const getUser = async (req, res) => {
  const { id } = req.params
  try {
    // console.log("1")
    // console.log(id)
    const user = await UserModal.findByIdAndUpdate(id, {})
    // console.log(user)
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: "Something Went Wrong" })
  }
}
export const getUserNoti = async (req, res) => {
  const { usernoti } = req.query
  try {
    // console.log("1")
    // console.log(id)
    const user = await UserModal.findByIdAndUpdate(usernoti, {})
    // console.log(user)
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: "Something Went Wrong" })
  }
}
export const getUserNotifs = async (req, res) => {
  const { notifs } = req.query
  try {
    // console.log("1")
    // console.log(notifs)

    const user = await UserModal.findByIdAndUpdate(notifs, {})
    const notif = await user.notifications

    // console.log(user)
    // console.log(notif)
    res.status(200).json(notif)
  } catch (error) {
    res.status(500).json({ message: "Something Went Wrong" })
  }
}
export const getUserNotifsSeen = async (req, res) => {
  const { notifs } = req.query
  try {
    // console.log("1")
    // console.log(notifs)

    const user = await UserModal.findByIdAndUpdate(notifs, {})
    user.notifications.map((u) => (u.seen = true))
    const newNotifs = await UserModal.findByIdAndUpdate(notifs, user)
    // console.log(user)
    // console.log("==========>", newNotifs)
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: "Something Went Wrong" })
  }
}

export const addFriend = async (req, res) => {
  const { id } = req.params

  try {
    // console.log("1")
    // console.log(req.body)
    const userReceiver = await UserModal.findById(id)
    const userSender = await UserModal.findById(Object.keys(req.body)[0])
    const RId = Object.keys(req.body)[0]
    userReceiver.receivedFriendRequestes.push(RId)
    userSender.sentFriendRequestes.push(id)
    // await UserModal.updateOne(userSender, { sentFriendRequestes: [...userSender.sentFriendRequestes, id] }, { new: true })
    let bob = { type: "sendRequest", receiver: id, sender: { id: Object.keys(req.body)[0], name: userSender.userName, image: userSender.userImage }, sendAt: new Date(), seen: false, opened: false }
    if (userReceiver.notifications.findIndex((user) => String(user?.sender?.id) === id) === -1 || userReceiver.notifications.findIndex((user) => String(user?.receiver + user?.sender?.id) === String(id + Object.keys(req.body)[0])) === -1) {
      userReceiver.notifications.push(bob)
      socketIoObject.sockets.emit("receive-request", bob)
      console.log("goo", bob)
    }
    // userReceiver.notifications.push(bob)
    // const sendNofit = await UserModal.findByIdAndUpdate(id, userReceiver, { new: true })
    const sendNofit = await UserModal.findByIdAndUpdate(id, userReceiver, { new: true })
    await UserModal.findByIdAndUpdate(RId, userSender, { new: true })

    console.log(userReceiver.notifications.findIndex((user) => String(user.sender) === String(Object.keys(req.body)[0])) === -1 || userReceiver.notifications.findIndex((user) => String(user.receiver + user.sender) === String(id + Object.keys(req.body)[0])) === -1)
    res.status(200).json({ message: "Invation Sent", sendNofit, bob })
  } catch (error) {
    res.status(500).json({ message: "Something Went Wrong" })
  }
}
export const cancelAddFriend = async (req, res) => {
  const { id } = req.params
  try {
    // console.log("1")
    // console.log(req.body)
    const userReceiver = await UserModal.findById(id)
    const userSender = await UserModal.findById(Object.keys(req.body)[0])
    const RId = Object.keys(req.body)[0]

    // console.log("2")
    userReceiver.receivedFriendRequestes = [...userReceiver.receivedFriendRequestes.slice(0, userReceiver.receivedFriendRequestes.indexOf(Object.keys(req.body)[0])), ...userReceiver.receivedFriendRequestes.slice(userReceiver.receivedFriendRequestes.indexOf(Object.keys(req.body)[0]) + 1, userReceiver.receivedFriendRequestes.length)]
    userSender.sentFriendRequestes = [...userSender.sentFriendRequestes.slice(0, userSender.sentFriendRequestes.indexOf(id)), ...userSender.sentFriendRequestes.slice(userSender.sentFriendRequestes.indexOf(id) + 1, userSender.sentFriendRequestes.length)]
    // await UserModal.updateOne(userSender, { sentFriendRequestes: [...userReceiver.sentFriendRequestes.slice(0, userReceiver.sentFriendRequestes.indexOf(id)), ...userReceiver.sentFriendRequestes.slice(userReceiver.sentFriendRequestes.indexOf(id) + 1, userReceiver.sentFriendRequestes.length)] }, { new: true })
    // console.log(userReceiver.friends)
    var bob1 = userReceiver.notifications.findIndex((user) => String(user?.sender?.id) === String(Object.keys(req.body)[0]))
    var bob2 = userReceiver.notifications.findIndex((user) => String(user.receiver + user?.sender?.id) === String(id + Object.keys(req.body)[0]))

    if (bob1 !== -1) {
      userReceiver.notifications.splice(bob1, 1)
    } else if (bob2 !== -1) {
      userReceiver.notifications.splice(bob2, 1)
    }
    // const sendNofit = await UserModal.findByIdAndUpdate(id, userReceiver, { new: true })
    const sendNofit = await UserModal.findByIdAndUpdate(id, userReceiver, { new: true })
    await UserModal.findByIdAndUpdate(RId, userSender, { new: true })
    res.status(200).json({ message: "Your Invitation Canceled", sendNofit })
  } catch (error) {
    res.status(500).json({ message: "Something Went Wrong" })
  }
}
export const acceptFriend = async (req, res) => {
  const { id } = req.params

  try {
    // console.log("1")
    // console.log(req.body)
    const userReceiver = await UserModal.findById(id)
    const userSender = await UserModal.findById(Object.keys(req.body)[0])
    const RId = Object.keys(req.body)[0]
    userReceiver.receivedFriendRequestes = [...userReceiver.receivedFriendRequestes.slice(0, userReceiver.receivedFriendRequestes.indexOf(Object.keys(req.body)[0])), ...userReceiver.receivedFriendRequestes.slice(userReceiver.receivedFriendRequestes.indexOf(Object.keys(req.body)[0]) + 1, userReceiver.receivedFriendRequestes.length)]
    userSender.sentFriendRequestes = [...userSender.sentFriendRequestes.slice(0, userSender.sentFriendRequestes.indexOf(id)), ...userSender.sentFriendRequestes.slice(userSender.sentFriendRequestes.indexOf(id) + 1, userSender.sentFriendRequestes.length)]
    userReceiver.friends = [...userReceiver.friends, RId]
    userReceiver.chat[RId] = []
    userSender.friends = [...userReceiver.friends, id]
    userSender.chat[id] = []

    await UserModal.findByIdAndUpdate(id, userReceiver, { new: true })
    await UserModal.findByIdAndUpdate(RId, userSender, { new: true })
    // console.log(userReceiver.friends)
    // console.log("2")
    // await UserModal.updateOne(userReceiver, { friends: [...userReceiver.friends, Object.keys(req.body)[0]] })
    // await UserModal.updateOne(userSender, { friends: [...userReceiver.friends, id] })
    // console.log(userReceiver.friends)
    res.status(200).json({ message: `You And ${userReceiver.userName} Are Friends Now` })
  } catch (error) {
    res.status(500).json({ message: "Something Went Wrong" })
  }
}

export const changeUserName = async (req, res) => {
  const { id } = req.params
  // const { userName } = req.body
  try {
    const user = await UserModal.findById(id)
    await UserModal.updateOne(user, { userName: Object.keys(req.body)[0] })
    res.status(200).json({ message: `Your Name Is ${Object.keys(req.body)[0]} Now`, newName: Object.keys(req.body)[0] })
  } catch (error) {
    res.status(500).json({ message: "Something Went Wrong" })
  }
}
export const sendMsg = async (req, res) => {
  const { id, _id, msg } = req.body
  // console.log(id)
  // console.log(_id)
  // console.log(msg)

  // const { userName } = req.body
  try {
    const userSender = await UserModal.findById(_id)
    const userReceiver = await UserModal.findById(id)

    if (userSender.chat.hasOwnProperty(id)) {
      userSender.chat[id].push({ sender: _id, msg: msg, sendAt: new Date(), seen: false })
    } else {
      userSender.chat[id] = [{ sender: _id, msg: msg, sendAt: new Date(), seen: false }]
    }
    if (userReceiver.chat.hasOwnProperty(_id)) {
      userReceiver.chat[_id].push({ sender: _id, msg: msg, sendAt: new Date(), seen: false })
    } else {
      userReceiver.chat[_id] = [{ sender: _id, msg: msg, sendAt: new Date(), seen: false }]
    }
    await UserModal.findByIdAndUpdate(_id, userSender, { new: true })
    await UserModal.findByIdAndUpdate(id, userReceiver, { new: true })

    res.status(200).json({ message: "Msg sent", userSender })
  } catch (error) {
    res.status(500).json({ message: "Something Went Wrong" })
  }
}
