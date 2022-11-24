import React from "react"
import MsgSend from "./MsgSend"
import MsgReceived from "./MsgReceived"
import { useRef } from "react"
import { useEffect } from "react"
const PcSideChat = () => {
  const scroll = useRef(null)
  useEffect(() => {
    scroll.current?.scrollIntoView()
  }, [])
  return (
    <div className="OtherPart ">
      <div className="chathead">
        <img className="ownerimg" src="A.png" alt="" />
        <p className="descriptionx">qsdf qDFQDF</p>
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
      </div>
      <div ref={scroll}></div>
      <div className="chatbottom">
        <input className="from-login-inputs chatin" placeholder="qzsdfqsdfqsdf" type="text" />
        <button className="form-login-login chatsen">send</button>
      </div>
    </div>
  )
}

export default PcSideChat
