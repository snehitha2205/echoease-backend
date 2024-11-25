import React, { useState } from 'react';
import axios from 'axios';
import './Feedback.css';

const Feedback = ({user}) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async () => {
    if (!rating || !feedback) {
      alert("Please fill out both the rating and feedback fields");
      return;
    }
  
    const username = user.username;  // For testing purposes, you can hard-code this or collect it from user input
  
    // Log the data you're sending
    console.log("Sending data:", { rating, feedback, username });
  
    try {
      await axios.post('http://localhost:3003/api/feedback', { rating, feedback, username });
      alert("Feedback submitted!");
      setFeedback('');
      setRating(0);
    } catch (error) {
      console.error("Failed to submit feedback", error);
      alert("An error occurred while submitting feedback.");
    }
  };
  
  

  return (
    <div className="feedback-container">
      <h2>Feedback</h2>
      <div className="rating">
        {[1, 2, 3, 4, 5].map(star => (
          <span key={star} onClick={() => setRating(star)}>
            {star <= rating ? '★' : '☆'}
          </span>
        ))}
      </div>
      <textarea value={feedback} onChange={e => setFeedback(e.target.value)} placeholder="Your feedback"></textarea>
      <button className="submit-button" onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Feedback;
