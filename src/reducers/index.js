import { configureStore } from "@reduxjs/toolkit";

import fileReducers from "./fileReducers";
import uploadReducer from "./uploadReducer";
import userReducers from "./userReducers";



export const store = configureStore({
    reducer:{
        files: fileReducers,
        users: userReducers,
        upload: uploadReducer
    }
})