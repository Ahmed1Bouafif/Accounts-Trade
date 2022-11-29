import React from "react"

const MsgReceived = ({ msg }) => {
  return (
    <p key={msg._id} className="msgReceived">
      {msg}
    </p>
  )
}

export default MsgReceived
