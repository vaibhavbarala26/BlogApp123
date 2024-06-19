import React, { useContext, useEffect } from 'react'
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/Authcontext';

const Logout = () => {
  const {Logoutuser} = useContext(AuthContext);
  useEffect(()=>{
    Logoutuser();

  } , [Logoutuser])
  return <Navigate to = {"/"}></Navigate>
}

export default Logout
 