import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../Styles/Sidebar.css";


const Sidebar = () => {
  const [openMenus, setOpenMenus] = useState({
    projects: false,
    statistics: false,
    committees: false,
  });

  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  return (
    <div className="sidebar" role="navigation" aria-label="Main menu">
      <nav>
        <ul>
          <li>
            <NavLink to="/" aria-current="page" className={({ isActive }) => (isActive ? "active" : "")}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/people" className={({ isActive }) => (isActive ? "active" : "")}>
              People
            </NavLink>
          </li>
          <li>
            <NavLink to="/Documents" className={({ isActive }) => (isActive ? "active" : "")}>
              Documents
            </NavLink>
          </li>

          {/* <li>
            <button
              type="button"
              className={`menu-toggle ${openMenus.projects ? "open" : ""}`}
              aria-haspopup="true"
              aria-expanded={openMenus.projects}
              onClick={() => toggleMenu("projects")}
            >
              <span>Projects</span>
              <span className="flex-grow"></span>
              <svg
                className={`arrow-icon ${openMenus.projects ? "rotated" : ""}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 
                     01-1.414 0l-4-4a1 1 0 010-1.414z"
                />
              </svg>
            </button>
            {openMenus.projects && (
              <ul className="submenu">
                <li><NavLink to="/projects/active" className={({ isActive }) => (isActive ? "active" : "")}>Active Projects</NavLink></li>
                <li><NavLink to="/projects/archived" className={({ isActive }) => (isActive ? "active" : "")}>Archived Projects</NavLink></li>
              </ul>
            )}
          </li> */}

          <li>
            <button
              type="button"
              className={`menu-toggle ${openMenus.statistics ? "open" : ""}`}
              aria-haspopup="true"
              aria-expanded={openMenus.statistics}
              onClick={() => toggleMenu("statistics")}
            >
              <span>Statistics</span>
              <span className="flex-grow"></span>
              <svg
                className={`arrow-icon ${openMenus.statistics ? "rotated" : ""}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 
                     01-1.414 0l-4-4a1 1 0 010-1.414z"
                />
              </svg>
            </button>
            {openMenus.statistics && (
              <ul className="submenu">
                <li><NavLink to="/statistics/usage" className={({ isActive }) => (isActive ? "active" : "")}>Usage</NavLink></li>
                <li><NavLink to="/statistics/performance" className={({ isActive }) => (isActive ? "active" : "")}>Performance</NavLink></li>
              </ul>
            )}
          </li>

          <li>
            <button
              type="button"
              className={`menu-toggle ${openMenus.committees ? "open" : ""}`}
              aria-haspopup="true"
              aria-expanded={openMenus.committees}
              onClick={() => toggleMenu("committees")}
            >
              <span>Committees</span>
              <span className="flex-grow"></span>
              <svg
                className={`arrow-icon ${openMenus.committees ? "rotated" : ""}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 
                     01-1.414 0l-4-4a1 1 0 010-1.414z"
                />
              </svg>
            </button>
            {openMenus.committees && (
              <ul className="submenu">
                <li><NavLink to="/committees/academic" className={({ isActive }) => (isActive ? "active" : "")}>Academic</NavLink></li>
                <li><NavLink to="/committees/administrative" className={({ isActive }) => (isActive ? "active" : "")}>Administrative</NavLink></li>
              </ul>
            )}
          </li>
          
          <li>
            <NavLink to="/forms" className={({ isActive }) => (isActive ? "active" : "")}>Forms</NavLink>
          </li>
          <li>
            <NavLink to="/deans" className={({ isActive }) => (isActive ? "active" : "")}>Deans</NavLink>
          </li>
          <li>
            <NavLink to="/feedback" className={({ isActive }) => (isActive ? "active" : "")}>Feedback</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
