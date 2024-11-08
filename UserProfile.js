// UserProfile.js
import React from 'react';
import Avatar from 'react-avatar';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const UserProfile = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any stored session or tokens (if applicable)
    // localStorage.removeItem('authToken'); // Example: Clear auth token from localStorage

    // Navigate to the login page
    navigate('/login');
  };
  if (!user) {
    return <div>Loading...</div>; // Handle case where user data is not yet available
  }

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      <Avatar name={user.username} size="100" round={true} />
      <p><strong>UserName: </strong> {user.username}</p>
      <p><strong>Role: </strong> {user.role}</p>
      <p><strong>Password: {user.password}</strong></p>
      
      <Button variant="danger" onClick={handleLogout}>
        Log Out
      </Button>
    </div>
  );
};

export default UserProfile;
