import React,{useState} from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = ({ closeMenu }) => {

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
    
    const handleLinkClick = () => {
        if (closeMenu) closeMenu();
    };

    return (
        <nav className="h-full w-full bg-white overflow-y-auto pb-20">
            <div className="flex justify-between items-center p-4 sm:hidden">
                <h2 className="font-bold text-gray-800">Menu</h2>
                <button
                    onClick={closeMenu}
                    className="p-2 rounded-full hover:bg-gray-100"
                >
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <ul className="space-y-1 p-3">
                <li className='rounded-lg hover:bg-slate-100 transition-all duration-200'>
                    <NavLink
                        to="/"
                        className={({ isActive }) => `py-2 rounded-lg pl-3 font-medium block w-full ${isActive ? 'bg-slate-100 text-indigo-600' : 'text-gray-700'}`}
                        onClick={handleLinkClick}
                    >
                        Home
                    </NavLink>
                </li>
             
                <li className='rounded-lg hover:bg-slate-100 transition-all duration-200'>
                    <NavLink
                        to="/people"
                        className={({ isActive }) => `py-2 rounded-lg pl-3 font-medium block w-full ${isActive ? 'bg-slate-100 text-indigo-600' : 'text-gray-700'}`}
                        onClick={handleLinkClick}
                    >
                        People
                    </NavLink>
                </li>
                
                <li className='rounded-lg hover:bg-slate-100 transition-all duration-200'>
                    <NavLink
                        to="/Documents"
                        className={({ isActive }) => `py-2 rounded-lg pl-3 font-medium block w-full ${isActive ? 'bg-slate-100 text-indigo-600' : 'text-gray-700'}`}
                        onClick={handleLinkClick}
                    >

                       Documents

                    </NavLink>
                </li>
               

              
               


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
               

                 
                <li className='rounded-lg hover:bg-slate-100 transition-all duration-200'>
                    <NavLink
                        to="/forms"
                        className={({ isActive }) => `py-2 rounded-lg pl-3 font-medium block w-full ${isActive ? 'bg-slate-100 text-indigo-600' : 'text-gray-700'}`}
                        onClick={handleLinkClick}
                    >
                        Forms
                    </NavLink>
                </li>

                  <li className='rounded-lg hover:bg-slate-100 transition-all duration-200'>
                    <NavLink
                        to="/deans"
                        className={({ isActive }) => `py-2 rounded-lg pl-3 font-medium block w-full ${isActive ? 'bg-slate-100 text-indigo-600' : 'text-gray-700'}`}
                        onClick={handleLinkClick}
                    >
                        Deans
                    </NavLink>
                </li>
                
                


              
                
              
                <li className='rounded-lg hover:bg-slate-100 transition-all duration-200'>
                    <NavLink
                        to="/feedback"
                        className={({ isActive }) => `py-2 rounded-lg pl-3 font-medium block w-full ${isActive ? 'bg-slate-100 text-indigo-600' : 'text-gray-700'}`}
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