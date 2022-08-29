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
export const addFriend = createAsyncThunk("users/addFriend", async ({ id, _id, toast }, { rejectWithValue }) => {
  try {
    const response = await api.addFriend(id, _id)
    toast.success("Request Sent Succesfully")
    return response.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})
export const acceptFriend = createAsyncThunk("users/acceptFriend", async ({ id, _id, toast }, { rejectWithValue }) => {
  try {
    const response = await api.acceptFriend(id, _id)
    toast.success("Request accepted Succesfully")
    return response.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})
export const cancelAddFriend = createAsyncThunk("users/cancelAddFriend", async ({ id, _id, toast }, { rejectWithValue }) => {
  try {
    const response = await api.cancelAddFriend(id, _id)
    toast.success("Request canceled Succesfully")
    return response.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})
export const changeUserName = createAsyncThunk("users/changeUserName", async ({ id, userName, toast }, { rejectWithValue }) => {
  try {
    const response = await api.changeUserName(id, userName)
    toast.success("Name Changed Succesfully")
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
    // sentFriendsResquests: [],
    // receivedFriendsResquests: [],
    // friends: [],
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
      console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", state.user)

      // state.sentFriendsResquests = action.payload.sentFriendsResquests
      // state.receivedFriendsResquests = action.payload.receivedFriendsResquests
      // state.friends = action.payload.friends
    },
    [getUser.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },
    [addFriend.pending]: (state, action) => {
      state.loading = true
    },
    [addFriend.fulfilled]: (state, action) => {
      state.loading = false
      state.user = { _id: state.user._id, email: state.user.email, password: state.user.password, userImage: state.user.userImage, userName: state.user.userName, receivedFriendRequestes: [...state.user.receivedFriendRequestes, action.meta.arg._id], sentFriendRequestes: [...state.user.sentFriendRequestes, action.meta.arg.id], friends: state.user.friends }
      console.log("=========>  Payloooaaaaaaaaaaaad", action.meta.arg)
      // console.log(action.payload.message)
    },
    [addFriend.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },
    [cancelAddFriend.pending]: (state, action) => {
      state.loading = true
    },
    [cancelAddFriend.fulfilled]: (state, action) => {
      state.loading = false
      state.user = { _id: state.user._id, email: state.user.email, password: state.user.password, userImage: state.user.userImage, userName: state.user.userName, receivedFriendRequestes: [...state.user.receivedFriendRequestes.slice(0, state.user.receivedFriendRequestes.indexOf(action.meta.arg._id)), ...state.user.receivedFriendRequestes.slice(state.user.receivedFriendRequestes.indexOf(action.meta.arg._id) + 1, state.user.receivedFriendRequestes.length)], sentFriendRequestes: [...state.user.sentFriendRequestes.slice(0, state.user.sentFriendRequestes.indexOf(action.meta.arg.id)), ...state.user.sentFriendRequestes.slice(state.user.sentFriendRequestes.indexOf(action.meta.arg.id) + 1, state.user.sentFriendRequestes.length)], friends: state.user.friends }
      // state.sentFriendsResquests = [...state.user.sentFriendRequestes.slice(0, state.sentFriendRequestes.indexOf(action.meta.arg.id)), ...state.sentFriendRequestes.slice(state.sentFriendRequestes.indexOf(action.meta.arg.id) + 1, state.sentFriendRequestes.length)]
      // console.log("=========>  Payloooaaaaaaaaaaaad", action.meta.arg)
      // console.log(action.payload.message)
    },
    [cancelAddFriend.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },
    [acceptFriend.pending]: (state, action) => {
      state.loading = true
    },
    [acceptFriend.fulfilled]: (state, action) => {
      state.loading = false
      state.user = { _id: state.user._id, email: state.user.email, password: state.user.password, userImage: state.user.userImage, userName: state.user.userName, receivedFriendRequestes: state.user.receivedFriendRequestes, sentFriendRequestes: state.user.sentFriendRequestes, friends: [...state.user.friends, action.meta.arg.id] }
      // state.friends = [...state.friends, action.meta.arg.id]
      // console.log("=========>  Payloooaaaaaaaaaaaad", action.meta.arg)
      // console.log(action.payload.message)
    },
    [acceptFriend.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },
    [changeUserName.pending]: (state, action) => {
      state.loading = true
    },
    [changeUserName.fulfilled]: (state, action) => {
      state.loading = false
      state.user = { _id: state.user._id, email: state.user.email, password: state.user.password, userImage: state.user.userImage, userName: action.payload.newName, receivedFriendRequestes: state.user.receivedFriendRequestes, sentFriendRequestes: state.user.sentFriendRequestes, friends: state.user.friends }
      // state.friends = [...state.friends, action.meta.arg.id]
      console.log("=========>  Payloooaaaaaaaaaaaad", action.payload)
      // console.log(action.payload.message)
    },
    [changeUserName.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },
  },
})
export default usersSlice.reducer
