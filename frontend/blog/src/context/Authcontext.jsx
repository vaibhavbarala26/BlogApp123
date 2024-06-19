import { createContext, useEffect, useState } from "react";
export const AuthContext = createContext();
export const AuthProvider = ({children})=>{
    const storetokenInLS = (servertoken)=>{
        return localStorage.setItem("token" , servertoken)
    }
    const [token , setToken] = useState(localStorage.getItem("token"));
    const [user , setUser] = useState("")
    const Logoutuser = ()=>{
        setToken("");
        return localStorage.removeItem("token");
    }
    const userAuthentication = async()=>{
        try{
const respose = await fetch("http://localhost:1000/user" , {
    method :"GET", 
    headers : {
        Authorization : `Bearer ${token}`,
    }
})
if(respose.ok){
    const data = await respose.json();
    setUser(data);
}
        }
        catch(e){
        }
    }
    useEffect(()=>{
        userAuthentication();
    } , [])

    return<AuthContext.Provider value={{storetokenInLS , Logoutuser , token , user}}>
        {children}
    </AuthContext.Provider>
}