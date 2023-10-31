import React from 'react'
import { Link } from 'react-router-dom'


function Navbars() {
  function logout(){
    localStorage.clear()
  }
  return (
    <>
    <nav className="navbar navbar-expand-lg  shadow-sm ">
  <div className="container-fluid">
    <Link className="navbar-brand nav-link " to="/salapp">SALES APP</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link " aria-current="page" to="/addsale" >ADD SALES</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/top5sal">TOP 5 SALES</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/todayrevenue"  >TODAY'S TOTAL REVENUE</Link>
        </li>
        
        <li className="nav-item">
          <Link className="nav-link " to="/register" >REGISTER</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">LOGIN</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link"   onClick={logout} to="/salapp"  >LOGOUT</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
   
  
    </>
  )
}

export default Navbars