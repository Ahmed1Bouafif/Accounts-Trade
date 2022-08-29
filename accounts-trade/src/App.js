// import "./App.css"
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom"
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
import MyPosts from "./pages/MyPosts.jsx"
const App = () => {
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem("userProfile"))
  useEffect(() => {
    dispatch(setUser(user))
  })
  const AuthWrapper = () => {
    return localStorage.getItem("userProfile").token ? <Navigate to="/login" replace /> : <Outlet />
  }

  return (
    <BrowserRouter>
      <ToastContainer />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/profile" element={<Profile />} /> */}
          <Route element={<AuthWrapper />}>
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/AddPost" element={<AddPost />} />
            <Route path="/MyPosts/:id" element={<MyPosts />} />
            <Route path="/EditPost/:id" element={<AddPost />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
