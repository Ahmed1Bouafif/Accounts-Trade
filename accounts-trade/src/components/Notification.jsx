import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import NotificationForAddFriend from "./NotificationForAddFriend"
// import { useSelector } from "react-redux"
import NotificationForLike from "./NotificationForLike"
import NotificationForComment from "./NotificationForComment"

const Notification = ({ notificationss, setMobileNotiOpen }) => {
  // const { notifications, thatNoti } = useSelector((state) => ({ ...state.post }))
  // const { usernotifications } = useSelector((state) => ({ ...state.users }))
  // const { userConnected } = useSelector((state) => ({ ...state.auth }))
  const [notificationsss, setNotifications] = useState()
  useEffect(() => {
    setNotifications(notificationss)
  }, [notificationss])
  // useEffect(() => {
  //   var noti = [thatNoti]
  //   notifications.map((u) => noti.push(u))
  //   usernotifications.map((u) => noti.push(u))
  //   var result = noti.reduce((unique, o) => {
  //     if (!unique.some((obj) => obj.postId === o.postId && obj.liker === o.liker && obj.poster === o.poster && obj.sendAt === o.sendAt)) {
  //       unique.push(o)
  //     }
  //     return unique
  //   }, [])

  //   var filtered = result.filter((u) => u.liker !== userConnected?.result?._id)

  //   setNotifications(filtered.reverse())
  //   // console.log("hahahahahahhahaha", result[0]?.liker)
  //   // console.log("hahahahahahhahaha", userConnected._id)
  // }, [notifications, usernotifications, userConnected?.result?._id, thatNoti])
  // useEffect(() => {
  //   if (notificationss) {
  //     var noti = 0
  //     notificationss.map((u) => (u.seen === false ? noti++ : noti))
  //     setNumberNotifs(noti)
  //     console.log(noti)
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [notificationss, thatNoti])
  // console.log("1", notificationss)
  // console.log("2", notificationsss)
  return <div className="slice">{notificationsss && notificationsss.map((noti, i) => (noti.type === "like" ? <NotificationForLike setMobileNotiOpen={setMobileNotiOpen} key={i} {...noti} /> : noti.type === "sendRequest" ? <NotificationForAddFriend setMobileNotiOpen={setMobileNotiOpen} key={i} {...noti} /> : noti.type === "comment" ? <NotificationForComment setMobileNotiOpen={setMobileNotiOpen} key={i} {...noti} /> : <></>))}</div>
}

export default Notification
