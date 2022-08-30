import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import * as api from "../api.js"

export const createPost = createAsyncThunk("post/createPost", async ({ updatedPost, navigate, toast }, { rejectWithValue }) => {
  try {
    const response = await api.createPost(updatedPost) // because we added the name
    console.log("================================================================================>>>>>>>>", updatedPost)
    toast.success("Post Added Succesfully")
    navigate("/")
    return response.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const getPosts = createAsyncThunk("post/getPosts", async (page, { rejectWithValue }) => {
  try {
    const response = await api.getPosts(page)
    return response.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})
export const getPostsByUser = createAsyncThunk("post/getPostsByUser", async (id, { rejectWithValue }) => {
  try {
    const response = await api.getPostsByUser(id)
    return response.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})
export const deletePostById = createAsyncThunk("post/deletePostById", async (id, { rejectWithValue }) => {
  try {
    const response = await api.deletePostById(id)
    return response.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const likePost = createAsyncThunk("post/likePost", async ({ _id }, { rejectWithValue }) => {
  try {
    const response = await api.likePost(_id)
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
    currentPage: 1,
    numberOfPages: null,
    error: "",
    loading: false,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
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
    [getPosts.pending]: (state, action) => {
      state.loading = true
    },
    [getPosts.fulfilled]: (state, action) => {
      state.loading = false
      state.posts = action.payload.data
      state.numberOfPages = action.payload.numberOfPages
      state.currentPage = action.payload.currentPage
    },
    [getPosts.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },
    [getPostsByUser.pending]: (state, action) => {
      state.loading = true
    },
    [getPostsByUser.fulfilled]: (state, action) => {
      state.loading = false
      state.userPosts = action.payload
    },
    [getPostsByUser.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },
    [deletePostById.pending]: (state, action) => {
      state.loading = true
    },
    [deletePostById.fulfilled]: (state, action) => {
      state.loading = false
      state.userPosts = state.userPosts.filter((item) => item._id !== action.payload.posts[0]._id)
      console.log(action.payload.posts[0])
    },
    [deletePostById.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },
    [likePost.pending]: (state, action) => {},
    [likePost.fulfilled]: (state, action) => {
      state.loading = false
      const {
        arg: { _id },
      } = action.meta
      if (_id) {
        console.log("haha", action.payload)
        state.posts = state.posts.map((item) => (item._id === _id ? action.payload.updatesPost : item))
      }
      state.userPosts = state.userPosts.filter((item) => item._id !== action.payload.posts[0]._id)
    },
    [likePost.rejected]: (state, action) => {
      state.error = action.payload.message
    },
  },
})
export const { setCurrentPage } = postSlice.actions
export default postSlice.reducer
