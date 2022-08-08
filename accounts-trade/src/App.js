// import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Home from "./pages/Home.jsx"
import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx"
import { useDispatch } from "react-redux"
import { setUser } from "./redux/features/authSlice.js"
import { useEffect } from "react"
import Profile from "./pages/Profile.jsx"
import Chat from "./components/Chat.jsx"
import AddPost from "./pages/AddPost.jsx"
const App = () => {
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem("userProfile"))
  useEffect(() => {
    dispatch(setUser(user))
  })
  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/profile" element={<Profile />} /> */}
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/AddPost" element={<AddPost />} />
          <Route path="/EditPost/:id" element={<AddPost />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
