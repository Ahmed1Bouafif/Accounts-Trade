import React from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
const Profile = () => {
  const { user } = useSelector((state) => ({ ...state.auth }))
  const navigate = useNavigate()
  return (
    <div className="ProfileContainer">
      <span className="Go-Back" onClick={() => navigate(-1)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
          {" "}
          <path d="M15.683 3a2 2 0 0 0-2-2h-7.08a2 2 0 0 0-1.519.698L.241 7.35a1 1 0 0 0 0 1.302l4.843 5.65A2 2 0 0 0 6.603 15h7.08a2 2 0 0 0 2-2V3zM5.829 5.854a.5.5 0 1 1 .707-.708l2.147 2.147 2.146-2.147a.5.5 0 1 1 .707.708L9.39 8l2.146 2.146a.5.5 0 0 1-.707.708L8.683 8.707l-2.147 2.147a.5.5 0 0 1-.707-.708L7.976 8 5.829 5.854z" />{" "}
        </svg>
      </span>
      <img className="user-profile" src="A.png" alt="your img" />
      <p className="description">{user?.result?.userName}</p>
      <div className="stat statProfile">
        <div className="posts profile">
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" viewBox="0 0 16 16">
              {" "}
              <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM8.5 7v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 1 0z" />{" "}
            </svg>
          </span>{" "}
          friends: 5
        </div>
        <div className="posts profile">
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" viewBox="0 0 16 16">
              {" "}
              <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM8.5 7v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 1 0z" />{" "}
            </svg>
          </span>{" "}
          posts: 2
        </div>
      </div>
      <div className="userInfo">
        <input name="name" type="name" placeholder="Put Your New Name" className="from-login-inputs profile-input" />
        <button className="form-login-login profile-button">Change Your Password</button>
        <button className="form-login-login profile-button">Update</button>
      </div>
    </div>
  )
}

export default Profile
