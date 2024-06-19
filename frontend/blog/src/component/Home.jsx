import React, { useContext, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/Authcontext';
import { Link } from "react-router-dom"
import { IoMdAdd } from "react-icons/io";
import "../App.css"
import Indexpages from './Indexpages';
const Home = () => {
  const [direct, setDirect] = useState(0);
  const { token } = useContext(AuthContext)
  const { user } = useContext(AuthContext)
  if (direct) {
    return <Navigate to={"/logout"}></Navigate>
    setDirect(false)
  }
  return (
    <>
      <div className='logo'>
        <Link to="/home">MyBlog</Link>
        <div className='logout'>
        {token  ? <Link to ={"/home/create"}><button> New Post</button></Link> :<></> }
          {token ? <button onClick={(() => setDirect(!direct))}>Logout</button> : <button onClick={(() => setDirect(1))} >Login</button>}
      </div>
      </div>

      <div className='home'>
        <Indexpages></Indexpages>
      </div>
    </>
  )
}
export default Home
