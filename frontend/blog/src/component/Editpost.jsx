import React, { useContext, useEffect, useState } from 'react'
import Reactquill from 'react-quill';
import { AuthContext } from '../context/Authcontext';
import { Link, Navigate, useParams } from 'react-router-dom';
const img = "https://w7.pngwing.com/pngs/64/776/png-transparent-computer-icons-upload-share-icon-upload-button-angle-text-number-thumbnail.png"
const Editpost = () => {
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [content, setContent] = useState("");
    const [redirect, setRedirect] = useState(false);
    const [file, setFile] = useState("")
    const {user} = useContext(AuthContext);
  const params  =  useParams();
    useEffect(()=>{
        fetch("http://localhost:1000/post/"+params.id,{
            method:"GET",
            headers:{"content-type":"application/json"}
        })
        .then((res)=>res.json())
        .then((res)=>{
            console.log(res)
            setTitle(res.msg.title)
            setSummary(res.msg.summary)
            setContent(res.msg.content)
            setFile(file)
        })
    } , [])

    const handleedit = async(e)=>{
        e.preventDefault();
        const data = new FormData();
        data.set("title" , title);
        data.set("summary" , summary),
        data.set("content" , content),
        await fetch(`http://localhost:1000/post/${params.id}` , {
            method:"PUT",
            body:JSON.stringify({title , summary , content}),
        headers:{"Content-Type" : "application/json"},
        })
        setRedirect(true);
    }
    if(redirect){
      return <Navigate to ={`/post/${params.id}`}></Navigate>
    }


  return (
    <div>
          <div className="yyy">
      <div className='Blogg'>
        <Link to="/home">MyBlog</Link>
        <Link to="/logout"><button>Logout</button></Link>
      </div>
      
      <div className='bada'>
        <form className='page' onSubmit={handleedit}>
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
          <button className='postbutton' style={{marginBottom:"30px"}}>Edit Post</button>
        </form>
      </div>
    </div>
    </div>
  )
}

export default Editpost
