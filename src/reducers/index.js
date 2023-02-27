import { configureStore } from "@reduxjs/toolkit";

import fileReducers from "./fileReducers";
import userReducers from "./userReducers";



export const store = configureStore({
    reducer:{
        files: fileReducers,
        users: userReducers
    }
})