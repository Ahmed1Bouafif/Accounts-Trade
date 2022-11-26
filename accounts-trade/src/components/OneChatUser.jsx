import React from "react"
import { useEffect, useState } from "react"
// import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import useSocket from "../Socket/SocketState.js"

const OneChatUser = ({ setThereIsOpenChat, user }) => {
  //   const navigate = useNavigate()
  const { userConnected } = useSelector((state) => ({ ...state.auth }))
  const { id } = useSocket()
  const [ligne, setLigne] = useState([])
  useEffect(() => {
    // getOnlineUsers((isOnligne) => {
    setLigne(id)
    // })
  }, [id])

  return (
    <div onClick={() => setThereIsOpenChat(user)} className="ownerC">
      <div className="imgN">
        <img className="ownerimgC" src={user?.userImage} alt="" />
        <div className="flexCol">
          <div className="descriptionx">
            {userConnected.result._id === user?._id ? (
              <div>
                "Me (save ur stuff xD)" <span className={ligne && ligne.find((u) => u.userId === user._id) ? "onligne" : "offligne"}></span>
              </div>
            ) : (
              <div>
                {user?.userName} <span className={ligne && ligne.find((u) => u.userId === user._id) ? "onligne" : "offligne"}></span>
              </div>
            )}
          </div>
          <p>this is the last message</p>
        </div>
      </div>
      <p>22:30</p>
    </div>
  )
}

export default OneChatUser
