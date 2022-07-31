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
  const { firstName, lastName, email, password } = req.body
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
  const { email, userName, token, googleId } = req.body
  try {
    const olduser = await UserModal.findOne({ email })
    if (olduser) {
      const result = { _id: olduser._id.toString(), email, userName }
      return res.status(200).json({ result, token })
    }
    const result = await UserModal.create({
      email,
      userName,
      googleId,
    })
    res.status(200).json({ result, token })
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" })
    console.log(error)
  }
}
