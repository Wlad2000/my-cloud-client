import { createSlice } from '@reduxjs/toolkit'

const loaderSlice = createSlice({
    name: 'loader',
    initialState: {
        isVisible: false
    },
    reducers: {
        ShowLoader(state){
            state.isVisible=true;
        },
        HideLoader(state){
            state.isVisible=false;
        }
      
    }
  })
  
  export const {ShowLoader,HideLoader} = loaderSlice.actions
  export default loaderSlice.reducer