import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import Home from './Home'
import { Navigate } from 'react-router-dom'
import Reactquill from "react-quill"
import EditorToolbar, { modules, formats } from "../quill/EditorToolbar"
import "react-quill/dist/quill.snow.css"
import { AuthContext } from '../context/Authcontext'
import "../App.css"
const img = "https://w7.pngwing.com/pngs/64/776/png-transparent-computer-icons-upload-share-icon-upload-button-angle-text-number-thumbnail.png"
import { htmlToText } from "html-to-text"
const Creater = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [file, setFile] = useState("")
  const {user} = useContext(AuthContext);

  const handlesubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", file[0]);
    data.set("author" , user.msg.username)
    setFile('');
    console.log(file[0]);
    try {
      const response = await fetch("http://localhost:1000/upload", {
        method: "POST",
        body: data,
      })
      if (response.ok) {
        setRedirect(true)
      }
      console.log(response);
    }
    catch (e) {

    }
  }
  if (redirect) {
    return <Navigate to={"/home"}></Navigate>
    setRedirect(false);
    
  }

  

  return (
    <div className="yyy">
      <div className='Blogg'>
        <Link to="/home">MyBlog</Link>
        <Link to="/logout"><button>Logout</button></Link>
      </div>
      
      <div className='bada'>
        <form className='page' onSubmit={handlesubmit}>
          <div className="qill">
            <input type="title" placeholder='Title' value={title} onChange={((e) => setTitle(e.target.value))} />
            <input type="summary" placeholder='summary' value={summary} onChange={((e) => setSummary(e.target.value))} />
          </div>
          <div className="app">
          <div className="parent">
            <div className="file-upload">
              <img src={img} alt="upload" />
              <h3>Click box to upload</h3>
              <p>Maximun file size 10mb</p>
              <input type="file" onChange={((e)=>(setFile(e.target.files)))} />
            </div>
          </div>
        </div>
          <div>
          </div>
          <div>
            <Reactquill value={content} onChange={newValue => setContent(newValue)}></Reactquill>
          </div>
          <button className='postbutton'>Create Post</button>
        </form>
      </div>
    </div>

  )
}

export default Creater
