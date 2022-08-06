import React, { useState } from "react"
import Footer from "../components/Footer.jsx"
import NaveBar from "../components/NaveBar.jsx"
import { useSelector } from "react-redux"
import HomeVerified from "./HomeVerified.jsx"
import HomeNotVerified from "./HomeNotVerified.jsx"

const Home = () => {
  const { user } = useSelector((state) => ({ ...state.auth }))
  const [carrousel, setCarrousel] = useState(false)
  return (
    <div>
      <NaveBar setCarrousel={setCarrousel} carrousel={carrousel} />
      {user?.result?._id ? <HomeVerified /> : <HomeNotVerified carrousel={carrousel} />}
      <Footer />
    </div>
  )
}

export default Home
