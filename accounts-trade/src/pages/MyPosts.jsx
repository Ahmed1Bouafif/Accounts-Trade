import React, { useEffect, useLayoutEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deletePostById, getPostsByUser } from "../redux/features/postSlice"
import Post from "../components/Post"
import { useParams } from "react-router-dom"
// import NaveBar from "../components/NaveBar"
import Footer from "../components/Footer"
import { useNavigate } from "react-router-dom"
import { searchUsers } from "../redux/features/usersSlice"

const MyPosts = () => {
  const { loading, userPosts } = useSelector((state) => ({ ...state.post }))
  const dispatch = useDispatch()
  const [allPosts, setAllPosts] = useState(userPosts)
  const { id } = useParams()
  const navigate = useNavigate()
  // console.log(userPosts)
  useLayoutEffect(() => {
    dispatch(getPostsByUser(id))
  }, [dispatch, id])
  useEffect(() => {
    setAllPosts(userPosts.slice(0).reverse())
  }, [userPosts])
  // console.log(userPosts)
  useEffect(() => {
    dispatch(searchUsers())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const onHandelSubmit = (id) => {
    dispatch(deletePostById(id))
    // console.log("blablablalabjkavzljbaljzsbd", id)
  }
  return (
    <>
      {/* <NaveBar /> */}
      <span className="Go-Back" onClick={() => navigate(-1)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
          {" "}
          <path d="M15.683 3a2 2 0 0 0-2-2h-7.08a2 2 0 0 0-1.519.698L.241 7.35a1 1 0 0 0 0 1.302l4.843 5.65A2 2 0 0 0 6.603 15h7.08a2 2 0 0 0 2-2V3zM5.829 5.854a.5.5 0 1 1 .707-.708l2.147 2.147 2.146-2.147a.5.5 0 1 1 .707.708L9.39 8l2.146 2.146a.5.5 0 0 1-.707.708L8.683 8.707l-2.147 2.147a.5.5 0 0 1-.707-.708L7.976 8 5.829 5.854z" />{" "}
        </svg>
      </span>
      <div className="homepage-container pickgame">
        {loading ? (
          <div className="description"> ...Loading </div>
        ) : (
          <div>
            <div>
              {allPosts &&
                allPosts.slice(0).map((e, i) => (
                  <div key={i} className="upd">
                    <Post {...e} />
                    <div className="requests">
                      <button onClick={() => onHandelSubmit(e._id)} className="form-login-login">
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  )
}

export default MyPosts
