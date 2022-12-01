import React, { useLayoutEffect, useState } from "react"
import Footer from "../components/Footer.jsx"
import NaveBar from "../components/NaveBar.jsx"
import { useSelector } from "react-redux"
import HomeVerified from "./HomeVerified.jsx"
import HomeNotVerified from "./HomeNotVerified.jsx"
// import { io } from "socket.io-client"
// import { getUser } from "../redux/features/authSlice.js"
// import useSocket from "../Socket/SocketState.js"

const Home = () => {
  const { userConnected } = useSelector((state) => ({ ...state.auth }))
  const { usernotifications } = useSelector((state) => ({ ...state.users }))
  const { notifications } = useSelector((state) => ({ ...state.post }))

  // const { receiveLike, receiveComment, receiveRequest, socket, notificationss } = useSocket()
  const [carrousel, setCarrousel] = useState(false)
  const [notificationssss, setNotificationss] = useState([])
  // useLayoutEffect(() => {
  //   setId(userConnected?.result?._id)
  // }, [userConnected?.result?._id])
  // console.log(socket)
  useLayoutEffect(() => {
    setNotificationss([...usernotifications, ...notifications])
  }, [usernotifications, notifications])

  // useEffect(() => {
  //   //(callback) => callback.length >= 1 && setNotificationss((notifications) => [...new Set([...notifications, ...callback])])
  //   receiveLike((data) => setNotificationss([...notifications, data]))
  //   // receiveComment()
  //   // receiveRequest()
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [socket])
  // useEffect(() => {}, [socket])
  // useEffect(() => {}, [socket])
  // const [socket, setSocket] = useState(null)
  // const [notii, setNoti] = useState(null)
  // useEffect(() => {
  //   setSocket(io("http://localhost:8000"))
  // }, [])
  // useLayoutEffect(() => {
  //   socket?.on("receive-like", function (data) {
  //     setNoti(data)
  //   })
  //   socket?.on("receive_request", function (data) {
  //     setNoti(data)
  //   })
  //   socket?.on("receive_comment", function (data) {
  //     setNoti(data)
  //   })
  //   // setNoti(thatNoti)
  // }, [socket, notii])
  // const dispatch = useDispatch()
  // useLayoutEffect(() => {
  //   dispatch(getUser())
  // }, [dispatch])
  // // console.log(user)
  return (
    <div>
      <NaveBar notifications={notificationssss} setCarrousel={setCarrousel} carrousel={carrousel} />
      {userConnected?.result?._id ? <HomeVerified /> : <HomeNotVerified carrousel={carrousel} />}
      <Footer />
    </div>
  )
}

export default Home
