/* eslint-disable react-hooks/exhaustive-deps */
import moment from "moment"
import React, { useEffect, useState } from "react"
import { useLayoutEffect } from "react"
import { useDispatch } from "react-redux"
// import { getUserNoti } from "../redux/features/usersSlice"
import { acceptFriend } from "../redux/features/usersSlice"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

const NotificationForAddFriend = ({ setMobileNotiOpen, postId, receiver, sendAt, sender, seen, opened }) => {
  // const { usersnoti } = useSelector((state) => ({ ...state.users }))
  const connectedUser = JSON.parse(localStorage.getItem("userProfile"))
  const dispatch = useDispatch()
  const [notificationsUsers, setNotificationsUsers] = useState()
  const [_id, setIs] = useState()
  const [id, setId] = useState()
  useLayoutEffect(() => {
    if (sender) {
      setNotificationsUsers(sender)
    }
  }, [])
  useEffect(() => {
    if (connectedUser.result._id) {
      setIs(connectedUser.result._id)
    }
    if (sender) {
      setId(sender.id)
    }
  }, [connectedUser.result._id, sender])
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

  //   const cancelfriend = () => {
  //     dispatch(cancelAddFriend({ id, _id, toast }))
  //   }
  const acceptfriend = () => {
    dispatch(acceptFriend({ id, _id, toast }))
  }
  const navigation = useNavigate()

  return (
    <div>
      {
        notificationsUsers && (
          // notificationsUsers
          //   .filter((u) => u._id === sender)
          //   .map((u, i) => (
          <div key={notificationsUsers.id} className="notification-container">
            {!opened ? <div className="notseen"></div> : <></>}
            <img
              onClick={() => {
                navigation(`/profile/${notificationsUsers.id}`)
                setMobileNotiOpen(false)
              }}
              className="notification-img"
              src={notificationsUsers?.image}
              alt="userImage"
            />
            <div className="notification-text">
              <p
                onClick={() => {
                  navigation(`/profile/${notificationsUsers.id}`)
                  setMobileNotiOpen(false)
                }}
              >
                {notificationsUsers?.name} Sent Your A Friend Request
              </p>
              <p
                onClick={() => {
                  navigation(`/profile/${notificationsUsers.id}`)
                  setMobileNotiOpen(false)
                }}
              >
                {moment(sendAt).fromNow()}
              </p>
              <div className="peni">
                <button onClick={acceptfriend} className="form-login-login">
                  Accept
                </button>
                <button className="form-login-login">Reject</button>
              </div>
            </div>
          </div>
        )
        // ))
      }
    </div>
  )
}

export default NotificationForAddFriend
