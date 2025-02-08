import { configureStore } from '@reduxjs/toolkit'
import projectsSlice from './slices/projectSlice'

export default configureStore({
  reducer: {
    projects: projectsSlice,
  }
})