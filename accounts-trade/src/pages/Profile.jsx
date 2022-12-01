/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useLayoutEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { addFriend, acceptFriend, cancelAddFriend, changeUserName } from "../redux/features/usersSlice"
import { getUser } from "../redux/features/usersSlice"
import { Circles } from "react-loader-spinner"
import { TailSpin } from "react-loader-spinner"
import { getPosts } from "../redux/features/postSlice"
// import { io } from "socket.io-client"
// import useSocket from "../Socket/SocketState"
const Profile = () => {
  const { user, loading } = useSelector((state) => ({ ...state.users }))
  const { posts } = useSelector((state) => ({ ...state.post }))
  // const { sendRequest } = useSocket()
  const connectedUser = JSON.parse(localStorage.getItem("userProfile"))
  // const { thatNotii } = useSelector((state) => ({ ...state.users }))

  // const { userConnected } = useSelector((state) => ({ ...state.auth }))
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id } = useParams()
  const [_id, setIs] = useState()
  const [userData, setUserData] = useState()
  const [userName, setNewName] = useState()
  // const [socket, setSocket] = useState(null)
  // const [noti, setNoti] = useState(null)
  const [postNum, setPostNum] = useState()
  // useEffect(() => {
  //   setSocket(io("http://localhost:8000"))
  // }, [])

  useLayoutEffect(() => {
    if (id) {
      dispatch(getUser(id))
    }
    dispatch(getPosts())
    // setNoti(thatNotii)
    // if (user.receivedFriendRequestes) {
    //   if (user.receivedFriendRequestes.includes(_id)) {
    //     setRequestSent(true)
    //   }
    // }
  }, [id, dispatch])

  // useEffect(() => {
  //   if (noti?.type) {
  //     sendRequest(noti)
  //   }
  // }, [noti])
  // const [requestSent, setRequestSent] = useState(false)
  // const [profile, setProfile] = useState()
  // useEffect(() => {
  //   if (sentFriendsResquests.includes(id)) {
  //     setRequestSent(true)
  //   }
  // }, [sentFriendsResquests, id])
  // console.log(id)
  useEffect(() => {
    var num = 0
    // eslint-disable-next-line array-callback-return
    posts.map((u) => {
      if (u.creator === id) {
        num += 1
      }
    })
    setPostNum(num)
  }, [posts])
  useEffect(() => {
    if (connectedUser.result._id) {
      setIs(connectedUser.result._id)
    }
    if (user !== userData) {
      setUserData(user)
    }
  }, [connectedUser.result._id, user, userData])
  const addfriend = () => {
    dispatch(addFriend({ id, _id, toast }))
  }
  const cancelfriend = () => {
    dispatch(cancelAddFriend({ id, _id, toast }))
  }
  const acceptfriend = () => {
    dispatch(acceptFriend({ id, _id, toast }))
  }
  const changeusername = () => {
    if (userName.trim() !== "") {
      dispatch(changeUserName({ id, userName, toast }))
    }
  }
  console.log("1", userData)
  return (
    <div className="ProfileContainer">
      {userData && !(userData._id === id) ? (
        <Circles color="#ff0000" className="wait" height={80} width={80} />
      ) : (
        <>
          {userData && connectedUser.result._id && (
            <>
              <span className="Go-Back" onClick={() => navigate(-1)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
                  {" "}
                  <path d="M15.683 3a2 2 0 0 0-2-2h-7.08a2 2 0 0 0-1.519.698L.241 7.35a1 1 0 0 0 0 1.302l4.843 5.65A2 2 0 0 0 6.603 15h7.08a2 2 0 0 0 2-2V3zM5.829 5.854a.5.5 0 1 1 .707-.708l2.147 2.147 2.146-2.147a.5.5 0 1 1 .707.708L9.39 8l2.146 2.146a.5.5 0 0 1-.707.708L8.683 8.707l-2.147 2.147a.5.5 0 0 1-.707-.708L7.976 8 5.829 5.854z" />{" "}
                </svg>
              </span>
              <img className="user-profile" src={userData.userImage} alt="your img" />
              <div className="pcProfile">
                <p className="description">{userData.userName}</p>
                <div className="stat statProfile">
                  {!(connectedUser.result._id !== userData._id) ? (
                    <></>
                  ) : (
                    <div className="requests">
                      <button className="form-login-login">Send Message</button>{" "}
                      {userData.receivedFriendRequestes && userData.receivedFriendRequestes.includes(connectedUser.result._id) ? (
                        <button onClick={cancelfriend} className="form-login-login">
                          {loading && <TailSpin color="#fff" height={26} width={26} />}
                          Cancel Request
                        </button>
                      ) : (
                        <>
                          {userData.sentFriendRequestes && userData.sentFriendRequestes.includes(connectedUser.result._id) ? (
                            <>
                              {userData.friends && userData.friends.includes(connectedUser.result._id) ? (
                                <button className="form-login-login">Friends</button>
                              ) : (
                                <button onClick={acceptfriend} className="form-login-login">
                                  {loading && <TailSpin color="#fff" height={26} width={26} />}
                                  Accept Request
                                </button>
                              )}
                            </>
                          ) : (
                            <button onClick={addfriend} className="form-login-login">
                              {loading && <TailSpin color="#fff" height={26} width={26} />}
                              Add Friend
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  )}

                  <div className="posts profile">
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" viewBox="0 0 16 16">
                        {" "}
                        <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM8.5 7v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 1 0z" />{" "}
                      </svg>
                    </span>{" "}
                    friends: {user.friends.length}
                  </div>
                  <div className="posts profile">
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" viewBox="0 0 16 16">
                        {" "}
                        <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM8.5 7v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 1 0z" />{" "}
                      </svg>
                    </span>{" "}
                    posts: {posts.length ? postNum : <TailSpin color="#fff" height={26} width={26} />}
                  </div>
                </div>
                {user._id === connectedUser.result._id && (
                  <div className="userInfo">
                    <input onChange={(e) => setNewName(e.target.value)} name="name" type="name" placeholder="Put Your New Name" className="from-login-inputs profile-input" />
                    <button className="form-login-login profile-button">Change Your Password</button>
                    <button onClick={changeusername} className="form-login-login profile-button">
                      {loading && <TailSpin color="#fff" height={26} width={26} />}
                      Update
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </>
      )}
    </div>
  )
}

export default Profile
