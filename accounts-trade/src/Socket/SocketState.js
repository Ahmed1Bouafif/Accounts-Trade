import { useContext, useEffect, useState } from "react"
import SocketContext from "./SocketContext.js"
import { io } from "socket.io-client"
import { useSelector } from "react-redux"
// import { useLayoutEffect } from "react"
const Url = "http://localhost:8000"
export const SocketProvider = ({ children }) => {
  const { userConnected } = useSelector((state) => ({ ...state.auth }))
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

  const connectedUser = (uid) => {
    socket.emit("newUserOnline", uid)
  }
  const getOnlineUsers = (callback) => {
    socket.on("online_users", callback)
  }

  let notificationss = []
  useEffect(() => {
    if (userConnected?.result?._id) {
      socket.on("connect", () => {
        console.log("user connected")
        console.log("heeeeeeeeeeeeeeeeeeeeeeeeeeeeeere", userConnected?.result?._id)
        connectedUser(userConnected?.result?._id)
      })
      return () => {
        socket.off("connect")
        socket.disconnect()
        // socket.removeAllListeners()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userConnected?.result?._id])

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

  return (
    <SocketContext.Provider
      value={{
        socket,
        sendLike,
        receiveLike,
        sendComment,
        receiveComment,
        sendRequest,
        receiveRequest,
        getOnlineUsers,
        notificationss,
      }}
    >
      {children}
    </SocketContext.Provider>
  )
}

const useSocket = () => useContext(SocketContext)

export default useSocket
