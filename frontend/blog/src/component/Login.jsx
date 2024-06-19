import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { AuthContext } from '../context/Authcontext'
import "../App.css"
const Login = () => {
  const {storetokenInLS} = useContext(AuthContext)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [redirect , setRedirect] = useState(false);
    const handlesubmit = async (e)=>{
      e.preventDefault();
      const response = await fetch("http://localhost:1000/login", {
        method:"POST", 
        body:JSON.stringify({username , password}),
        headers:{"Content-Type" : "application/json"},
    })
    if(response.ok){
      console.log(response);
      const res_data = await response.json();
      console.log(res_data);
      storetokenInLS(res_data.token)
      setRedirect(true);
  }
  else{
      alert("404 not found")
  }
    }
    if(redirect){
      return <Navigate to={"/home"}></Navigate>
      setRedirect(false)
    }
    return (
      <div className='login'>
      <form onSubmit={handlesubmit} className='form'>
      <h1>Login</h1>
      <div className="username">
        <input type="text" value={username} onChange={(E)=>setUsername(E.target.value)}/>
        </div>
        <div className="password">
        <input type="text" value={password} onChange={(E)=>setPassword(E.target.value)}/>
        </div>
        <button>Submit</button>
        <p>New User click on <Link to ={"/Register"}>Register</Link></p>
      </form>
      
        
      </div>
    )
}
export default Login
