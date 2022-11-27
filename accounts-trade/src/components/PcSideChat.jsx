import React from "react"
import MsgSend from "./MsgSend"
import MsgReceived from "./MsgReceived"
import { useRef } from "react"
import { useEffect } from "react"
import { useState } from "react"
import { useLayoutEffect } from "react"
import { useDispatch } from "react-redux"
import { sendMsg } from "../redux/features/usersSlice"

const PcSideChat = ({ user }) => {
  const connectedUser = JSON.parse(localStorage.getItem("userProfile"))
  const scroll = useRef(null)
  const dispatch = useDispatch()

  const [_id, setId] = useState()
  const [id, setID] = useState()

  useLayoutEffect(() => {
    if (connectedUser.result._id) {
      setId(connectedUser.result._id)
    }
    setID(user._id)
  }, [connectedUser.result._id, user._id])
  useEffect(() => {
    scroll.current?.scrollIntoView()
  }, [])
  const [msg, setmsg] = useState("")
  const sendMsgg = () => {
    if (msg.trim() !== "") {
      dispatch(sendMsg({ id, msg, _id }))
      setmsg("")
    }
  }
  console.log(user.chat)
  return (
    <div className="OtherPart ">
      <div className="chathead">
        <img className="ownerimg" src={user?.userImage} alt="" />
        <p className="descriptionx">{user?.userName}</p>
      </div>
      <div className="chatmain">
        <MsgSend />
        <MsgReceived />
        <MsgReceived />
        <MsgSend />
        <MsgSend />
        <MsgReceived />
        <MsgReceived />
        <MsgSend />
        <MsgSend />
        {msg}
      </div>
      <div ref={scroll}></div>
      <div className="chatbottom">
        <input onChange={(e) => setmsg(e.target.value)} value={msg} className="from-login-inputs chatin" placeholder="type a msg to send" type="text" />
        <button onClick={sendMsgg} className="form-login-login chatsen">
          send
        </button>
      </div>
    </div>
  )
}

export default PcSideChat
