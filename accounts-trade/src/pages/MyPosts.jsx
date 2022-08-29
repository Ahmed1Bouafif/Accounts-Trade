import React, { useEffect, useLayoutEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deletePostById, getPostsByUser } from "../redux/features/postSlice"
import Post from "../components/Post"
import { useParams } from "react-router-dom"
import NaveBar from "../components/NaveBar"
import Footer from "../components/Footer"

const MyPosts = () => {
  const { loading, userPosts } = useSelector((state) => ({ ...state.post }))
  const dispatch = useDispatch()
  const [allPosts, setAllPosts] = useState(userPosts)
  const { id } = useParams()
  console.log(userPosts)
  useLayoutEffect(() => {
    dispatch(getPostsByUser(id))
  }, [dispatch])
  useEffect(() => {
    setAllPosts(userPosts.slice(0).reverse())
  }, [userPosts])

  const onHandelSubmit = (id) => {
    dispatch(deletePostById(id))
    console.log("blablablalabjkavzljbaljzsbd",id);
  }
  return (
    <>
      <NaveBar />
      <div className="homepage-container pickgame">
        {loading ? (
          <div className="description"> ...Loading </div>
        ) : (
          <div>
            <div>
              {userPosts &&
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
