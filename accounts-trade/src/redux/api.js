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
export const deletePostById = (id) => API.patch("/posts/delete", id)
export const getPosts = (page) => API.get(`/posts?page=${page}`)
export const getPostsByUser = (id) => API.get(`/posts/${id}`)
export const getOnePost = (id) => API.get(`/posts/OnePost?post=${id}`)
export const searchUsers = () => API.get("/users/searchUsers")
export const getUser = (id) => API.get(`/users/getUser/${id}`)
export const getUserNoti = (id) => API.get(`/users/getUserNoti?usernoti=${id}`)
export const getUserNotifs = (id) => API.get(`/users/getUserNotifs?notifs=${id}`)
export const getUserNotifsSeen = (id) => API.get(`/users/getUserNotifsSeen?notifs=${id}`)
export const addFriend = (id, _id) => API.post(`/users/addFriend/${id}`, _id)
export const cancelAddFriend = (id, _id) => API.post(`/users/cancelAddFriend/${id}`, _id)
export const acceptFriend = (id, _id) => API.post(`/users/acceptFriend/${id}`, _id)
export const changeUserName = (id, userName) => API.post(`/users/changeUserName/${id}`, userName)
export const likePost = (id) => API.post(`/posts/like/${id}`)
export const comment = (id, commentt, _id) => API.post(`/posts/comment/${id}`, { commentt, _id })
export const sendMsg = (id, msg, _id) => API.post(`/users/chat`, { id, msg, _id })
