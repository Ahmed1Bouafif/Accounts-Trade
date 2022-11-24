import React from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import OneChatUser from "./OneChatUser"
import PcSideChat from "./PcSideChat"
import { useState } from "react"
import { useLayoutEffect } from "react"
import { searchUsers } from "../redux/features/usersSlice"
import { ThreeCircles } from "react-loader-spinner"
import PcSideChatNo from "./PcSideChatNo"

const Chat = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { users } = useSelector((state) => ({ ...state.users }))
  const [chat, setchat] = useState([])
  const [thereIsOpenChat, setThereIsOpenChat] = useState(false)
  useLayoutEffect(() => {
    dispatch(searchUsers())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useLayoutEffect(() => {
    setchat(users)
  }, [users])
  return (
    <div className="ChatContainer">
      <div className="chatUsers">
        <span className="Go-Back" onClick={() => navigate(-1)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
            {" "}
            <path d="M15.683 3a2 2 0 0 0-2-2h-7.08a2 2 0 0 0-1.519.698L.241 7.35a1 1 0 0 0 0 1.302l4.843 5.65A2 2 0 0 0 6.603 15h7.08a2 2 0 0 0 2-2V3zM5.829 5.854a.5.5 0 1 1 .707-.708l2.147 2.147 2.146-2.147a.5.5 0 1 1 .707.708L9.39 8l2.146 2.146a.5.5 0 0 1-.707.708L8.683 8.707l-2.147 2.147a.5.5 0 0 1-.707-.708L7.976 8 5.829 5.854z" />{" "}
          </svg>
        </span>

        {!chat.length ? <ThreeCircles color="#ff0000" className="wait" height={80} width={80} /> : chat.map((user) => <OneChatUser user={user} setThereIsOpenChat={setThereIsOpenChat} />)}
        {/* <OneChatUser />
        <OneChatUser />
        <OneChatUser />
        <OneChatUser />
        <OneChatUser />
        <OneChatUser /> */}
      </div>
      {thereIsOpenChat ? <PcSideChat /> : <PcSideChatNo />}
      {/* <PcSideChat /> */}
      {/* //{" "} */}
    </div>
  )
}

export default Chat
