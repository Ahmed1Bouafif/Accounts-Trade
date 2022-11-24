import React from "react"
// import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

const OneChatUser = ({ setThereIsOpenChat, user }) => {
  //   const navigate = useNavigate()
  const { userConnected } = useSelector((state) => ({ ...state.auth }))

  return (
    <div onClick={() => setThereIsOpenChat()} className="ownerC">
      <div className="imgN">
        <img className="ownerimgC" src={user?.userImage} alt="" />
        <div className="flexCol">
          <p className="descriptionx">{userConnected.result._id === user?._id ? "Me (save ur stuff xD)" : user?.userName}</p>
          <p>this is the last message</p>
        </div>
      </div>
      <p>22:30</p>
    </div>
  )
}

export default OneChatUser
