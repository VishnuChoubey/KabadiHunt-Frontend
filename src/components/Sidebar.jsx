import React from 'react'
import '../style/Sidebar.css';
import { NavLink,Link } from 'react-router-dom';
export default function Sidebar({ isOpen ,toggleSidebar}) {
 
  return (
    <>
   
  
       <div className={`sidebar ${isOpen ? 'open' : 'closed'}`} >
             
               <div className="main-sidebar">
                  <ul className="item-class">
                    <li className="item-list" id="item-1">
                       <Link className="Nav-link" to="/">Home</Link>
                       <button className='closebtn' onClick={toggleSidebar}>☰</button>
                    </li>
                    <li className="item-list" id="item-2">
                         <Link className="Nav-link" to="/about">About Us</Link>
                    </li>
                    <li className="item-list" id="item-3">
                         <Link className="Nav-link" to="/e-facility">E-Facilities</Link>
                    </li>
                    <li className="item-list" id="item-4">
                       <Link className="Nav-link" to="/education">Education</Link>
                    </li>
                    <li className="item-list" id="item-5">
                       <Link className="Nav-link" to="/contact">Contact Us</Link>
                    </li>
                    <li className="item-list" id="item-6">
                           <Link className="Nav-link" to="/classify-image">Classify-Image</Link>
                    </li>
                    
                  </ul>
                </div>      
        </div>

        </>
  
  )
}
