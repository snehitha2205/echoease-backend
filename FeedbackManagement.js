import React, { useState, useEffect } from 'react';
import { Table, Button, Form, InputGroup } from 'react-bootstrap';
import { FaStar, FaRegStar } from 'react-icons/fa';  // Import the stars
import './FeedbackManagement.css';

const sampleFeedbacks = [
  { id: 1, username: 'john_doe', feedback: 'Great app, very user-friendly!', date: '2024-11-05', rating: 4 },
  { id: 2, username: 'jane_smith', feedback: 'Needs more features.', date: '2024-11-04', rating: 3 },
  { id: 3, username: 'alice_williams', feedback: 'Love the design and performance.', date: '2024-11-03', rating: 5 },
  { id: 4, username: 'bob_martin', feedback: 'Could be faster on mobile.', date: '2024-11-02', rating: 2 },
];

const FeedbackManagement = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setFeedbacks(sampleFeedbacks);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredFeedbacks = feedbacks.filter(feedback => 
    feedback.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
    feedback.feedback.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteFeedback = (id) => {
    const updatedFeedbacks = feedbacks.filter((feedback) => feedback.id !== id);
    setFeedbacks(updatedFeedbacks);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<FaStar key={i} className="star-icon" />);
      } else {
        stars.push(<FaRegStar key={i} className="star-icon" />);
      }
    }
    return stars;
  };

  return (
    <div className="feedback-management-container">
      <h2 className="section-title">Feedback Management</h2>

      <InputGroup className="mb-3">
        <Form.Control 
          placeholder="Search Feedback" 
          value={searchTerm}
          onChange={handleSearch}
        />
      </InputGroup>

      <Table striped bordered hover responsive className="feedback-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Feedback</th>
            <th>Date</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredFeedbacks.map((feedback) => (
            <tr key={feedback.id}>
              <td>{feedback.username}</td>
              <td>{feedback.feedback}</td>
              <td>{feedback.date}</td>
              <td>{renderStars(feedback.rating)}</td> {/* Display stars */}
              <td>
                <Button variant="danger" onClick={() => handleDeleteFeedback(feedback.id)}>
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

export default FeedbackManagement;
