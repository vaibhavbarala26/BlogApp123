import React, { useContext, useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { AuthContext } from '../context/Authcontext';

const PostPage = () => {
    const params = useParams();
    const[post , setPost] = useState("")
    
    useEffect(()=>{
        fetch(`http://localhost:1000/post/${params.id}`,{
            method:"GET",
        })
        .then((res)=>res.json())
        .then((res)=>setPost(res));
    },[])
    if(!post) return '';
    const y = new Date(post.msg.createdAt);
    let m = y.toString();
    let r = m.slice(0 , 21 );
    const {user} = useContext(AuthContext)
    console.log(user);

  return (
    <>
    <div className='Blogi'>
        <Link to="/home"><h1>MyBlog</h1></Link>
        <Link to="/logout"><button>Logout</button></Link>
    </div>
     <div className="title">
      <h1>{post.msg.title}</h1>
      </div>
      <p className="kal">
              <h1 className="author">  by {post.msg.author}</h1>
              <time>{r}</time>
      </p>
      <div className="edit">
      {user.msg.username === post.msg.author &&( <Link to={`/edit/${post.msg._id}`}><button>Edit</button></Link>)}
      </div>
    <div className="imagepost">
      <img src={`http://localhost:1000/${post.msg.file}`} alt="" />
      </div>
    <div className='postid'>
      <div className="content" dangerouslySetInnerHTML={{__html:post.msg.content}}> 
      </div>
    </div>
    </>
  )
}

export default PostPage
