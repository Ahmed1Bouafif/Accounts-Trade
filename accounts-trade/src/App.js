import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Home from "./pages/Home.js"
import Login from "./pages/Login.js"
import Resister from "./pages/Resister.js"
const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/resister" element={<Resister />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
