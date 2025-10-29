import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./Components/Sidebar.jsx";
import "./App.css";
import logo from "./Images/institute-logo-BzJthTVs.png";
import People from "./Components/People.jsx"
import { AuthProvider } from './Components/AuthProvider.jsx';
import ProtectedRoute from './Components/ProtectedRoute.jsx';
import LoginPage from './Components/LoginPage.jsx';
import RegistrationPage from './Components/RegistrationPage.jsx';
import HeaderWithLogout from './Components/HeaderWithLogout.jsx';
import Home from "./Components/Home.jsx";


// import LoginPage from './Components/LoginPage.jsx';

// const Home = () => <h1>Public Home Page</h1>;
const UserDashboard = () => <h1>Admin Dashboard - Protected User Section</h1>;
function App() {
  return (
    <>
    {/* <header className="top-bar">
    <img src={logo} alt="" />
    <h2>Infrastructure, Planning and Support</h2>
    </header> */}
    <AuthProvider>
      
    <Router>
    <HeaderWithLogout logo={logo} />
    <div className="app-body">
    <aside className="sidebar-container">
          <Sidebar />
        </aside>
        <main className="main-content">
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
            <Route path="/statistics/performance" element={<div>Statistics Performance</div>} />
            <Route path="/committees/academic" element={<div>Academic Committees</div>} />
            <Route path="/committees/administrative" element={<div>Administrative Committees</div>} />
            
            <Route path="/forms" element={<div>Forms Page</div>} />
            <Route path="/research-areas" element={<div>Research Areas</div>} />
          
            <Route path="/deans" element={<div>Deans Page</div>} />
            <Route path="/feedback" element={<div>Feedback Page</div>} />
            
          </Routes>
        </main>
      </div>
    </Router>
    </AuthProvider>
    </>
  );
}

export default App;
