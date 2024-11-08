// Feedback.js
import React, { useState } from 'react';
import { toast } from 'sonner'; // Import toast from Sonner
import './dashboard.css';
import './Feedback.css'
// import { toast } from 'react-bootstrap';
const Feedback = ({user}) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const handleRating = (rate) => setRating(rate);
  const handleHover = (rate) => setHoverRating(rate);
  const handleFeedbackChange = (e) => setFeedback(e.target.value);

  const handleSubmit = () => {
    if (rating === 0) {
      toast.error("Please select a rating before submitting."); // Error notification
      return;
    }
    console.log(`Rating: ${rating}, Feedback: ${feedback}`);
    toast.success("Thank you for your feedback!"); // Success notification
    setFeedback('');
    setRating(0);
    setHoverRating(0);
  };
  
   
  return (
    <div className="feedback-content">
      <h2>Provide Your Feedback</h2>
      <p>Rate your experience with us:</p>
      <div className="rating-stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <i
            key={star}
            className={`fas fa-star ${star <= (hoverRating || rating) ? 'star-active' : 'star-inactive'}`}
            onClick={() => handleRating(star)}
            onMouseEnter={() => handleHover(star)}
            onMouseLeave={() => setHoverRating(0)}
          />
        ))}
      </div>
      <textarea
        value={feedback}
        onChange={handleFeedbackChange}
        placeholder="Share your feedback here..."
      ></textarea>
      <button className="submit-feedback-btn" onClick={handleSubmit}>
        Submit Feedback
      </button>
    </div>
  );
};

export default Feedback;
