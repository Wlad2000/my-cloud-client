import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'users',
    initialState: {
        currentUser: {},
        isAuth: false
    },
    reducers: {
        setUser(state,action){
            state.currentUser=action.payload;
            state.isAuth=true;
        },
        logOut(state){
            state.currentUser={};
            state.isAuth=false;
            localStorage.removeItem('token');
        }
        
      
    }
  })
  
  export const {setUser,logOut } = userSlice.actions
  export default userSlice.reducer