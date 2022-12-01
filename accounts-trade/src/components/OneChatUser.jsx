import moment from "moment"
import React from "react"
import { useLayoutEffect } from "react"
import { useEffect, useState } from "react"
// import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import useSocket from "../Socket/SocketState.js"

const OneChatUser = ({ setThereIsOpenChat, user, userChat }) => {
  //   const navigate = useNavigate()
  const { userConnected } = useSelector((state) => ({ ...state.auth }))
  const { id } = useSocket()
  const [ligne, setLigne] = useState([])
  const [lastMsg, setLastMsg] = useState({})
  useEffect(() => {
    // getOnlineUsers((isOnligne) => {
    setLigne(id)
    // })
  }, [id])
  useLayoutEffect(() => {
    let id = user._id
    if (userChat[id]) {
      setLastMsg(userChat[id][userChat[id]?.length - 1])
    }
  }, [userChat])
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
          <p>{lastMsg?.msg ? <span className="lastMsg">{lastMsg.msg}</span> : <span className="lastMsg">No Msgs Yet</span>}</p>
        </div>
      </div>
      {lastMsg?.sendAt ? <p>{moment(lastMsg.sendAt).fromNow()}</p> : <></>}
    </div>
  )
}

export default OneChatUser
