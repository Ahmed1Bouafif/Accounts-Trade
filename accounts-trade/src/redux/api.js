import axios from "axios"

const API = axios.create({ baseURL: "http://localhost:8000" })

API.interceptors.request.use((req) => {
  if (localStorage.getItem("userProfile")) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("userProfile")).token}`
  }
  return req
})

export const login = (formData) => API.post("/users/signin", formData)
export const register = (formData) => API.post("/users/signup", formData)
export const googleSignIn = (result) => API.post("/users/googleSignIn", result)

export const createPost = (postData) => API.post("/posts", postData)
export const getPosts = () => API.get("/posts")
export const searchUsers = () => API.get("/users/searchUsers")
export const getUser = (id) => API.get(`/users/getUser/${id}`)
