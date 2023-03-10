import { createSlice } from '@reduxjs/toolkit'

const fileSlice = createSlice({
    name: 'files',
    initialState: {
      files: [],
      currentDir: null
    },
    reducers: {
      setFiles(state,action){
        state.files = action.payload;
      },
      setCurrentDir(state,action){
        state.currentDir = action.payload;
      }
    }
  })
  
  export const {setFiles,setCurrentDir } = fileSlice.actions
  export default fileSlice.reducer