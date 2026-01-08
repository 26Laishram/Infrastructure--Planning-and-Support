import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import logo from "./Images/institute-logo.png";
import People from "./Components/People.jsx";
import HeaderWithLogout from "./Components/HeaderWithLogout.jsx";
import Home from "./Components/Home.jsx";
import Forms from "./Components/forms.jsx";
import Sidebar from "./Components/Sidebar.jsx";
import Navbar from "./Components/Navbar.jsx";
import Footer from "./Components/Footer/Footer.jsx"
import PageSkeleton from "./Components/PageSkeleton.jsx";
import Building from './Components/Building.jsx';
import Tender from './Components/Tender.jsx';
import ProjectCommittee from './Components/ProjectCommitte.jsx';



const Deans = lazy(() => import('./Components/deans.jsx'));
const Feedback=lazy(()=>import('./Components/feedback.jsx'))
const Documents=lazy(()=>import('./Components/Documents.jsx'))




const UserDashboard = () => <h1>Admin Dashboard - Protected User Section</h1>;

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();


  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
     <div className="min-h-screen bg-gray-50 overflow-hidden flex flex-col">
      <HeaderWithLogout toggleMobileMenu={toggleMobileMenu} isMobileMenuOpen={isMobileMenuOpen} />

      <div 
        className={`sm:hidden fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`} 
        onClick={() => setIsMobileMenuOpen(false)}
      />

      <div className="flex flex-grow relative" style={{ paddingTop: '70px' }}>
        <div 
          className={`fixed top-[70px] left-0 bottom-0 w-[280px] sm:w-[220px] lg:w-[250px] z-40 
            bg-white shadow-md transition-transform duration-300 ease-in-out
            ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'}`}
        >
          <Navbar closeMenu={() => setIsMobileMenuOpen(false)} />
        </div>

        {/* Main Content Area */}
        <div className="w-full sm:pl-[220px] lg:pl-[250px] flex flex-col min-h-full">
          <div className="max-w-full overflow-x-hidden flex-grow">
            {/* Scroll restoration */}
            <ScrollToTop />
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/people" element={<People />} />
                    <Route
                      path="/user/*"
                      element={
                          <UserDashboard />
                      }
                    />
                    <Route path="/Documents" element={<Documents/>} />
                    <Route path="/statistics/usage" element={<div>Statistics Usage</div>} />
                    <Route
                      path="/statistics/performance"
                      element={<div>Statistics Performance</div>}
                    />
                    <Route
                      path="/committees/building"
                      element={<Building />}
                    />
                    <Route
                      path="/committees/tender1B"
                      element={<Tender />}
                    />
                    <Route
                      path="/committees/project"
                      element={<ProjectCommittee />}
                    />
                    <Route path="/forms" element={
                <Suspense fallback={<PageSkeleton />}>
                  <Forms />
                </Suspense>
              } /> 
                    <Route path="/research-areas" element={<div>Research Areas</div>} />
                    <Route path="/deans" element={
                <Suspense fallback={<PageSkeleton />}>
                  <Deans />
                </Suspense>
              } />
                    <Route path="/feedback" element={<Feedback/>} />
                  </Routes>
          </div>
             <Footer/>
        </div>
     
      </div>
    </div>
  );
}


export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
