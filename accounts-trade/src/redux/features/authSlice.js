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

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    error: "",
    loading: false,
  },
  extraReducers: {
    [login.pending]: (state, action) => {
      state.loading = true
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false
      localStorage.setItem("userProfile", JSON.stringify({ ...action.payload }))
      state.user = action.payload
    },
    [login.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },
  },
})

export default authSlice.reducer
