import React, { useEffect, useState } from "react"
import { useLayoutEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"
// import { io } from "socket.io-client"
// import { getUserNoti } from "../redux/api"
import { comment } from "../redux/features/postSlice"
// import useSocket from "../Socket/SocketState"

import OneComment from "./OneComment"

const Comments = () => {
  const connectedUser = JSON.parse(localStorage.getItem("userProfile"))
  const { post } = useSelector((state) => ({ ...state.post }))
  // const { thatNotii } = useSelector((state) => ({ ...state.users }))
  // const { sendComment } = useSocket()

  const dispatch = useDispatch()
  const { id } = useParams()
  const [_id, setIs] = useState()
  const [comments, setcomments] = useState(post.comments)
  const [commentt, setcom] = useState("")
  // const [socket, setSocket] = useState(null)
  // const [noti, setNoti] = useState(null)

  // useEffect(() => {
  //   setSocket(io("http://localhost:8000"))
  // }, [])
  // useLayoutEffect(() => {
  //   setNoti(thatNotii)
  // }, [thatNotii])
  // useEffect(() => {
  //   if (noti?.type) {
  //     sendComment(noti)
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [noti])
  const addComment = () => {
    if (commentt.trim() !== "") {
      dispatch(comment({ id, commentt, _id }))
      setcomments([...comments, { commnterName: { n: connectedUser.result.userName, i: connectedUser.result.userImage }, commenter: connectedUser.result._id, comment: commentt, sendAt: new Date(), likes: [] }])
      setcom("")
    } else {
      toast.error("please complete your comment")
    }
  }
  useLayoutEffect(() => {
    if (comments?.length === post?.comments?.length) {
      setcomments(post.comments)
    }
  }, [post.comments, comments])
  useEffect(() => {
    if (connectedUser.result._id) {
      setIs(connectedUser.result._id)
    }
  }, [connectedUser.result._id])
  return (
    <div className="comment">
      <div className="comadd">
        <textarea onChange={(e) => setcom(e.target.value)} value={commentt} name="description" type="text" placeholder="Enter A comment" className="from-login-inputs field-text-comment " />
        <button onClick={addComment} className="add  form-login-login">
          {/* {loading && <TailSpin color="#fff" height={26} width={26} />} */}
          Add
        </button>
      </div>
      {comments &&
        comments
          .slice(0)
          .reverse()
          .map((comment, i) => <OneComment key={i} {...comment} />)}
    </div>
  )
}

export default Comments
