import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = ({ closeMenu }) => {
  const [openMenus, setOpenMenus] = useState({
    statistics: false,
    committees: false,
  });

  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  const handleLinkClick = () => {
    if (closeMenu) closeMenu();
  };

  return (
    <nav className="h-full w-full bg-white overflow-y-auto pb-20">
      {/* Mobile Top Bar */}
      <div className="flex justify-between items-center p-4 sm:hidden border-b">
        <h2 className="font-bold text-gray-800 text-lg">Menu</h2>
        <button
          onClick={closeMenu}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Menu List */}
      <ul className="space-y-1 p-3">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `block w-full py-2 pl-3 rounded-lg font-medium transition ${
                isActive ? "bg-indigo-50 text-indigo-600" : "text-gray-700 hover:bg-gray-100"
              }`
            }
            onClick={handleLinkClick}
          >
            Home
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/people"
            className={({ isActive }) =>
              `block w-full py-2 pl-3 rounded-lg font-medium transition ${
                isActive ? "bg-indigo-50 text-indigo-600" : "text-gray-700 hover:bg-gray-100"
              }`
            }
            onClick={handleLinkClick}
          >
            People
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/Documents"
            className={({ isActive }) =>
              `block w-full py-2 pl-3 rounded-lg font-medium transition ${
                isActive ? "bg-indigo-50 text-indigo-600" : "text-gray-700 hover:bg-gray-100"
              }`
            }
            onClick={handleLinkClick}
          >
            Documents
          </NavLink>
        </li>

        {/* Statistics Dropdown */}
        <li>
          <button
            type="button"
            onClick={() => toggleMenu("statistics")}
            className="flex cursor-pointer items-center w-full py-2 pl-3 rounded-lg text-gray-700 hover:bg-gray-100 font-medium transition"
          >
            <span>Statistics</span>
            <span className="flex-grow"></span>
            <svg
              className={`w-5 h-5 transform transition-transform ${
                openMenus.statistics ? "rotate-180" : ""
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.25 4.4a.75.75 0 01-1.08 0l-4.25-4.4a.75.75 0 01.02-1.06z"
              />
            </svg>
          </button>

          {openMenus.statistics && (
            <ul className="ml-4 mt-1 border-l border-indigo-300 pl-3 space-y-1">
              <li>
                <NavLink
                  to="/statistics/usage"
                  className={({ isActive }) =>
                    `block py-1 text-sm ${
                      isActive ? "text-indigo-600 font-medium" : "text-gray-700 hover:text-indigo-600"
                    }`
                  }
                  onClick={handleLinkClick}
                >
                  Usage
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/statistics/performance"
                  className={({ isActive }) =>
                    `block py-1 text-sm ${
                      isActive ? "text-indigo-600 font-medium" : "text-gray-700 hover:text-indigo-600"
                    }`
                  }
                  onClick={handleLinkClick}
                >
                  Performance
                </NavLink>
              </li>
            </ul>
          )}
        </li>

        {/* Committees Dropdown */}
        <li>
          <button
            type="button"
            onClick={() => toggleMenu("committees")}
            className="flex cursor-pointer items-center w-full py-2 pl-3 rounded-lg text-gray-700 hover:bg-gray-100 font-medium transition"
          >
            <span>Committees</span>
            <span className="flex-grow"></span>
            <svg
              className={`w-5 h-5 transform transition-transform ${
                openMenus.committees ? "rotate-180" : ""
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.25 4.4a.75.75 0 01-1.08 0l-4.25-4.4a.75.75 0 01.02-1.06z"
              />
            </svg>
          </button>

          {openMenus.committees && (
            <ul className="ml-4 mt-1 border-l border-indigo-300 pl-3 space-y-1">
              <li>
                <NavLink
                  to="/committees/building"
                  className={({ isActive }) =>
                    `block py-1 text-sm ${
                      isActive ? "text-indigo-600 font-medium" : "text-gray-700 hover:text-indigo-600"
                    }`
                  }
                  onClick={handleLinkClick}
                >
                  Building Works Committee
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/committees/tender1B"
                  className={({ isActive }) =>
                    `block py-1 text-sm ${
                      isActive ? "text-indigo-600 font-medium" : "text-gray-700 hover:text-indigo-600"
                    }`
                  }
                  onClick={handleLinkClick}
                >
                  Tender Scrutiny Committee (Phase 1B)
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/committees/project"
                  className={({ isActive }) =>
                    `block py-1 text-sm ${
                      isActive ? "text-indigo-600 font-medium" : "text-gray-700 hover:text-indigo-600"
                    }`
                  }
                  onClick={handleLinkClick}
                >
                  Project Monitoring Group Committee
                </NavLink>
              </li>
            </ul>
          )}
        </li>

        <li>
          <NavLink
            to="/forms"
            className={({ isActive }) =>
              `block w-full py-2 pl-3 rounded-lg font-medium transition ${
                isActive ? "bg-indigo-50 text-indigo-600" : "text-gray-700 hover:bg-gray-100"
              }`
            }
            onClick={handleLinkClick}
          >
            Forms
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/deans"
            className={({ isActive }) =>
              `block w-full py-2 pl-3 rounded-lg font-medium transition ${
                isActive ? "bg-indigo-50 text-indigo-600" : "text-gray-700 hover:bg-gray-100"
              }`
            }
            onClick={handleLinkClick}
          >
            Deans
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/feedback"
            className={({ isActive }) =>
              `block w-full py-2 pl-3 rounded-lg font-medium transition ${
                isActive ? "bg-indigo-50 text-indigo-600" : "text-gray-700 hover:bg-gray-100"
              }`
            }
            onClick={handleLinkClick}
          >
            Feedback
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
