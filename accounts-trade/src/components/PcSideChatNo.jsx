import React from "react"
// import MsgSend from "./MsgSend"
// import MsgReceived from "./MsgReceived"
// import { useRef } from "react"
// import { useEffect } from "react"
const PcSideChatNo = () => {
  //   const scroll = useRef(null)
  //   useEffect(() => {
  //     scroll.current?.scrollIntoView()
  //   }, [])
  return (
    <div className="OtherPart ">
      <div className="chathead">
        <img className="ownerimg" src="https://www.pngfind.com/pngs/m/32-329409_question-mark-png-transparent-three-question-mark-png.png" alt="" />
        <p className="descriptionx">Pick One User To Chat With</p>
      </div>
      <div className="chatmain">
        {/* <MsgSend />
        <MsgReceived />
        <MsgReceived />
        <MsgSend />
        <MsgSend />
        <MsgReceived />
        <MsgReceived />
        <MsgSend />
        <MsgSend />
        <div ref={scroll}></div> */}
      </div>
      <div className="chatbottom">
        <input className="from-login-inputs chatin" disabled placeholder="qzsdfqsdfqsdf" type="text" />
        <button className="form-login-login chatsen" disabled>
          send
        </button>
      </div>
    </div>
  )
}

export default PcSideChatNo
