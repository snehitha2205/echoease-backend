import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import './Notifications.css'; // Optional: You can create custom styles for this component

const Notifications = () => {
  // Sample notifications with replies from the admin
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Reply from Admin', message: 'Your issue with the app performance has been resolved.', timestamp: '2024-11-05 12:00', read: false },
    { id: 2, title: 'Reply from Admin', message: 'We have added new features to the app as per your request.', timestamp: '2024-11-04 10:30', read: false },
    { id: 3, title: 'Reply from Admin', message: 'We are investigating the mobile speed issue you reported.', timestamp: '2024-11-03 09:15', read: false },
    { id: 4, title: 'Reply from Admin', message: 'Thank you for your feedback on the new design!', timestamp: '2024-11-02 16:20', read: true },
  ]);

  const handleMarkAsRead = (id) => {
    const updatedNotifications = notifications.map((notification) =>
      notification.id === id ? { ...notification, read: true } : notification
    );
    setNotifications(updatedNotifications);
  };

  const handleDeleteNotification = (id) => {
    const updatedNotifications = notifications.filter((notification) => notification.id !== id);
    setNotifications(updatedNotifications);
  };

  return (
    <div className="notifications">
      <h2>Notifications</h2>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Title</th>
            <th>Message</th>
            <th>Timestamp</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {notifications.map((notification) => (
            <tr key={notification.id} className={notification.read ? 'read' : 'unread'}>
              <td>{notification.title}</td>
              <td>{notification.message}</td>
              <td>{notification.timestamp}</td>
              <td>
                <Button 
                  variant="success" 
                  onClick={() => handleMarkAsRead(notification.id)} 
                  disabled={notification.read}
                >
                  Mark as Read
                </Button>
                <Button 
                  variant="danger" 
                  onClick={() => handleDeleteNotification(notification.id)} 
                  className="ms-2"
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Notifications;
