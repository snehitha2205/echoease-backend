import React, { useState, useEffect } from 'react';
import { Button, Offcanvas } from 'react-bootstrap';
import UserProfile from './UserProfile';
import Feedback from './Feedback';
import ApplianceCard from './ApplianceCard';
import RecentActivity from './recentActivity';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useLocation and useNavigate
import './dashboard.css';
import './recentActivity.css';
import ContactContent from './ContactContent';
import light from './light.webp';
import TV from './tv.jpeg';
import oven from './oven.webp';
import Fan from './fan.webp';
import PowerConsumption from './PowerConsumption';
import Notifications from './Notifications';
const Dashboard = () => {
  const location = useLocation(); // Correctly use useLocation to access location state
  const navigate = useNavigate(); // Correctly use useNavigate for navigation
  const [show, setShow] = useState(false);
  const [activeSection, setActiveSection] = useState('Dashboard');
  const [user, setUser] = useState(location?.state?.user || null);

  // Effect for handling user login state
  useEffect(() => {
    if (!user) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser)); // Load from localStorage
      } else {
        navigate('/login'); // Redirect to login if no user found
      }
    }
  }, [user, navigate]);

  const [appliances, setAppliances] = useState([
    { id: 1, name: 'Living Room Light', status: true, image: light, activeTime: 0 },
    { id: 2, name: 'Living Room TV', status: false, image: TV, activeTime: 0 },
    { id: 3, name: 'Oven', status: true, image: oven, activeTime: 0 },
    { id: 4, name: 'Bedroom Fan', status: false, image: Fan, activeTime: 0 },
  ]);

  const [recentActivity, setRecentActivity] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const toggleAppliance = (id) => {
    setAppliances((prev) => {
      return prev.map((appliance) => {
        if (appliance.id === id) {
          const newStatus = !appliance.status;
          return {
            ...appliance,
            status: newStatus,
            activeTime: newStatus ? 1 : 0, // Reset active time when turned off
          };
        }
        return appliance;
      });
    });
  };

  const handleNavLinkClick = (e, section) => {
    e.preventDefault(); // Prevent default anchor behavior
    setActiveSection(section);
    handleClose(); // Close the sidebar when a link is clicked
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setAppliances((prev) =>
        prev.map((appliance) => {
          if (appliance.status) {
            return { ...appliance, activeTime: appliance.activeTime + 1 };
          }
          return appliance;
        })
      );
    }, 1000);

    return () => clearInterval(interval); // Clean up interval on unmount
  }, []);

  useEffect(() => {
    const newRecentActivity = appliances
      .filter((appliance) => appliance.status)
      .map((appliance) => ({
        name: appliance.name,
        duration: appliance.activeTime,
      }));

    setRecentActivity(newRecentActivity);
  }, [appliances]);

  return (
    <div className="d-flex parent">
      <div className="d-none d-lg-block sidebar">
        <nav className="flex-column">
          <a href="#" className="nav-link" onClick={(e) => handleNavLinkClick(e, 'Dashboard')}>
            <i className="fas fa-tachometer-alt"></i> Dashboard
          </a>
          <a href="#" className="nav-link" onClick={(e) => handleNavLinkClick(e, 'Power Consumption')}>
            <i className="fas fa-bolt"></i> Power Consumption
          </a>
          <a href="#" className="nav-link" onClick={(e) => handleNavLinkClick(e, 'User Profile')}>
            <i className="fas fa-user"></i> User Profile
          </a>
          <a href="#" className="nav-link" onClick={(e) => handleNavLinkClick(e, 'Feedback')}>
            <i className="fas fa-comment-dots"></i> Feedback
          </a>
          <a href="#" className="nav-link" onClick={(e) => handleNavLinkClick(e, 'Contact')}>
            <i className="fas fa-envelope"></i> Contact
          </a>
          <a href="#" className="nav-link" onClick={(e) => handleNavLinkClick(e, 'Recent Activity')}>
            <i className="fas fa-history"></i> Recent Activity
          </a>
          <a href="#" className="nav-link" onClick={(e) => handleNavLinkClick(e, 'Notifications')}>
            <i className="fas fa-bell"></i> Notifications
          </a>

        </nav>
      </div>

      <div className="d-lg-none mb-6">
        <button className="toggle-button" onClick={handleShow}>
          <i className="fas fa-bars fa-lg"></i> {/* Hamburger icon */}
        </button>
      </div>

      <Offcanvas show={show} onHide={handleClose} className="bg-light">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Sidebar</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <nav className="flex-column">
            <a href="#" className="nav-link" onClick={(e) => handleNavLinkClick(e, 'Dashboard')} >
              <i className="fas fa-tachometer-alt"></i> Dashboard
            </a>
            <a href="#" className="nav-link" onClick={(e) => handleNavLinkClick(e, 'Power Consumption')}>
              <i className="fas fa-bolt"></i> Power Consumption
            </a>
            <a href="#" className="nav-link" onClick={(e) => handleNavLinkClick(e, 'User Profile')}>
              <i className="fas fa-user"></i> User Profile
            </a>
            <a href="#" className="nav-link" onClick={(e) => handleNavLinkClick(e, 'Feedback')}>
              <i className="fas fa-comment-dots"></i> Feedback
            </a>
            <a href="#" className="nav-link" onClick={(e) => handleNavLinkClick(e, 'Contact')}>
              <i className="fas fa-envelope"></i> Contact
            </a>
            <a href="#" className="nav-link" onClick={(e) => handleNavLinkClick(e, 'Recent Activity')}>
              <i className="fas fa-history"></i> Recent Activity
            </a>
            <a href="#" className="nav-link" onClick={(e) => handleNavLinkClick(e, 'Notifications')}>
              <i className="fas fa-bell"></i> Notifications
            </a>

          </nav>
        </Offcanvas.Body>
      </Offcanvas>

      <div className="content">
      {activeSection === 'Dashboard' && (
  <div className="row">
    {appliances.map((appliance) => (
      <div key={appliance.id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
        <ApplianceCard appliance={appliance} onToggle={toggleAppliance} />
      </div>
    ))}
  </div>
)}

        {activeSection === 'User Profile' && <UserProfile user={user} />}
        {activeSection === 'Feedback' && <Feedback user={user}/>}
        {activeSection === 'Power Consumption' && <PowerConsumption appliances={appliances} />}
        {activeSection === 'Recent Activity' && <RecentActivity activities={recentActivity} />}
        {activeSection === 'Contact' && <ContactContent user={user}/>}
        {activeSection === 'Notifications' && <Notifications user={user}/>} 
      </div>
    </div>
  );
};

export default Dashboard;