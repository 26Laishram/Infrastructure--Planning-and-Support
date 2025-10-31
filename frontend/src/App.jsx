import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import logo from "./Images/institute-logo.png";
import People from "./Components/People.jsx";
import { AuthProvider } from "./Components/AuthProvider.jsx";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";
import LoginPage from "./Components/LoginPage.jsx";
import RegistrationPage from "./Components/RegistrationPage.jsx";
import HeaderWithLogout from "./Components/HeaderWithLogout.jsx";
import Home from "./Components/Home.jsx";
import Forms from "./Components/forms.jsx";
import Sidebar from "./Components/Sidebar.jsx";
import Navbar from "./Components/Navbar.jsx";



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
            <AuthProvider>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/people" element={<People />} />
                    <Route
                      path="/user/*"
                      element={
                        <ProtectedRoute>
                          <UserDashboard />
                        </ProtectedRoute>
                      }
                    />
                    <Route path="/register" element={<RegistrationPage />} />
                    <Route path="/Documents" element={<div>Documents Page</div>} />
                    <Route path="/statistics/usage" element={<div>Statistics Usage</div>} />
                    <Route
                      path="/statistics/performance"
                      element={<div>Statistics Performance</div>}
                    />
                    <Route
                      path="/committees/academic"
                      element={<div>Academic Committees</div>}
                    />
                    <Route
                      path="/committees/administrative"
                      element={<div>Administrative Committees</div>}
                    />
                    <Route path="/forms" element={<Forms />} />
                    <Route path="/research-areas" element={<div>Research Areas</div>} />
                    <Route path="/deans" element={<div>Deans Page</div>} />
                    <Route path="/feedback" element={<div>Feedback Page</div>} />
                  </Routes>
            </AuthProvider>
          </div>
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
