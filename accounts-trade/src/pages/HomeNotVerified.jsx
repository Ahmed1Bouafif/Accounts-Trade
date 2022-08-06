import React from "react"
import Carrousel from "../components/Carrousel.jsx"
import FanUsers from "../components/FanUsers.jsx"
const HomeNotVerified = ({ carrousel }) => {
  return (
    <div className="homepage-container">
      <div className="text">
        <p className="description">
          {" "}
          here in <span className="highlited">Trade Accounts</span> you can sell or buy or switch games acounts
        </p>
        <p className="explaining">0.1 Select the game what you want and you find all posts available for selling accounts .</p>
        <p className="explaining">0.2 you can post your account and get notifications if someone wants to buy it .</p>
        <p className="explaining">0.3 available chatBox for the seller and buyer .</p>
        <p className="explaining">0.4 our web site have no benifits about money or agriments we just want to see the gamers happy .</p>
      </div>
      <Carrousel carrousel={carrousel} />
      <FanUsers />
      <div className="join">
        <p className="joinText">come join our community even if you don't want to buy or sell , you can get some new friends here to play with</p>
        <button className="JoinButton">
          <a href="/Login">Join Us</a>
        </button>
      </div>
    </div>
  )
}

export default HomeNotVerified
