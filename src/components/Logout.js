import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Remove the token from localStorage and redirect to the login page
    localStorage.removeItem('token');
    navigate('/login');
  }, [navigate]);

  return (
    <div>
      <p>Logging out...</p>
    </div>
  );
}

export default Logout;
