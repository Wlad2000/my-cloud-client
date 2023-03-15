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
      },
      popStack(state,action){
        state.last = state.dirStack.pop()
      },

    }
  })
  
  export const {setFiles,setCurrentDir, addFile, setPopup, pushStack,popStack } = fileSlice.actions
  export default fileSlice.reducer