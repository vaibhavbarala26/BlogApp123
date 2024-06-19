import React, { useEffect, useState } from 'react'
import Post from '../Post'

const Indexpages = () => {
  const [file , setFile] = useState("")
  useEffect(()=>{
    fetch("http://localhost:1000/post" , {
      method:"GET"
    }).then((response) =>response.json())
    .then((reponse) => setFile(reponse))
  },[])
  return (
    <div>
      {file.length>0 && file.map((file)=>(
        <Post file = {file}></Post>
      ))}
      
    </div>
  )
}

export default Indexpages;
