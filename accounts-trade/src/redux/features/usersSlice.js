import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import * as api from "../api.js"

export const searchUsers = createAsyncThunk("users/searchUsers", async (_, { rejectWithValue }) => {
  try {
    const response = await api.searchUsers()
    return response.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})
export const getUser = createAsyncThunk("users/getUser", async (id, { rejectWithValue }) => {
  try {
    const response = await api.getUser(id)
    return response.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

const usersSlice = createSlice({
  name: "users",
  initialState: {
    user: {},
    users: [],
    error: "",
    loading: false,
  },
  extraReducers: {
    [searchUsers.pending]: (state, action) => {
      state.loading = true
    },
    [searchUsers.fulfilled]: (state, action) => {
      state.loading = false
      state.users = action.payload
    },
    [searchUsers.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },
    [getUser.pending]: (state, action) => {
      state.loading = true
    },
    [getUser.fulfilled]: (state, action) => {
      state.loading = false
      state.user = action.payload
    },
    [getUser.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },
  },
})
export default usersSlice.reducer
