/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react"
import moment from "moment"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faThumbsUp, faComment } from "@fortawesome/free-solid-svg-icons"
import { useDispatch, useSelector } from "react-redux"
import { likePost } from "../redux/features/postSlice"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
// import { io } from "socket.io-client"
// import useSocket from "../Socket/SocketState"
// import { useLayoutEffect } from "react"

const Post = ({ comments, imageFile, description, title, _id, createdAt, creator, posterImage, name, likes }) => {
  const { userConnected } = useSelector((state) => ({ ...state.auth }))
  const { users } = useSelector((state) => ({ ...state.users }))
  // const { thatNoti } = useSelector((state) => ({ ...state.post }))
  // const { sendLike } = useSocket()

  const userId = userConnected.result._id || userConnected.result.googleId
  const dispatch = useDispatch()
  const [show, setShow] = useState(false)
  const [post, setPost] = useState({ comments, imageFile, description, title, _id, createdAt, creator, posterImage, name, likes })
  // const [socket, setSocket] = useState(null)
  // const [noti, setNoti] = useState(null)
  // useEffect(() => {
  //   setSocket(io("http://localhost:8000"))
  // }, [])
  // useEffect(() => {}, [socket, userConnected?.result])
  const descriptionminimize = (str, show) => {
    if (show) return str
    if (str && str.length > 65) {
      str = str.substring(0, 65) + " ..."
    }
    return str
  }
  const navigation = useNavigate()
  // useLayoutEffect(() => {
  //   setNoti(thatNoti)
  // }, [thatNoti])
  useEffect(() => {
    setPost({ comments, imageFile, description, title, _id, createdAt, creator, posterImage, name, likes })
  }, [comments, imageFile, description, title, _id, createdAt, creator, posterImage, name, likes])
  const handleLike = () => {
    dispatch(likePost({ _id }))
  }
  // useEffect(() => {
  //   // sendLike
  //   if (noti?.type) {
  //     console.log("hahahaha here", noti)
  //     sendLike(noti)
  //     setNoti({})
  //   }
  // }, [noti])
  const pickLike = (arr, me) => {
    if (arr.indexOf(me) === 0) {
      return 1
    } else {
      return arr.indexOf(me) - 1
    }
  }
  const likesCount = () => {
    if (likes) {
      if (likes.length > 2 && likes.find((user) => user === userId)) {
        return (
          <p>
            <span className="likespeople">{users && users.find((user) => user._id === userId)?.userName} (Me)</span> , <span className="likespeople">{users && users.find((user) => user._id === likes[pickLike(likes, userId)])?.userName}</span> And <span className="likespeople">{likes.length - 2}</span> Others Likes This Post
          </p>
        )
      }
      if (likes.length > 2) {
        return (
          <p>
            <span className="likespeople">{users && users.find((user) => user._id === likes[0])?.userName}</span>, <span className="likespeople">{users && users.find((user) => user._id === likes[1])?.userName}</span> And <span className="likespeople">{likes.length - 2}</span> Others Likes This Post
          </p>
        )
      }
      if (likes.length === 2 && likes.find((user) => user === userId)) {
        return (
          <p>
            <span className="likespeople">{users && users.find((user) => user._id === userId)?.userName} (Me)</span> And <span className="likespeople">{users && users.find((user) => user._id === likes[pickLike(likes, userId)])?.userName}</span> Likes This Post
          </p>
        )
      }
      if (likes.length === 2) {
        return (
          <p>
            <span className="likespeople">{users && users.find((user) => user._id === likes[0])?.userName}</span> And <span className="likespeople">{users && users.find((user) => user._id === likes[1])?.userName}</span> Likes This Post
          </p>
        )
      }
      if (likes.length === 1 && likes.find((user) => user === userId)) {
        return (
          <p>
            <span className="likespeople">Just Me</span> Likes This Post
          </p>
        )
      }
      if (likes.length === 1) {
        return (
          <p>
            <span className="likespeople">{users && users.find((user) => user._id === likes[0])?.userName}</span> Likes This Post
          </p>
        )
      }
    }
  }

  return (
    <>
      {post && users ? (
        <div className="postCard">
          <div onClick={() => navigation(`/profile/${creator}`)} className="owner">
            <img className="ownerimg" src={post?.posterImage} alt="" />
            <p className="description">{users.find((username) => username._id === creator)?.userName}</p>
          </div>
          <div onClick={() => navigation(`/OnePost/${_id}`, { state: _id })} className="downCard">
            <img className="postimg" src={post?.imageFile} alt="" />
            <div className="cardFooter">
              <div className="timeadd">
                <p className="posttitle">{post?.title}</p>
                <div className="time">{moment(post?.createdAt).fromNow()}</div>
              </div>
            </div>
          </div>
          <p className="postdescription">
            {descriptionminimize(post?.description, show)}{" "}
            {post?.description && post?.description.length > 45 && (
              <span onClick={() => setShow(!show)} className={`readmore ${show && "bla"} `}>
                {!show ? "Read More" : "Show Less"}
              </span>
            )}
          </p>
          <div className="peni">
            <button
              onClick={() => {
                handleLike()
              }}
              className="form-login-login"
            >
              <FontAwesomeIcon size="lg" color={post?.likes && post?.likes.find((user) => user === userId) ? "#ff0000" : "white"} icon={faThumbsUp} /> {post?.likes && post?.likes.find((user) => user === userId) ? "Liked" : "Like"}
            </button>
            <button onClick={() => navigation(`/OnePost/${_id}`, { state: _id })} className="form-login-login">
              <FontAwesomeIcon size="lg" icon={faComment} />
              Comment {post.comments.length}
            </button>
          </div>
          {users && userConnected && likesCount()}
        </div>
      ) : (
        <></>
      )}
    </>
  )
}

export default Post
