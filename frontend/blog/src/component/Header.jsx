
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div>
      <header>
          <Link to="/home" className="logo">MyBlog</Link>
        </header>
    </div>
  )
}

export default Header
