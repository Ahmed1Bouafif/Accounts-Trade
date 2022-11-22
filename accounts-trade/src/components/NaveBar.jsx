import React, { useLayoutEffect, useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { setLogout } from "../redux/features/authSlice.js"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBell, faSearch } from "@fortawesome/free-solid-svg-icons"
import Notification from "./Notification.jsx"
import { useNavigate } from "react-router-dom"
import Search from "./Search.jsx"
import { getUserNotifsSeen } from "../redux/features/usersSlice.js"
// import { io } from "socket.io-client"
import useSocket from "../Socket/SocketState.js"

const NaveBar = ({ setCarrousel, carrousel, notifications }) => {
  const { userConnected } = useSelector((state) => ({ ...state.auth }))
  const { receiveLike, receiveComment, receiveRequest, socket } = useSocket()

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [mobileNotiOpen, setMobileNotiOpen] = useState(false)
  const [mobilesearchiOpen, setMobilesearchOpen] = useState(false)
  const [numberNotifn, setNumberNotifs] = useState()
  const [id, setId] = useState(userConnected?.result?._id)

  // const { notifications, thatNoti } = useSelector((state) => ({ ...state.post }))
  // const { thatNotii } = useSelector((state) => ({ ...state.users }))
  const { usernotifications } = useSelector((state) => ({ ...state.users }))
  // const { userConnected } = useSelector((state) => ({ ...state.auth }))
  const [notificationss, setNotifications] = useState([])
  const [notificationsss, setNotificationss] = useState([])
  const [nLike, setnl] = useState({})
  const [nComment, setnc] = useState({})
  const [nAdd, setna] = useState({})
  // const [noti, setNoti] = useState({})

  // const [socket, setSocket] = useState(null)
  // const [notii, setNoti] = useState(null)
  // const [n, setN] = useState(null)
  // useEffect(() => {
  //   setSocket(io("http://localhost:8000"))

  // }, [])

  useLayoutEffect(() => {
    setId(userConnected?.result?._id)
  }, [userConnected?.result?._id])

  // useLayoutEffect(() => {
  //   if (id) {
  //     dispatch(getUserNotifs({ id }))
  //   }
  // }, [])

  useLayoutEffect(() => {
    //(callback) => callback.length >= 1 && setNotificationss((notifications) => [...new Set([...notifications, ...callback])])
    receiveLike((like) => {
      // console.log(like)
      setnl(like)
    })
    receiveComment((comment) => {
      // console.log(comment.)
      setnc(comment)
    })
    receiveRequest((add) => {
      // console.log(add)
      setna(add)
    })
    // console.log(data)
    // receiveComment()
    // receiveRequest()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket])
  useEffect(() => {
    if (nLike.type === "like") {
      if (notifications?.length < 1) {
        setNotifications([...usernotifications, nLike])
        setnl({})
      } else {
        setNotifications([...notifications, nLike])
        setnl({})
      }
    } else if (nComment.type === "comment") {
      if (notifications?.length < 1) {
        setNotifications([...usernotifications, nComment])
        setnc({})
      } else {
        setNotifications([...notifications, nComment])
        setnc({})
      }
    } else if (nAdd.type === "sendRequest") {
      if (notifications?.length < 1) {
        setNotifications([...usernotifications, nAdd])
        setna({})
      } else {
        setNotifications([...notifications, nAdd])
        setna({})
      }
    } else if (notifications?.length < 1 && notificationss.length < 1) {
      setNotifications(usernotifications)
    } else if (notificationss.length <= notifications.length) {
      setNotifications(notifications)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notifications, nLike, nAdd, nComment, usernotifications])

  // useLayoutEffect(() => {
  //   setNoti(noti)
  //   // setNumberNotifs(numberNotifn + 1)
  // }, [noti])

  useEffect(() => {
    // notifications.map((u) => noti.push(u))1
    // notifications &&
    //   notifications.map((u) => {
    //     if ((noti.postId === u.postId && noti.liker === u.liker) || (noti.postId === u.postId && noti.commenter === u.commenter) || (noti.receiver === u.receiver && noti.sender === u.sender)) {
    //       notii.unshift(u)
    //     }
    //   })
    // if (notii) {
    //   noti.push(notii)
    // }

    // else if (thatNotii) {
    //   noti.push(thatNotii)
    // } else {
    //   noti.push(thatNoti)
    // }
    // console.log("=============>", noti)
    // var result = noti.reduce((unique, o) => {
    //   console.log(".", o)
    //   console.log("..", unique)

    //   if (!unique.some((obj) => (obj.postId === o.postId && obj.liker === o.liker && obj.poster === o.poster && obj.sendAt === o.sendAt) || (obj.receiver === o.receiver && obj.sender === o.sender) || (obj.commenter === o.commenter && obj.sendAt === o.sendAt))) {
    //     unique.push(o)
    //   }
    //   return unique
    // }, [])
    // console.log("=============>>>>>", result)

    // console.log(result)
    const filter = (ok) => {
      var lala = []
      // console.log(notificationss)
      // eslint-disable-next-line array-callback-return
      ok.map((u) => {
        if (u.type === "like") {
          if (u.liker.id !== userConnected?.result?._id && u.poster === userConnected?.result?._id) {
            lala.push(u)
          }
        } else if (u.type === "comment") {
          if (u.commenter.id !== userConnected?.result?._id && u.poster === userConnected?.result?._id) {
            lala.push(u)
          }
        } else if (u.type === "sendRequest") {
          if (u.sender.id !== userConnected?.result?._id && u.receiver === userConnected?.result?._id) {
            lala.push(u)
          }
        }
      })
      // var result = lala.reduce((unique, o) => {
      //   if (!unique.some((obj) => (obj.postId === o.postId && obj.liker === o.liker && obj.poster === o.poster && obj.sendAt === o.sendAt) || (obj.receiver === o.receiver && obj.sender === o.sender) || (obj.commenter === o.commenter && obj.sendAt === o.sendAt))) {
      //     unique.push(o)
      //   }
      //   return unique
      // }, [])
      console.log(lala)
      return lala.reverse()
    }
    // var filtered = noti.filter((u) => u.liker !== userConnected?.result?._id || u.commenter !== userConnected?.result?._id || u.sender !== userConnected?.result?._id)
    setNotificationss(filter(notificationss))

    // console.log("hahahahahahhahahadfhsdfhsdfh", filtered)
    // console.log("hahahahahahhahaha", noti)
    // notifications,
  }, [userConnected?.result?._id, notificationss, notifications, usernotifications])

  useEffect(() => {
    if (notificationsss) {
      var notii = 0
      notificationsss.map((u) => (u.seen === false ? notii++ : notii))
      // console.log(notificationsss.length)
      // if (notifications) {
      //   console.log(notificationss.length)
      //   console.log(notifications.length)
      // }
      setNumberNotifs(notii)
      // console.log(noti)
      // console.log(numberNotifn)
      // console.log(thatNoti)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notificationsss])
  // useEffect(() => {
  //   setN(notificationss)
  //   console.log("3", notificationss)
  // }, [notificationss])

  const handelLogount = () => {
    dispatch(setLogout(navigate))
  }
  const handelSeen = (bob) => {
    dispatch(getUserNotifsSeen(bob))
  }
  return (
    <div className="nav">
      <img alt="Logo" className="logo" />
      <div className={`nav-items ${mobileNavOpen && "open"} `}>
        <a href="/">Home</a>
        {userConnected?.result?._id ? <></> : <a href="/register">Register</a>}
        {userConnected?.result?._id ? <a href="/AddPost">Add Post</a> : <></>}
        {userConnected?.result?._id ? <a href={`/MyPosts/${userConnected?.result?._id}`}>My Posts</a> : <></>}
        {userConnected?.result?._id ? <a href="/Chat">Chat</a> : <></>}
        {userConnected?.result?._id ? <a href={`/Profile/${userConnected?.result?._id}`}>Profile</a> : <></>}
        {userConnected?.result?._id ? (
          <a href="/" onClick={handelLogount}>
            Logout
          </a>
        ) : (
          <a href="/login">Login</a>
        )}
      </div>
      <div className="nav-mob">
        <div className={`nav-notif nav-search ${mobilesearchiOpen && "open"} `}>
          <Search />
        </div>
        <div className={`nav-notif  ${mobileNotiOpen && "open"} `}>
          <Notification setMobileNotiOpen={setMobileNotiOpen} notificationss={notificationsss} />
        </div>
        {userConnected?.result?._id && (
          <div
            className="nav-toggle-notification"
            onClick={() => {
              setMobileNotiOpen(!mobileNotiOpen)
              setMobilesearchOpen(false)
              setMobileNavOpen(false)
              setCarrousel(!carrousel)
              handelSeen({ id })
              setNumberNotifs(0)
            }}
          >
            <div className="numberNotifs">{numberNotifn}</div>
            <FontAwesomeIcon size="lg" icon={faBell} />
          </div>
        )}
        {userConnected?.result?._id && (
          <div className="nav-toggle-notification">
            <FontAwesomeIcon
              size="lg"
              icon={faSearch}
              onClick={() => {
                setMobilesearchOpen(!mobilesearchiOpen)
                setMobileNotiOpen(false)
                setMobileNavOpen(false)
                setCarrousel(!carrousel)
              }}
            />
          </div>
        )}
        <div
          className={`nav-toggle ${mobileNavOpen && "open"} `}
          onClick={() => {
            setMobileNavOpen(!mobileNavOpen)
            setMobileNotiOpen(false)
            setMobilesearchOpen(false)
            setCarrousel(!carrousel)
          }}
        >
          <div className="bars"></div>
        </div>
      </div>
    </div>
  )
}

export default NaveBar
