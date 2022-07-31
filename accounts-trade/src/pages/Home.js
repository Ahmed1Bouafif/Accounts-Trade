import React, { useState } from "react"
import Carrousel from "../components/Carrousel.js"
import FanUsers from "../components/FanUsers.js"
import NaveBar from "../components/NaveBar.js"

const Home = () => {
  const [carrousel, setCarrousel] = useState(false)
  return (
    <div>
      <NaveBar setCarrousel={setCarrousel} carrousel={carrousel} />
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
        <p className="description">Socials :</p>
      </div>
    </div>
  )
}

export default Home
