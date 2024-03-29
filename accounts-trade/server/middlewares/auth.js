import jwt from "jsonwebtoken"
import UserModel from "../models/user.js"
const secret = "bobthebuilder"
const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]
    const isCustomAuth = token.length < 500
    let decodedData
    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, secret)
      req.userId = decodedData?.id
    } else {
      decodedData = jwt.decode(token)
      const googleId = decodedData?.sub.toString()
      const user = await UserModel.findOne({ googleId })
      req.userId = user?._id
    }
    next && next()
  } catch (error) {
    // window.location.href = "/login"
    // localStorage.clear()
    // res.redirect({
    //   pathname: "/login",
    // })
  }
}
export default auth
