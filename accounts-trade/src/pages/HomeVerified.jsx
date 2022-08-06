import React from "react"
const HomeVerified = () => {
  return (
    <div className="homepage-container pickgame">
      {/* <label className="allgames" for="allgames">
        All Games
      </label> */}

      <select name="allgames" className="allgames">
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
      <div className="description">you are verified so welcode to our community (the real home page)</div>
    </div>
  )
}

export default HomeVerified
