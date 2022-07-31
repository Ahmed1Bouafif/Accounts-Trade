import React, { useState } from "react"

const NaveBar = ({ setCarrousel, carrousel }) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  return (
    <div className="nav">
      <img alt="Logo" className="logo" />
      <div className={`nav-items ${mobileNavOpen && "open"} `}>
        <a href="/FaQ's">FaQ's</a>
        <a href="/Rules">Rules</a>
        <a href="/About Us">About Us</a>
        <a href="/Profile">Profile</a>
        <a href="/Logout">Logout</a>
      </div>
      <div
        className={`nav-toggle ${mobileNavOpen && "open"} `}
        onClick={() => {
          setMobileNavOpen(!mobileNavOpen)
          setCarrousel(!carrousel)
        }}
      >
        <div className="bars"></div>
      </div>
    </div>
  )
}

export default NaveBar
