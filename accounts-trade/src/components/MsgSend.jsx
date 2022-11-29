import React from "react"

const MsgSend = ({ msg }) => {
  return (
    <p key={msg._id} className="msgSend">
      {msg}
    </p>
  )
}

export default MsgSend
