import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'users',
    initialState: {
        currentUser: {},
        isAuth: false
    },
    reducers: {
      
    }
  })
  
  export const { } = userSlice.actions
  export default userSlice.reducer