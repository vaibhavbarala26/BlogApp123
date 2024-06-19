import { useContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './component/Login'
import { Routes, Route } from "react-router-dom"
import Register from './component/Register'
import Home from './component/Home'
import Logout from './component/Logout'
import { AuthContext } from './context/Authcontext'
import Creater from './component/Creater'
import PostPage from './component/PostPage'
import Editpost from './component/Editpost'
function App() {
  const {isloggenId} = useContext(AuthContext)
  return (
    <>
    <div className="Home">
      <Routes>
        <Route path='/Home'  element={
          <>
          <Home></Home>
          </>
        }></Route>
        <Route path="/" index element={

          <Login></Login>
        }></Route>

        <Route path="/Register" element={

          <Register></Register>
        }></Route>
        <Route path =  "/logout" element={<Logout></Logout>}></Route>
        <Route path="/home/create" element={<Creater></Creater>}></Route>
        <Route path="/post/:id" element = {<PostPage></PostPage>}></Route>
        <Route path="/edit/:id" element = {<Editpost></Editpost>}></Route>
      </Routes>
      </div>
    </>
  )
}

export default App
