import axios from "axios"

const API = axios.create({ baseURL: "http://localhost:8000" })

export const login = (formData) => API.post("/users/signin", formData)
export const register = (formData) => API.post("/users/signup", formData)
export const googleSignIn = (result) => API.post("/users/googleSignIn", result)
