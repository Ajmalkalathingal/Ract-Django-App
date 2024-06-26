import { Children } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useState, useEffect } from "react";


const ProtectdRouter = ({children}) =>{

    const [isAutherized, setIsAutherized] = useState(null)

    useEffect(() =>{
        auth().catch(() => {setIsAutherized(false)})

    },[])

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN)
        try {
            const res = await api.post('/api/token/refresh/',{refresh:refreshToken})
            if( res.status === 200) {
            localStorage.setItem(ACCESS_TOKEN,res.data.access)
            setIsAutherized(true)
        }else{
            setIsAutherized(false)
        }
        } catch (error) {
            console.log(error)
            setIsAutherized(true)   
        }
    }

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN)
        if(!token){
            setIsAutherized(false)
            return;
        }
        const decoed = jwtDecode(token)
        const tokenExpiry = decoed.exp
        const now = Date.now() / 1000

        if(now < tokenExpiry){
            await refreshToken()
        }else{
            setIsAutherized(true)
        }

    }
    if(isAutherized===null){
        return <div className="">Loading.....</div>
    }
    return isAutherized ? children : <Navigate to={'/login'}/>
}

export default ProtectdRouter