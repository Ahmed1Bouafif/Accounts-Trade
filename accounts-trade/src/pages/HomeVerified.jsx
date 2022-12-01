import React, { useEffect, useState, useLayoutEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Post from "../components/Post"
import { getPosts, setCurrentPage } from "../redux/features/postSlice"
// import { io } from "socket.io-client"
import { Circles } from "react-loader-spinner"
import { getUserNotifs } from "../redux/features/usersSlice"
// import { useRef } from "react"
const HomeVerified = () => {
  const { loading, posts, currentPage, numberOfPages } = useSelector((state) => ({ ...state.post }))
  const { userConnected } = useSelector((state) => ({ ...state.auth }))

  const dispatch = useDispatch()
  const [type, setType] = useState("All Games")
  const [allPosts, setAllPosts] = useState([])
  const [id, setId] = useState(userConnected?.result?._id)
 
  useLayoutEffect(() => {
    setId(userConnected?.result?._id)
  }, [userConnected?.result?._id])
  useLayoutEffect(() => {
    dispatch(getPosts(currentPage))
    dispatch(getUserNotifs({ id }))
    window.scrollTo({ top: 0, behavior: "smooth" })
    // console.log("done")
  }, [currentPage, id, dispatch])
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
      {loading ? (
        <div className="wait">
          <Circles color="#ff0000" height={80} width={80} />
        </div>
      ) : (
        <div>{!type ? <div>{allPosts.length && allPosts.slice(0).map((e, i) => <Post key={i} {...e} />)}</div> : <div>{allPosts.length && allPosts.map((e, i) => <Post key={i} {...e} />)}</div>} </div>
      )}

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
