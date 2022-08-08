import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Post from "../components/Post"
import { getPosts } from "../redux/features/postSlice"

const HomeVerified = () => {
  const { loading, posts } = useSelector((state) => ({ ...state.post }))
  const dispatch = useDispatch()
  const [type, setType] = useState("")
  const [allPosts, setAllPosts] = useState(posts)
  useEffect(() => {
    dispatch(getPosts())
  }, [])
  useEffect(() => {
    if (type === "All Games") {
      setAllPosts(posts.slice(0).reverse())
    } else {
      setAllPosts(
        posts
          .slice(0)
          .reverse()
          .filter((e) => e.typeOfPost === type)
      )
    }
  }, [type])
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
        <div className="description"> ...Loading </div>
      ) : (
        <div>
          {!type ? (
            <div>
              {posts &&
                posts
                  .slice(0)
                  .reverse()
                  .map((e, i) => <Post key={i} {...e} />)}
            </div>
          ) : (
            <div>{posts && allPosts.map((e, i) => <Post key={i} {...e} />)}</div>
          )}{" "}
        </div>
      )}
    </div>
  )
}

export default HomeVerified
