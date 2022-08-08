import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./features/authSlice.js"
import postReducer from "./features/postSlice.js"
import usersReducer from "./features/usersSlice.js"
export default configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
    users: usersReducer,
  },
})
