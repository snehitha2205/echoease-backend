import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AuthPage from './Login';
import Dashboard from './Dashboard';
import { Toaster } from 'react-sonner';
import AdminDashboard from './AdminDashboard';  // Adjust the path if necessary

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Redirect to the home page if the route does not match */}
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />

      </Routes>
    </Router>
  );
}
