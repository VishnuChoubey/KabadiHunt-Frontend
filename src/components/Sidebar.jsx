import React from 'react';
import { NavLink } from 'react-router-dom';
import '../style/Sidebar.css';

export default function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <nav className={`sidebar${isOpen ? ' open' : ''}`} aria-label="Sidebar Navigation">
      <div className="sidebar-header">
        <button className="sidebar-closebtn" onClick={toggleSidebar} aria-label="Close Sidebar">
          &times;
        </button>
        <h2 className="sidebar-title">Menu</h2>
      </div>
      <ul className="sidebar-list">
        <li>
          <NavLink exact="true" to="/" className="sidebar-link" activeclassname="active" onClick={toggleSidebar}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className="sidebar-link" activeclassname="active" onClick={toggleSidebar}>
            About Us
          </NavLink>
        </li>
        <li>
          <NavLink to="/e-facility" className="sidebar-link" activeclassname="active" onClick={toggleSidebar}>
            E-Facilities
          </NavLink>
        </li>
        <li>
          <NavLink to="/education" className="sidebar-link" activeclassname="active" onClick={toggleSidebar}>
            Education
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" className="sidebar-link" activeclassname="active" onClick={toggleSidebar}>
            Contact Us
          </NavLink>
        </li>
        <li>
          <NavLink to="/classify-image" className="sidebar-link" activeclassname="active" onClick={toggleSidebar}>
            Classify Image
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}