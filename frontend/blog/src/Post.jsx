import React from 'react'
import "./App.css"
import { Link } from 'react-router-dom';

const Post = ({file}) => {
  const y = new Date(file.createdAt);
  let m = y.toString();
  let r = m.slice(0 , 21 );
  return (
    <div>
          <div className="entry">
        <div className="image">
        <Link to={`/post/${file._id}`}>
<img src={"http://localhost:1000/"+file.file} alt="" />
</Link>
</div>
          <div className="texts">
            <Link to={`/post/${file._id}`}>
            <h2>{file.title}</h2>
            </Link>
            <p className="info">
              <a className="author">{file.author}</a>
              <br />
              <time>{r}</time>
            </p>
            <p className="summary">
              {file.summary}
            </p>
          </div>

        </div>
    </div>
  )
}

export default Post
