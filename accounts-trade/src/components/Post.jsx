import React, { useState } from "react"
import moment from "moment"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faThumbsUp, faComment } from "@fortawesome/free-solid-svg-icons"
import { useDispatch, useSelector } from "react-redux"
import { likePost } from "../redux/features/postSlice"
import { useEffect } from "react"
const Post = ({ imageFile, description, title, _id, createdAt, creator, posterImage, name, likes }) => {
  const { userConnected } = useSelector((state) => ({ ...state.auth }))
  const { users } = useSelector((state) => ({ ...state.users }))
  const userId = userConnected.result._id || userConnected.result.googleId
  const dispatch = useDispatch()
  const [show, setShow] = useState(false)
  const [post, setPost] = useState({ imageFile, description, title, _id, createdAt, creator, posterImage, name, likes })
  const descriptionminimize = (str, show) => {
    if (show) return str
    if (str && str.length > 45) {
      str = str.substring(0, 65) + " ..."
    }
    return str
  }
  useEffect(() => {
    setPost({ imageFile, description, title, _id, createdAt, creator, posterImage, name, likes })
  }, [imageFile, description, title, _id, createdAt, creator, posterImage, name, likes])
  const handleLike = () => {
    dispatch(likePost({ _id }))
  }
  console.log("====>", post)
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
            <span className="likespeople">{users && users.find((user) => user._id === userId)?.userName}</span> , <span className="likespeople">{users && users.find((user) => user._id === likes[pickLike(likes, userId)])?.userName}</span> And <span className="likespeople">{likes.length - 2}</span> Others Likes This Post
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
            <span className="likespeople">{users && users.find((user) => user._id === userId)?.userName}</span> And <span className="likespeople">{users && users.find((user) => user._id === likes[pickLike(likes, userId)])?.userName}</span> Likes This Post
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
            <span className="likespeople">Just You</span> Likes This Post
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
      {post ? (
        <div className="postCard">
          <div className="owner">
            <img className="ownerimg" src={post?.posterImage} alt="" />
            <p className="description">{users.find((username) => username._id === creator)?.userName}</p>
          </div>
          <div className="downCard">
            <img className="postimg" src={post?.imageFile} alt="" />
            <div className="cardFooter">
              <div className="timeadd">
                <p className="posttitle">{post?.title}</p>
                <div className="time">{moment(post?.createdAt).fromNow()}</div>
              </div>
              <p className="postdescription">
                {descriptionminimize(post?.description, show)}{" "}
                {post?.description && post?.description.length > 45 && (
                  <span onClick={() => setShow(!show)} className={`readmore ${show && "bla"} `}>
                    {!show ? "Read More" : "Show Less"}
                  </span>
                )}
              </p>
            </div>
          </div>
          <div className="peni">
            <button
              onClick={() => {
                handleLike()
              }}
              className="form-login-login"
            >
              <FontAwesomeIcon size="lg" color={post?.likes && post?.likes.find((user) => user === userId) ? "#ff0000" : "white"} icon={faThumbsUp} /> {post?.likes && post?.likes.find((user) => user === userId) ? "Liked" : "Like"}
            </button>
            <button className="form-login-login">
              <FontAwesomeIcon size="lg" icon={faComment} /> Comment
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
