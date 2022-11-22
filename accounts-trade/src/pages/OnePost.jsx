import React, { useLayoutEffect, useState } from "react"
import Comments from "../components/Comments"
import moment from "moment"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faThumbsUp, faComment } from "@fortawesome/free-solid-svg-icons"
import { useDispatch, useSelector } from "react-redux"
import { getOnePost, likePost } from "../redux/features/postSlice"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { searchUsers } from "../redux/features/usersSlice"
import Footer from "../components/Footer"
import { useNavigate } from "react-router-dom"
// import NaveBar from "../components/NaveBar"
// import useSocket from "../Socket/SocketState"
const OnePost = () => {
  const { userConnected } = useSelector((state) => ({ ...state.auth }))
  const { users } = useSelector((state) => ({ ...state.users }))
  const { post, loading } = useSelector((state) => ({ ...state.post }))
  // const { sendLike, socket } = useSocket()

  const userId = userConnected?.result?._id || userConnected?.result?.googleId
  // const { thatNoti } = useSelector((state) => ({ ...state.post }))
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [_id, setId] = useState()
  const [show, setShow] = useState(false)
  const [postt, setPost] = useState(post)
  const [userss, setUserss] = useState(users)
  // const [carrousel, setCarrousel] = useState(false)
  // const [noti, setNoti] = useState(null)

  const descriptionminimize = (str, show) => {
    if (show) return str
    if (str && str.length > 45) {
      str = str.substring(0, 65) + " ..."
    }
    return str
  }
  //   const navigation = useNavigate()
  const location = useLocation()
  useLayoutEffect(() => {
    setId(location.state)
    dispatch(searchUsers())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])
  useLayoutEffect(() => {
    if (_id) {
      dispatch(getOnePost(_id))
    }
  }, [_id, dispatch])
  useEffect(() => {
    setPost(post)
    setUserss(users)
    // setNoti(thatNoti)
  }, [post, users])
  //   console.log(".......", postt)
  //   console.log("..", post)
  const handleLike = () => {
    dispatch(likePost({ _id }))
  }
  // useEffect(() => {
  //   // sendLike
  //   sendLike(noti)
  // }, [noti, thatNoti, socket])
  const pickLike = (arr, me) => {
    if (arr.indexOf(me) === 0) {
      return 1
    } else {
      return arr.indexOf(me) - 1
    }
  }
  const likesCount = () => {
    if (postt.likes) {
      if (postt.likes.length > 2 && postt.likes.find((user) => user === userId)) {
        return (
          <p>
            <span className="likespeople">{userss && userss.find((user) => user._id === userId)?.userName}</span> , <span className="likespeople">{userss && userss.find((user) => user._id === postt.likes[pickLike(postt.likes, userId)])?.userName}</span> And <span className="likespeople">{postt.likes.length - 2}</span> Others Likes This Postt
          </p>
        )
      }
      if (postt.likes.length > 2) {
        return (
          <p>
            <span className="likespeople">{userss && userss.find((user) => user._id === postt.likes[0])?.userName}</span>, <span className="likespeople">{userss && userss.find((user) => user._id === postt.likes[1])?.userName}</span> And <span className="likespeople">{postt.likes.length - 2}</span> Others Likes This Postt
          </p>
        )
      }
      if (postt.likes.length === 2 && postt.likes.find((user) => user === userId)) {
        return (
          <p>
            <span className="likespeople">{userss && userss.find((user) => user._id === userId)?.userName}</span> And <span className="likespeople">{userss && userss.find((user) => user._id === postt.likes[pickLike(postt.likes, userId)])?.userName}</span> Likes This Postt
          </p>
        )
      }
      if (postt.likes.length === 2) {
        return (
          <p>
            <span className="likespeople">{userss && userss.find((user) => user._id === postt.likes[0])?.userName}</span> And <span className="likespeople">{userss && userss.find((user) => user._id === postt.likes[1])?.userName}</span> Likes This Postt
          </p>
        )
      }
      if (postt.likes.length === 1 && postt.likes.find((user) => user === userId)) {
        return (
          <p>
            <span className="likespeople">Just You</span> Likes This Postt
          </p>
        )
      }
      if (postt.likes.length === 1) {
        return (
          <p>
            <span className="likespeople">{userss && userss.find((user) => user._id === postt.likes[0])?.userName}</span> Likes This Post
          </p>
        )
      }
    }
  }

  return (
    <>
      {/* <NaveBar setCarrousel={setCarrousel} carrousel={carrousel} /> */}
      <span className="Go-Back" onClick={() => navigate(-1)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
          {" "}
          <path d="M15.683 3a2 2 0 0 0-2-2h-7.08a2 2 0 0 0-1.519.698L.241 7.35a1 1 0 0 0 0 1.302l4.843 5.65A2 2 0 0 0 6.603 15h7.08a2 2 0 0 0 2-2V3zM5.829 5.854a.5.5 0 1 1 .707-.708l2.147 2.147 2.146-2.147a.5.5 0 1 1 .707.708L9.39 8l2.146 2.146a.5.5 0 0 1-.707.708L8.683 8.707l-2.147 2.147a.5.5 0 0 1-.707-.708L7.976 8 5.829 5.854z" />{" "}
        </svg>
      </span>
      {/* <div className="homepage-container"> */}
      {loading ? (
        <div className="postCard postCardOne description"> ... Loading </div>
      ) : !postt ? (
        <div className="postCard postCardOne description"> This Post Not Avvailable Anymore Sorry ^^ </div>
      ) : (
        <>
          <div className="postCard postCardOne">
            <div className="owner">
              <img className="ownerimg" src={postt?.posterImage} alt="" />
              <p className="description">{userss.find((username) => username._id === postt?.creator)?.userName}</p>
            </div>
            <div className="downCard">
              <img className="postimg" src={postt?.imageFile} alt="" />
              <div className="cardFooter">
                <div className="timeadd">
                  <p className="posttitle">{postt?.title}</p>
                  <div className="time">{moment(postt?.createdAt).fromNow()}</div>
                </div>
                <p className="postdescription">
                  {descriptionminimize(postt?.description, show)}{" "}
                  {postt?.description && postt?.description.length > 45 && (
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
                <FontAwesomeIcon size="lg" color={postt?.likes && postt?.likes.find((user) => user === userId) ? "#ff0000" : "white"} icon={faThumbsUp} /> {postt?.likes && postt?.likes.find((user) => user === userId) ? "Liked" : "Like"}
              </button>
              <button className="form-login-login">
                <FontAwesomeIcon size="lg" icon={faComment} />
                Comment {postt?.comments?.length}
              </button>
            </div>
            {userss && userConnected && likesCount()}
          </div>

          <Comments />
        </>
      )}
      <Footer />
    </>
  )
}

export default OnePost
