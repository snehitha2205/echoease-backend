import React, { useState } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import './MessagesReceived.css';

const MessagesReceived = () => {
  const messages = [
    { id: 1, name: 'John Doe', email: 'john@example.com', message: 'Great app, I love it!' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', message: 'Needs some improvements.' },
    { id: 3, name: 'Alice Williams', email: 'alice@example.com', message: 'Fantastic user experience!' },
    { id: 4, name: 'Bob Martin', email: 'bob@example.com', message: 'Could be faster on mobile.' },
  ];

  const [replyText, setReplyText] = useState('');
  const [currentMessageId, setCurrentMessageId] = useState(null);

  const handleReplyClick = (id) => {
    setCurrentMessageId(id);
    setReplyText('');
  };

  const handleReplyChange = (e) => {
    setReplyText(e.target.value);
  };

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (replyText.trim() === '') {
      alert('Please enter a reply.');
      return;
    }
    alert(`Reply to message ${currentMessageId}: ${replyText}`);
    setReplyText('');
    setCurrentMessageId(null);
  };

  const handleCloseReplyForm = () => {
    setCurrentMessageId(null); // Close the reply form
  };

  return (
    <div className="messages-received">
      <h2>Messages Received</h2>
      <hr></hr>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((message) => (
            <tr key={message.id}>
              <td>{message.name}</td>
              <td>{message.email}</td>
              <td>{message.message}</td>
              <td>
                <Button variant="primary" onClick={() => handleReplyClick(message.id)}>
                  Reply
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {currentMessageId !== null && (
        <div className="reply-form-container">
          <div className="reply-form-header">
            <h4>Reply to User</h4>
            <Button variant="link" className="close-btn" onClick={handleCloseReplyForm}>
              <span>&times;</span> {/* Close button */}
            </Button>
          </div>
          <Form onSubmit={handleReplySubmit}>
            <Form.Group controlId="replyText">
              <Form.Label>Your Reply</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={replyText}
                onChange={handleReplyChange}
                placeholder="Enter your reply here..."
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className='reply'>
              Send Reply
            </Button>
          </Form>
        </div>
      )}
    </div>
  );
};

export default MessagesReceived;
