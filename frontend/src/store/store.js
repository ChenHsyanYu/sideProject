import { configureStore } from '@reduxjs/toolkit'
import projectsSlice from './slices/projectSlice'
import userSlice from './slices/userSlice'

export default configureStore({
  reducer: {
    projects: projectsSlice,
    user: userSlice,
  },
  devTools: process.env.NODE_ENV !== 'production',
})