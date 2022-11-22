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
export const getOnePost = createAsyncThunk("post/getOnePost", async (id, { rejectWithValue }) => {
  try {
    const response = await api.getOnePost(id)
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
export const comment = createAsyncThunk("post/comments", async ({ id, commentt, _id }, { rejectWithValue }) => {
  try {
    const response = await api.comment(id, commentt, _id)
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
    notifications: [],
    currentPage: 1,
    numberOfPages: null,
    thatNoti: {},
    error: "",
    loading: false,
    loadingLike: false,
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
    [getOnePost.pending]: (state, action) => {
      state.loading = true
    },
    [getOnePost.fulfilled]: (state, action) => {
      state.loading = false
      state.post = action.payload
    },
    [getOnePost.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },
    [deletePostById.pending]: (state, action) => {
      state.loading = true
    },
    [deletePostById.fulfilled]: (state, action) => {
      state.loading = false
      state.userPosts = state.userPosts.filter((item) => item._id !== action.payload.posts[0]._id)
      state.posts = state.posts.filter((item) => item._id !== action.payload.posts[0]._id)
      console.log(action.payload.posts[0])
    },
    [deletePostById.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },
    [likePost.pending]: (state, action) => {
      state.loadingLike = true
      // const {
      //   arg: { _id },
      // } = action.meta
      // if (_id) {
      //   state.post = action.payload.updatesPost
      // }
    },
    [likePost.fulfilled]: (state, action) => {
      state.loadingLike = false
      const {
        arg: { _id },
      } = action.meta
      if (_id) {
        console.log("haha", action.payload)
        state.posts = state.posts.map((item) => (item._id === _id ? action.payload.updatesPost : item))
        state.post = action.payload.updatesPost
        state.notifications = [...state.notifications, ...action.payload.sendNofit.notifications]
        state.thatNoti = action.payload.bob
        console.log("blooooooo", action.payload.sendNofit.notifications)
        // state.notifications = [...new Set(state.notifications)]
      }
      state.userPosts = state.userPosts.filter((item) => item._id !== action.payload.posts[0]._id)
    },
    [likePost.rejected]: (state, action) => {
      state.error = action.payload.message
    },
    [comment.pending]: (state, action) => {
      // state.loading = true
    },
    [comment.fulfilled]: (state, action) => {
      state.loading = false
      const {
        arg: { _id },
      } = action.meta
      if (_id) {
        state.posts = state.posts.map((item) => (item._id === _id ? action.payload.updatesPost : item))
        state.post = action.payload.updatesPost
        state.notifications = [...state.notifications, ...action.payload.sendNofit.notifications]
        state.thatNoti = action.payload.bob
        // state.notifications = [...new Set(state.notifications)]
      }
      state.userPosts = state.userPosts.filter((item) => item._id !== action.payload.posts[0]._id)
    },
    [comment.rejected]: (state, action) => {
      state.error = action.payload.message
    },
  },
})
export const { setCurrentPage } = postSlice.actions
export default postSlice.reducer
