import React from "react"
import MsgSend from "./MsgSend"
import MsgReceived from "./MsgReceived"
import { useRef } from "react"
import { useEffect } from "react"
import { useState } from "react"
import { useLayoutEffect } from "react"
import { useDispatch } from "react-redux"
import { sendMsg } from "../redux/features/usersSlice"
import useSocket from "../Socket/SocketState"

const PcSideChat = ({ user, userChat, setmsgs }) => {
  const connectedUser = JSON.parse(localStorage.getItem("userProfile"))
  const scroll = useRef(null)
  const dispatch = useDispatch()
  const { sendMsgs, receiveMsg } = useSocket()

  const [_id, setId] = useState(connectedUser.result._id)
  const [id, setID] = useState(user._id)
  // const [add, setAdd] = useState([])
  useLayoutEffect(() => {
    if (connectedUser.result._id) {
      setId(connectedUser.result._id)
    }
    setID(user._id)
  }, [connectedUser.result._id, user._id])
  const [msg, setmsg] = useState("")
  const sendMsgg = () => {
    if (msg.trim() !== "") {
      dispatch(sendMsg({ id, msg, _id }))
      sendMsgs({ receiver: id, sender: _id, msg, sendAt: new Date(), seen: false })
      setmsg("")
    }
  }
  // useEffect(() => {
  //   // console.log(userChat)
  //   const idR = id
  //   // const idS = _id
  //   receiveMsg((data) => setmsgs({ ...userChat, idR: [...userChat[idR], data] }))
  //   // console.log();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [receiveMsg])

  useEffect(() => {
    scroll.current?.scrollIntoView()
  }, [])
  // console.log("1111", userChat)
  // console.log("22222", id)
  return (
    <div className="OtherPart ">
      <div className="chathead">
        <img className="ownerimg" src={user?.userImage} alt="" />
        <p className="descriptionx">{user?.userName}</p>
      </div>

      <div className="chatmain">
        {userChat[user._id]?.length ? userChat[user._id].map((u, i) => (u.sender === user._id ? <MsgSend key={i} msg={u.msg} /> : <MsgReceived key={i} msg={u.msg} />)) : <div>No Msg Between You And This User</div>}
        <div ref={scroll}></div>
      </div>

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
