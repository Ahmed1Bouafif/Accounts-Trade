import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import * as api from "../api.js"
export const login = createAsyncThunk("auth/login", async ({ formData, navigate, toast }, { rejectWithValue }) => {
  try {
    const response = await api.login(formData)
    toast.success("Login Succesfully")
    navigate("/")
    return response.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const register = createAsyncThunk("auth/register", async ({ formData, navigate, toast }, { rejectWithValue }) => {
  try {
    const response = await api.register(formData)
    toast.success("register Succesfully")
    navigate("/")
    return response.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})
export const googleSignIn = createAsyncThunk("auth/googleSignIn", async ({ result, navigate, toast }, { rejectWithValue }) => {
  try {
    const response = await api.googleSignIn(result)
    toast.success("Google Sign-In Succesfully")
    navigate("/")
    return response.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userConnected: null,
    error: "",
    loading: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.userConnected = action.payload
    },
    setLogout: (state, action, path) => {
      localStorage.clear()
      state.userConnected = null
      path("/")
    },
  },
  extraReducers: {
    [login.pending]: (state, action) => {
      state.loading = true
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false
      localStorage.setItem("userProfile", JSON.stringify({ ...action.payload }))
      state.userConnected = action.payload
    },
    [login.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },
    [register.pending]: (state, action) => {
      state.loading = true
    },
    [register.fulfilled]: (state, action) => {
      state.loading = false
      localStorage.setItem("userProfile", JSON.stringify({ ...action.payload }))
      state.userConnected = action.payload
    },
    [register.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },
    [googleSignIn.pending]: (state, action) => {
      state.loading = true
    },
    [googleSignIn.fulfilled]: (state, action) => {
      state.loading = false
      localStorage.setItem("userProfile", JSON.stringify({ ...action.payload }))
      state.userConnected = action.payload
    },
    [googleSignIn.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },
  },
})

export const { setUser, setLogout } = authSlice.actions
export default authSlice.reducer
