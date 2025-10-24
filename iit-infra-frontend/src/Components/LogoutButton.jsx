import { useAuth } from './AuthProvider';


function LogoutButton() {
  const { logout } = useAuth();
  

  const handleLogout = () => {
    logout();
  };

  return <button onClick={handleLogout}>Logout</button>;
}
export default LogoutButton;