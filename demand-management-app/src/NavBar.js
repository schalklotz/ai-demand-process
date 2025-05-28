import React from 'react';
import { NavLink } from 'react-router-dom'; // Changed Link to NavLink

function NavBar() {
  return (
    <nav className="navbar"> {/* Added className */}
      <ul>
        <li>
          <NavLink to="/ideas" className={({ isActive }) => isActive ? "active" : ""}>Future Ideas</NavLink>
        </li>
        <li>
          <NavLink to="/projects" className={({ isActive }) => isActive ? "active" : ""}>Projects</NavLink>
        </li>
        <li>
          <NavLink to="/backlog" className={({ isActive }) => isActive ? "active" : ""}>Backlog</NavLink>
        </li>
        <li>
          <NavLink to="/gantt" className={({ isActive }) => isActive ? "active" : ""}>Gantt Chart</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
