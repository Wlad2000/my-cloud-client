import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./loaderReducer";

import fileReducers from "./fileReducers";
import uploadReducer from "./uploadReducer";
import userReducers from "./userReducers";



export const store = configureStore({
    reducer:{
        files: fileReducers,
        users: userReducers,
        upload: uploadReducer,
        loader: appReducer,
    }
})