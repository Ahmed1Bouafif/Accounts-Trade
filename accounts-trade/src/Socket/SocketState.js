import { useContext, useEffect, useState } from "react"
import SocketContext from "./SocketContext.js"
import { io } from "socket.io-client"
// import { useSelector } from "react-redux"
// import { useLayoutEffect } from "react"
// import { useLayoutEffect } from "react"
const Url = "http://localhost:8000"
export const SocketProvider = ({ children }) => {
  // const { userConnected } = useSelector((state) => ({ ...state.auth }))
  const connectedUserr = JSON.parse(localStorage.getItem("userProfile"))

  // eslint-disable-next-line no-unused-vars
  const [socket, setSocket] = useState(
    io(Url, {
      withCredentials: true,
    })
  )
  // useLayoutEffect(() => {
  //   setSocket(
  //     io(Url, {
  //       withCredentials: true,
  //     })
  //   )
  // }, [])
  // const [ongline, setOnligne] = useState()
  const connectedUser = (uid) => {
    socket.emit("newUserOnline", uid)
  }

  let notificationss = []
  const [id, setid] = useState()
  // useLayoutEffect(() => {
  //   setid(userConnected?.result?._id)
  // }, [userConnected?.result?._id])

  useEffect(() => {
    // if (connectedUserr.result._id) {
    socket.on("connect", () => {
      console.log("user connected")
      console.log("heeeeeeeeeeeeeeeeeeeeeeeeeeeeeere", connectedUserr.result._id)
      connectedUser(connectedUserr.result._id)
      socket.on("online_users", (callback) => setid(callback))
    })
    return () => {
      console.log("====>", socket)
      socket.on("online_users", (callback) => setid(callback))
      socket.off()
      socket.disconnect()
      // socket.removeAllListeners()
    }
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket])
  // useEffect(() => {
  //   getOnlineUsers()
  const getOnlineUsers = (callback) => {
    socket.on("online_users", callback)
  }
  //   // console.log(ongline)
  // }, [socket])
  // console.log(ongline)
  const sendLike = (data) => {
    socket?.emit("send-like", data)
  }
  const receiveLike = (callback) => {
    socket?.on("receive-like", callback)
    // socket?.off("receive-like", callback)
  }
  const sendComment = (data) => {
    socket?.emit("send_comment", data)
  }
  const receiveComment = (callback) => {
    socket?.on("receive_comment", (callback) => {
      notificationss.push(callback)
    })
    socket?.off("receive_comment", callback)
  }
  const sendRequest = (data) => {
    socket?.emit("send_request", data)
  }
  const receiveRequest = (callback) => {
    socket?.on("receive_request", (callback) => {
      notificationss.push(callback)
    })
    socket?.off("receive_request", callback)
  }
  const sendMsgs = (data) => {
    socket.emit("sendMsg", data)
  }
  const receiveMsg = (callback) => {
    socket.on("receiveMsg", callback)
  }

  return (
    <SocketContext.Provider
      value={{
        receiveMsg,
        sendMsgs,
        socket,
        sendLike,
        receiveLike,
        sendComment,
        receiveComment,
        sendRequest,
        receiveRequest,
        getOnlineUsers,
        notificationss,
        // ongline,
        id,
      }}
    >
      {children}
    </SocketContext.Provider>
  )
}

const useSocket = () => useContext(SocketContext)

export default useSocket
