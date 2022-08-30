import React, { useEffect, useState, useLayoutEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Post from "../components/Post"
import { getPosts, setCurrentPage } from "../redux/features/postSlice"
import { io } from "socket.io-client"
const HomeVerified = () => {
  const { loading, posts, currentPage, numberOfPages } = useSelector((state) => ({ ...state.post }))
  const dispatch = useDispatch()
  const [type, setType] = useState("")
  const [allPosts, setAllPosts] = useState(posts)
  useEffect(() => {
    const socket = io("http://localhost:8000")
  }, [])

  // socket.on("connect", () => {
  //   console.log(socket.id) // x8WIv7-mJelg7on_ALbx
  // })

  // socket.on("disconnect", () => {
  //   console.log(socket.id) // undefined
  // })
  useLayoutEffect(() => {
    dispatch(getPosts(currentPage))
  }, [currentPage])

  useEffect(() => {
    if (type === "All Games") {
      setAllPosts(posts.slice(0))
    } else {
      setAllPosts(posts.slice(0).filter((e) => e.typeOfPost === type))
    }
  }, [type, posts])
  return (
    <div className="homepage-container pickgame">
      <select name="allgames" onChange={(e) => setType(e.target.value)} className="allgames">
        <option className="allgamesoption" value="All Games">
          All Games
        </option>
        <option className="allgamesoption" value="Call Of Duty">
          Call Of Duty
        </option>
        <option className="allgamesoption" value="Free Fire">
          Free Fire
        </option>
        <option className="allgamesoption" value="Clash Royal">
          Clash Royal
        </option>
        <option className="allgamesoption" value="Ark Of War">
          Ark Of War
        </option>
      </select>
      {loading ? <div className="description"> ...Loading </div> : <div>{!type ? <div>{posts && posts.slice(0).map((e, i) => <Post key={i} {...e} />)}</div> : <div>{posts && allPosts.map((e, i) => <Post key={i} {...e} />)}</div>} </div>}

      {currentPage <= numberOfPages && currentPage >= 1 ? (
        <div className="peni">
          {!(currentPage > 1) ? (
            <></>
          ) : (
            <p onClick={() => dispatch(setCurrentPage(currentPage - 1))} className="description">
              Prev
            </p>
          )}
          <p className="description">{currentPage}</p>
          {!(currentPage < numberOfPages) ? (
            <></>
          ) : (
            <p onClick={() => dispatch(setCurrentPage(currentPage + 1))} className="description">
              Next
            </p>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}

export default HomeVerified
