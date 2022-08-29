import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { searchUsers } from "../redux/features/usersSlice.js"
import { Link } from "react-router-dom"
const Search = () => {
  const { loading, users } = useSelector((state) => ({ ...state.users }))
  const [serach, setSearch] = useState("")
  const [allUsers, setAllUsers] = useState(users)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(searchUsers())
  }, [])
  useEffect(() => {
    if (serach === "") {
      setAllUsers(users.slice(0))
    } else {
      setAllUsers(users.slice(0).filter((e) => e.userName.includes(serach)))
    }
  }, [serach])
  console.log(users)
  return (
    <div>
      <input name="Search" type="Search" value={serach} onChange={(e) => setSearch(e.target.value)} placeholder="Search" className="from-login-inputs search-input" />
      {loading ? (
        <p className="description">...Loading</p>
      ) : (
        <div>
          {allUsers &&
            allUsers.map((e, i) => (
              <Link key={i} to={`/profile/${e._id}`}>
                <div className="search-container">
                  <img className="notification-img" src={e.userImage} alt="userImage" />
                  <div className="notification-text">
                    <p>{e.userName}</p>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      )}
      {/* <div className="search-container">
        <img className="notification-img" src="A.png" alt="userImage" />
        <div className="notification-text">
          <p>saker belguessmi</p>
        </div>
      </div>
      <div className="search-container">
        <img className="notification-img" src="A.png" alt="userImage" />
        <div className="notification-text">
          <p>saker belguessmi</p>
        </div>
      </div>
      <div className="search-container">
        <img className="notification-img" src="A.png" alt="userImage" />
        <div className="notification-text">
          <p>saker belguessmi</p>
        </div>
      </div>
      <div className="search-container">
        <img className="notification-img" src="A.png" alt="userImage" />
        <div className="notification-text">
          <p>saker belguessmi</p>
        </div>
      </div>
      <div className="search-container">
        <img className="notification-img" src="A.png" alt="userImage" />
        <div className="notification-text">
          <p>saker belguessmi</p>
        </div>
      </div>
      <div className="search-container">
        <img className="notification-img" src="A.png" alt="userImage" />
        <div className="notification-text">
          <p>saker belguessmi</p>
        </div>
      </div>
      <div className="search-container">
        <img className="notification-img" src="A.png" alt="userImage" />
        <div className="notification-text">
          <p>saker belguessmi</p>
        </div>
      </div>
      <div className="search-container">
        <img className="notification-img" src="A.png" alt="userImage" />
        <div className="notification-text">
          <p>saker belguessmi</p>
        </div>
      </div> */}
    </div>
  )
}

export default Search
