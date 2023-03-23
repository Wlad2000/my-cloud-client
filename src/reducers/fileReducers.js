import { createSlice } from '@reduxjs/toolkit'

const fileSlice = createSlice({
    name: 'files',
    initialState: {
      files: [],
      currentDir: null,
      popup: 'none',
      dirStack: [],
      last: null
    },
    reducers: {
      setFiles(state,action){
        state.files = action.payload
      },
      setCurrentDir(state,action){
        state.currentDir = action.payload
      },
      addFile(state,action){
      state.files = [...state.files, action.payload]
      },
      setPopup(state,action){
        state.popup = action.payload
      },
      pushStack(state,action){
       state.dirStack.push(action.payload)
       state.last = action.payload
      },
      popStack(state){
        state.last = state.dirStack.pop()
      },
      delFile(state,action){
        state.files = [...state.files.filter( file => file._id != action.payload)]
      },

    }
  })
  
  export const {setFiles,setCurrentDir, addFile, setPopup, pushStack,popStack, delFile } = fileSlice.actions
  export default fileSlice.reducer