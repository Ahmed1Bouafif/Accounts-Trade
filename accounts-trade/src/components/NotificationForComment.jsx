import moment from "moment"
import React, { useEffect, useState } from "react"
import { useLayoutEffect } from "react"
// import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
// import { getUserNoti } from "../redux/features/usersSlice"

const NotificationForLike = ({ setMobileNotiOpen, postId, commenter, sendAt, seen, opened }) => {
  // const { usersnoti } = useSelector((state) => ({ ...state.users }))
  // const dispatch = useDispatch()
  const [notificationsUsers, setNotificationsUsers] = useState()
  const [_id, setId] = useState()
  useLayoutEffect(() => {
    if (commenter) {
      setNotificationsUsers(commenter)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    setId(postId)
  }, [postId])
  // useEffect(() => {
  //   var noti = []
  //   usersnoti.map((u) => noti.push(u))
  //   var result = noti.reduce((unique, o) => {
  //     if (!unique.some((obj) => obj._id === o._id)) {
  //       unique.push(o)
  //     }
  //     return unique
  //   }, [])

  //   setNotificationsUsers(result)
  // }, [usersnoti])
  const navigation = useNavigate()

  return (
    <div>
      {
        notificationsUsers && (
          // notificationsUsers
          //   .filter((u) => u._id === commenter)
          //   .map((u, i) => (
          <div
            onClick={() => {
              navigation(`/OnePost/${_id}`, { state: _id })
              setMobileNotiOpen(false)
            }}
            key={notificationsUsers?.id}
            className="notification-container"
          >
            {!opened ? <div className="notseen"></div> : <></>}
            <img className="notification-img" src={notificationsUsers?.image} alt="userImage" />
            <div className="notification-text">
              <p>{notificationsUsers?.name} commented on your post</p>
              <p>{moment(sendAt).fromNow()}</p>
            </div>
          </div>
        )
        // ))
      }
    </div>
  )
}

export default NotificationForLike
