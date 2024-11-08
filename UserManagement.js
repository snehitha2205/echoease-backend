import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Table } from 'react-bootstrap';
import { users as userData } from './users'; // Import users from users.js

const UserManagement = () => {
  const [userList, setUserList] = useState(userData); // Initialize with data from users.js
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({ username: '', password: '', role: '' });

  // Update localStorage whenever userList changes
  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(userList));
  }, [userList]);

  // Handle adding a new user
  const handleAddUser = () => {
    if (newUser.username && newUser.password && newUser.role) {
      const updatedUserList = [...userList, newUser];
      setUserList(updatedUserList);  // Update state
      setShowModal(false);
      setNewUser({ username: '', password: '', role: '' });
    } else {
      alert('All fields are required');
    }
  };

  // Handle removing a user
  const handleRemoveUser = (username) => {
    const updatedUsers = userList.filter(user => user.username !== username);
    setUserList(updatedUsers);
  };

  return (
    <div className="user-management-container">
      
      
      <Button variant="primary" onClick={() => setShowModal(true)} className="add-user-btn">
        Add New User
      </Button>
      
      <div className="user-list mt-4">
        <Table striped bordered hover className="user-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {userList.map((user) => (
              <tr key={user.username} className="user-table-row">
                <td>{user.username}</td>
                <td>{user.role}</td>
                <td>
                  <Button variant="danger" onClick={() => handleRemoveUser(user.username)} className="remove-btn">
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Modal to Add New User */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={newUser.username}
                onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                placeholder="Enter username"
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                placeholder="Enter password"
              />
            </Form.Group>

            <Form.Group controlId="role">
              <Form.Label>Role</Form.Label>
              <Form.Control
                as="select"
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              >
                <option value="">Select Role</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)} className="modal-close-btn">
            Close
          </Button>
          <Button variant="primary" onClick={handleAddUser} className="modal-save-btn">
            Add User
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserManagement;
