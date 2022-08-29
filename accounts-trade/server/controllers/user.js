import bcrypt from "bcryptjs"
import Jwt from "jsonwebtoken"

import UserModal from "../models/user.js"

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
    console.log(error)
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
    console.log(error)
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
    console.log(error)
  }
}

export const searchUsers = async (req, res) => {
  try {
    const allUsers = await UserModal.find()
    res.status(200).json(allUsers)
  } catch (error) {
    res.status(200).json({ message: "Something Went Wrong" })
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
    res.status(200).json({ message: "Something Went Wrong" })
  }
}

export const addFriend = async (req, res) => {
  const { id } = req.params

  try {
    // console.log("1")
    console.log(req.body)
    const userReceiver = await UserModal.findById(id)
    const userSender = await UserModal.findById(Object.keys(req.body)[0])
    console.log(userReceiver.friends)
    // console.log("2")
    await UserModal.updateOne(userReceiver, { receivedFriendRequestes: [...userReceiver.receivedFriendRequestes, Object.keys(req.body)[0]] })
    await UserModal.updateOne(userSender, { sentFriendRequestes: [...userSender.sentFriendRequestes, id] })
    console.log(userReceiver.friends)
    res.status(200).json({ message: "Invation Sent" })
  } catch (error) {
    res.status(200).json({ message: "Something Went Wrong" })
  }
}
export const cancelAddFriend = async (req, res) => {
  const { id } = req.params
  try {
    // console.log("1")
    console.log(req.body)
    const userReceiver = await UserModal.findById(id)
    const userSender = await UserModal.findById(Object.keys(req.body)[0])
    console.log("ggggggggggggggggggggggggggggggggggggggggggggg", Object.keys(req.body)[0])
    // console.log("2")
    await UserModal.updateOne(userReceiver, { receivedFriendRequestes: [...userReceiver.receivedFriendRequestes.slice(0, userReceiver.receivedFriendRequestes.indexOf(Object.keys(req.body)[0])), ...userReceiver.receivedFriendRequestes.slice(userReceiver.receivedFriendRequestes.indexOf(Object.keys(req.body)[0]) + 1, userReceiver.receivedFriendRequestes.length)] })
    await UserModal.updateOne(userSender, { sentFriendRequestes: [...userReceiver.sentFriendRequestes.slice(0, userReceiver.sentFriendRequestes.indexOf(id)), ...userReceiver.sentFriendRequestes.slice(userReceiver.sentFriendRequestes.indexOf(id) + 1, userReceiver.sentFriendRequestes.length)] })
    console.log(userReceiver.friends)
    res.status(200).json({ message: "Your Invitation Canceled" })
  } catch (error) {
    res.status(200).json({ message: "Something Went Wrong" })
  }
}
export const acceptFriend = async (req, res) => {
  const { id } = req.params

  try {
    // console.log("1")
    console.log(req.body)
    const userReceiver = await UserModal.findById(id)
    const userSender = await UserModal.findById(Object.keys(req.body)[0])
    console.log(userReceiver.friends)
    // console.log("2")
    await UserModal.updateOne(userReceiver, { friends: [...userReceiver.friends, Object.keys(req.body)[0]] })
    await UserModal.updateOne(userSender, { friends: [...userReceiver.friends, id] })
    console.log(userReceiver.friends)
    res.status(200).json({ message: `You And ${userReceiver.userName} Are Friends Now` })
  } catch (error) {
    res.status(200).json({ message: "Something Went Wrong" })
  }
}

export const changeUserName = async (req, res) => {
  const { id } = req.params
  // const { userName } = req.body
  // console.log(req.body)
  try {
    const user = await UserModal.findById(id)
    await UserModal.updateOne(user, { userName: Object.keys(req.body)[0] })
    res.status(200).json({ message: `Your Name Is ${Object.keys(req.body)[0]} Now`, newName: Object.keys(req.body)[0] })
  } catch (error) {
    res.status(200).json({ message: "Something Went Wrong" })
  }
}
