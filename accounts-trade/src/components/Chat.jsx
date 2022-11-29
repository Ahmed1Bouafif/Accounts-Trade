import React from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import OneChatUser from "./OneChatUser"
import PcSideChat from "./PcSideChat"
import { useState } from "react"
import { useLayoutEffect } from "react"
import { getUser, searchUsers } from "../redux/features/usersSlice"
import { Circles, ThreeCircles } from "react-loader-spinner"
import PcSideChatNo from "./PcSideChatNo"
import { useEffect } from "react"
import useSocket from "../Socket/SocketState"

const Chat = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { users, user } = useSelector((state) => ({ ...state.users }))
  const { sendMsgs, receiveMsg } = useSocket()
  // const { user } = useSelector((state) => ({ ...state.users }))
  const connectedUser = JSON.parse(localStorage.getItem("userProfile"))
  const [chat, setchat] = useState([])
  const [id, setId] = useState()
  const [msgs, setmsgs] = useState()
  const [userId, setUserId] = useState()
  const [thereIsOpenChat, setThereIsOpenChat] = useState({})
  useLayoutEffect(() => {
    dispatch(searchUsers())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    if (!msgs?.chat) {
      setmsgs(user.chat)
      setUserId(user._id)
    }
  }, [user])
  useLayoutEffect(() => {
    if (connectedUser.result._id) {
      setId(connectedUser.result._id)
    }
  }, [connectedUser.result._id])
  useLayoutEffect(() => {
    if (id) {
      dispatch(getUser(id))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])
  // console.log("54563151", msgs)
  // console.log(id)
  useLayoutEffect(() => {
    setchat(users)
  }, [users])
  useEffect(() => {
    // console.log(userChat)
    // console.log("whyyyyyyyyyyyyyyyyy", userChat[id])
    // console.log("whyyyyyyyyyyyyyyyyy", userChat[_id])
    // const idR = id
    // const idS = _id
    receiveMsg((data) => setmsgs((old) => ({ ...old, [data.id]: [...old[data.id], data.data] })))
    // console.log();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  console.log("goooooooooooooooooooooooo", msgs)
  // useEffect(() => {
  //   if (chat.length && ligne.length) {
  //     let newone = chat.slice(0)
  //     let bob = ligne.slice(0)
  //     let pose = 0
  //     let thatone = {}
  //     for (var i = 0; i < bob.length - 1; i++) {
  //       pose = chat.map((object) => object._id).indexOf(bob[i])
  //       thatone = newone[pose]
  //       newone.splice(pose, 1)
  //       newone.unshift(thatone)
  //     }
  //     setchatt(newone)
  //     console.log("=========", newone)
  //   }
  // }, [ligne, chat])
  // console.log(Window.innerHeight + "px")
  return (
    <div className="ChatContainer">
      {msgs ? (
        <>
          <span
            className="Go-Back"
            onClick={() => {
              Object.keys(thereIsOpenChat)?.length ? setThereIsOpenChat({}) : navigate(-1)
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
              {" "}
              <path d="M15.683 3a2 2 0 0 0-2-2h-7.08a2 2 0 0 0-1.519.698L.241 7.35a1 1 0 0 0 0 1.302l4.843 5.65A2 2 0 0 0 6.603 15h7.08a2 2 0 0 0 2-2V3zM5.829 5.854a.5.5 0 1 1 .707-.708l2.147 2.147 2.146-2.147a.5.5 0 1 1 .707.708L9.39 8l2.146 2.146a.5.5 0 0 1-.707.708L8.683 8.707l-2.147 2.147a.5.5 0 0 1-.707-.708L7.976 8 5.829 5.854z" />{" "}
            </svg>
          </span>
          <div className={`chatUsers ${Object.keys(thereIsOpenChat)?.length ? "okay" : ""} `}>
            {!chat.length && userId === id ? <ThreeCircles color="#ff0000" className="wait" height={80} width={80} /> : chat.map((userr) => <OneChatUser userChat={msgs} key={userr._id} user={userr} setThereIsOpenChat={setThereIsOpenChat} />)}
            {/* <OneChatUser />
        <OneChatUser />
        <OneChatUser />
        <OneChatUser />
        <OneChatUser />
        <OneChatUser /> */}
          </div>
          {Object.keys(thereIsOpenChat)?.length ? <PcSideChat userChat={msgs} setmsgs={setmsgs} user={thereIsOpenChat} /> : <PcSideChatNo css="okay" />}
          {/* <PcSideChat /> */}
          {/* //{" "} */}
        </>
      ) : (
        <Circles color="#ff0000" className="wait" height={80} width={80} />
      )}
    </div>
  )
}

export default Chat
