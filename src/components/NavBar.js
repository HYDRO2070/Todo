import React from 'react'
import './NavBar.css';
import logo from "../logo.svg"

const NavBar = () => {
  return (
    <div className='NavBar'>
      <div className="main">

      <nav>
        <div className="log">
          <div className="app-logo">
          <img src={logo} alt="" />
          </div>
          <h3>React App</h3>
        </div>
        <ul>
          <li>Search</li>
          <li>About Us</li>
          <li>Help</li>
          <li>Login</li>
        </ul>
      </nav>
      </div>
    </div>
  )
}

export default NavBar