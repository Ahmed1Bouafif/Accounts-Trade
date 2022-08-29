import React, { useState, useLayoutEffect } from "react"
import Footer from "../components/Footer.jsx"
import NaveBar from "../components/NaveBar.jsx"
import { useSelector, useDispatch } from "react-redux"
import HomeVerified from "./HomeVerified.jsx"
import HomeNotVerified from "./HomeNotVerified.jsx"
// import { getUser } from "../redux/features/authSlice.js"

const Home = () => {
  const { userConnected } = useSelector((state) => ({ ...state.auth }))
  const [carrousel, setCarrousel] = useState(false)
  // const dispatch = useDispatch()
  // useLayoutEffect(() => {
  //   dispatch(getUser())
  // }, [dispatch])
  // // console.log(user)
  return (
    <div>
      <NaveBar setCarrousel={setCarrousel} carrousel={carrousel} />
      {userConnected?.result?._id ? <HomeVerified /> : <HomeNotVerified carrousel={carrousel} />}
      <Footer />
    </div>
  )
}

export default Home
