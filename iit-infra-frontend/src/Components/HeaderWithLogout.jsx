import { useAuth } from './AuthProvider'; 
import LogoutButton from "./LogoutButton"
const HeaderWithLogout = ({ logo }) => {
    const { user } = useAuth();
  
    return (
      <header className="top-bar" style={{ display: 'flex', alignItems: 'center', gap: '20px', justifyContent: 'space-between'}}>
        <img src={logo} alt="Institute Logo" />
        <h2>Infrastructure, Planning and Support</h2>
        {user && <LogoutButton />}
      </header>
    );
  };
  
  export default HeaderWithLogout;