import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import * as api from "../api.js"

export const createPost = createAsyncThunk("post/createPost", async ({ updatedPost, navigate, toast }, { rejectWithValue }) => {
  try {
    const response = await api.createPost(updatedPost) // because we added the name
    toast.success("Post Added Succesfully")
    navigate("/")
    return response.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

const postSlice = createSlice({
  name: "post",
  initialState: {
    post: {},
    posts: [],
    userPosts: [],
    error: "",
    loading: false,
  },
  extraReducers: {
    [createPost.pending]: (state, action) => {
      state.loading = true
    },
    [createPost.fulfilled]: (state, action) => {
      state.loading = false
      state.posts = [action.payload]
    },
    [createPost.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },
  },
})
export default postSlice.reducer
