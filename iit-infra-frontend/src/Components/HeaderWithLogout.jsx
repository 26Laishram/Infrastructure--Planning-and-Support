import { useAuth } from './AuthProvider'; 
import LogoutButton from "./LogoutButton"

const HeaderWithLogout = ({ logo, toggleSidebar, sidebarOpen }) => {
  const { user } = useAuth();

  return (
    <header className="top-bar" 
      style={{ display: 'flex', alignItems: 'center', gap: '20px', justifyContent: 'space-between', padding: '10px 15px'}}
    >

      {/* Mobile Menu Button */}
      <button 
        className="mobile-menu-toggle"
        onClick={toggleSidebar}
        aria-label="Toggle Menu"
      >
        {sidebarOpen ? "✖" : "☰"}
      </button>

      <img src={logo} alt="Institute Logo" />

      <h2 style={{ flexGrow: 1, textAlign: "center" }}>
        Infrastructure, Planning and Support
      </h2>

      {user && <LogoutButton />}
    </header>
  );
};

export default HeaderWithLogout;
