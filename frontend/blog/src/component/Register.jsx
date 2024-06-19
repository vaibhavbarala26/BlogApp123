import React from 'react'
import { useState } from 'react'
import { Link , Navigate} from 'react-router-dom'
const Register = () => {
    const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [redirect , setRedirect] = useState(false);
  const handlesubmit = async(e)=>{
    e.preventDefault();
    const response = await fetch("http://localhost:1000/register", {
      method:"POST", 
      body:JSON.stringify({username , password}),
      headers:{"Content-Type" : "application/json"},
  })
  if(response.ok){
    setRedirect(true);
}
else{
    alert("404 not found")
}

  }
  if(redirect){
    return <Navigate to = {"/"}></Navigate>
  }
  return (
    <div className='login'>
    <form onSubmit={handlesubmit} className='form'>
    <h1>Register</h1>
      <div className="username">
      <input type="text" value={username} onChange={(E)=>setUsername(E.target.value)} />
      </div>
      <div className="password">
      <input type="text" value={password} onChange={(E)=>setPassword(E.target.value)}/>
      </div>
      <button>Submit</button>
      <p>have registered? <Link to ={"/"}>Login</Link></p>

    </form>

      
    </div>
  )
}

export default Register
