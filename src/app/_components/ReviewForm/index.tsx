"use client"
import React, { useEffect, useRef, useState } from 'react';
import classes from './index.module.scss';
import { useAuth } from '../../_providers/Auth';

// Star component to handle individual stars
const Star = ({ filled, onClick}) => (
  <span
    onClick={onClick}
    style={{ 
      cursor: 'pointer',    
      color: filled ? '#FFD700' : '#ccc',
      fontSize: '34px'
    }}
  >
    ★
  </span>
);

const ReviewForm = ({ postReview, value, productId, showReviewForm }) => {
  const {user} = useAuth()
  const [name, setName] = useState('');
  const [rating, setRating] = useState(0); 
  const [review, setReview] = useState('');
  const form = useRef(null)

  useEffect(() => {
    if (form.current) {
      form.current.style.display = value ? 'block' : 'none'; // Show or hide based on value
    }
  }, [value]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    postReview({user: user.id , product: productId , rating, review });
    
    setName('');
    setRating(0);
    setReview('');
    showReviewForm(false)
  };


  const handleStarClick = (starValue) => {
    if (starValue === rating) {
      setRating(0); 
    } else {
      setRating(starValue); 
    }
  };

  return (
    <form ref={form} style={{display: "none"}}>
      <div className={classes.mainDiv}>
        <div className={classes.formDiv}>
          <label htmlFor="rating" className={classes.label}>Rating:</label>
          <div>
            {[1, 2, 3, 4, 5].map((starValue) => (
              <Star
                key={starValue}
                filled={starValue <= rating} 
                onClick={() => handleStarClick(starValue)}
              />
            ))}
          </div>
        </div>
        <div className={classes.formDiv}>
          <label className={classes.label} htmlFor="review">Review</label>
          <input 
            type="text" 
            className={classes.reviewInput} 
            value={review} 
            onChange={(e) => setReview(e.target.value)} 
          />
        </div>
      </div>
      <button onClick={handleSubmit} className={classes.reviewButton} > Post Review </button>
    </form>
  );
};

export default ReviewForm;
