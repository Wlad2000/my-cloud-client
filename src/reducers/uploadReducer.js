import { createSlice } from '@reduxjs/toolkit'

const uploadSlice = createSlice({
    name: 'upload',
    initialState: {
        files: [],
        isVisible: false
    },
    reducers: {
        Show(state){
            state.isVisible=true;
        },
        Hide(state){
            state.isVisible=false;
        },
        AddFile(state,action){
            state.files = [...state.files,{...action.payload}]
        },
        RemoveFile(state,action){
            state.files = [...state.files.filter(file => file.id !== action.payload)]
        },
        ChangeFile(state,action){
            state.files = [...state.files.map(file => file.id === action.payload.id 
                ? {...file, progress: action.payload.progress}
                : {...file}
                )]
        }
        
      
    }
  })
  
  export const {Show,Hide, AddFile,RemoveFile, ChangeFile} = uploadSlice.actions
  export default uploadSlice.reducer