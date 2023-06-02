import axios from "axios"
import { setUser } from "../reducers/userReducers"
import { API_URL } from "../utils/config"

export const registration = async (email, password) => {
    try{
        const res = await axios.post(`${API_URL}api/auth/registration`,{
            email,
            password
        })
        alert(res.data.message)

    }catch(e){
        alert(e.response.data.message)
    }
}

export const login =  (email, password) => {
    return async dispatch => {
        try{
            const res = await axios.post(`${API_URL}api/auth/login`,{
                email,
                password
            })
            dispatch(setUser(res.data.user))
            localStorage.setItem('token', res.data.token)
            console.log(res.data)
    
        }catch(e){
            alert(e.response.data.message)
        }
    }
    
}

export const auth =  () => {
    return async dispatch => {
        try{
            const res = await axios.get(`${API_URL}api/auth/auth`,
            {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}
            )
            dispatch(setUser(res.data))
            localStorage.setItem('token', res.data.token)
        }catch(e){
           // alert(e.response.data.message)
            localStorage.removeItem('token')
        }
    }
    
}