import React, { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import FileBase64 from "react-file-base64"
import { useDispatch, useSelector } from "react-redux"
import { createPost } from "../redux/features/postSlice.js"

const AddPost = () => {
  const intialState = {
    typeOfPost: "",
    title: "",
    description: "",
  }
  const [postData, setPostData] = useState(intialState)
  const { error } = useSelector((state) => ({ ...state.post }))
  const { user } = useSelector((state) => ({ ...state.auth }))
  const { typeOfPost, title, description } = postData

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    error && toast.error(error)
  }, [error])

  console.log(postData)
  console.log(user?.result?.userName)

  const onInputChange = (e) => {
    const { name, value } = e.target
    setPostData({ ...postData, [name]: value })
  }
  const onClear = () => {
    setPostData({ typeOfPost: "", title: "", description: "" })
  }
  const onHandelSubmit = (e) => {
    e.preventDefault()
    if (title && description) {
      const updatedPost = { ...postData, name: user?.result?.userName }
      dispatch(createPost({ updatedPost, navigate, toast }))
      // onClear()
    }
  }

  return (
    <div className="ProfileContainer">
      <span className="Go-Back" onClick={() => navigate(-1)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
          {" "}
          <path d="M15.683 3a2 2 0 0 0-2-2h-7.08a2 2 0 0 0-1.519.698L.241 7.35a1 1 0 0 0 0 1.302l4.843 5.65A2 2 0 0 0 6.603 15h7.08a2 2 0 0 0 2-2V3zM5.829 5.854a.5.5 0 1 1 .707-.708l2.147 2.147 2.146-2.147a.5.5 0 1 1 .707.708L9.39 8l2.146 2.146a.5.5 0 0 1-.707.708L8.683 8.707l-2.147 2.147a.5.5 0 0 1-.707-.708L7.976 8 5.829 5.854z" />{" "}
        </svg>
      </span>
      <div className="postContainer">
        <p className="description">Add Post</p>
        <select value={typeOfPost} onChange={onInputChange} name="typeOfPost" className="allgames post">
          <option className="allgamesoption" value="Select Game">
            Select Game
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
        <input name="title" value={title} onChange={onInputChange} type="text" placeholder="Enter A Title" className="from-login-inputs post-title" />
        <textarea name="description" value={description} onChange={onInputChange} type="text" placeholder="Enter A Description" className="from-login-inputs field-text" />
        <div className="upload">
          <FileBase64 type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, imageFile: base64 })} />
        </div>
        <button onClick={onHandelSubmit} className="form-login-login post-ok">
          {" "}
          Submit
        </button>
        <button onClick={onClear} className="form-login-login clear-post">
          {" "}
          Clear
        </button>
      </div>
    </div>
  )
}
export default AddPost
