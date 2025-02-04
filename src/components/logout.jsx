import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear local storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userId');

    // Clear session storage
    sessionStorage.clear();

    // Call logout endpoint
    fetch(`${API_BASE_URL}/logout`, {
      method: 'POST',
      credentials: 'include',
    }).then(() => {
      navigate('/');
    }).catch(error => {
      console.error('Logout failed:', error);
      // Navigate anyway
      navigate('/');
    });
  };

  return <button onClick={handleLogout}>Logout</button>;
}

export default LogoutButton;
