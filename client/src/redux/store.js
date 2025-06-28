import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/AuthSlice'
import modalReducer from './slices/ModalSlice'
import postReducer from './slices/PostSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer,
    post: postReducer,
    // user: userReducer,
  },
}) 