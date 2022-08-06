import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { setLogout } from "../redux/features/authSlice.js"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBell, faSearch } from "@fortawesome/free-solid-svg-icons"
import Notification from "./Notification.jsx"
import { useNavigate } from "react-router-dom"
import Search from "./Search.jsx"
const NaveBar = ({ setCarrousel, carrousel }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [mobileNotiOpen, setMobileNotiOpen] = useState(false)
  const [mobilesearchiOpen, setMobilesearchOpen] = useState(false)
  const { user } = useSelector((state) => ({ ...state.auth }))
  const handelLogount = () => {
    dispatch(setLogout(navigate))
  }
  return (
    <div className="nav">
      <img alt="Logo" className="logo" />
      <div className={`nav-items ${mobileNavOpen && "open"} `}>
        <a href="/">Home</a>
        {user?.result?._id ? <a href="/AddPost">Add Post</a> : <></>}
        {user?.result?._id ? <a href="/Chat">Chat</a> : <></>}
        {user?.result?._id ? <a href="/Profile">Profile</a> : <></>}
        {user?.result?._id ? (
          <a href="/" onClick={handelLogount}>
            Logout
          </a>
        ) : (
          <a href="/login">Login</a>
        )}
      </div>
      <div className="nav-mob">
        <div className={`nav-notif nav-search ${mobilesearchiOpen && "open"} `}>
          <Search />
        </div>
        <div className={`nav-notif  ${mobileNotiOpen && "open"} `}>
          <Notification />
        </div>
        {user?.result?._id && (
          <div className="nav-toggle-notification">
            <FontAwesomeIcon
              size="lg"
              icon={faBell}
              onClick={() => {
                setMobileNotiOpen(!mobileNotiOpen)
                setMobilesearchOpen(false)
                setMobileNavOpen(false)
                setCarrousel(!carrousel)
              }}
            />
          </div>
        )}
        {user?.result?._id && (
          <div className="nav-toggle-notification">
            <FontAwesomeIcon
              size="lg"
              icon={faSearch}
              onClick={() => {
                setMobilesearchOpen(!mobilesearchiOpen)
                setMobileNotiOpen(false)
                setMobileNavOpen(false)
                setCarrousel(!carrousel)
              }}
            />
          </div>
        )}
        <div
          className={`nav-toggle ${mobileNavOpen && "open"} `}
          onClick={() => {
            setMobileNavOpen(!mobileNavOpen)
            setMobileNotiOpen(false)
            setMobilesearchOpen(false)
            setCarrousel(!carrousel)
          }}
        >
          <div className="bars"></div>
        </div>
      </div>
    </div>
  )
}

export default NaveBar
