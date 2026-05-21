import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, Icon, Button } from '../components/UIComponents';
import { feedbackApi } from '../api';

const GiveFeedback = () => {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tokenId = localStorage.getItem('activeTokenId');
    
    setLoading(true);
    try {
      await feedbackApi.submit({
        tokenId: tokenId ? parseInt(tokenId) : null,
        rating,
        comment
      });
      // Clear active token on successful service completion loop
      localStorage.removeItem('activeTokenId');
      navigate('/history');
    } catch (err) {
      console.error('Error submitting feedback:', err);
      alert('Failed to submit feedback.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <header className="text-center pt-4">
        <h2 className="text-3xl font-black text-primary tracking-tight">Your Feedback</h2>
        <p className="text-on-surface-variant font-bold">Help us serve you better</p>
      </header>

      <Card className="space-y-8 p-8">
        <div className="space-y-4">
          <p className="text-center font-black uppercase tracking-widest text-[10px] text-on-surface-variant">Rate your experience</p>
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className="transition-transform active:scale-90"
              >
                <Icon 
                  name="star" 
                  className={`!text-4xl ${rating >= star ? 'text-secondary' : 'text-surface-container-highest'}`}
                  fill={rating >= star}
                />
              </button>
            ))}
          </div>
          <p className="text-center text-sm font-bold text-secondary">
            {rating === 5 ? 'Excellent!' : rating === 4 ? 'Great' : rating === 3 ? 'Good' : rating === 2 ? 'Fair' : rating === 1 ? 'Poor' : 'Select a rating'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant px-1">Any comments?</label>
            <textarea 
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl p-4 min-h-[120px] focus:ring-2 focus:ring-primary focus:outline-none font-bold placeholder:opacity-40"
              placeholder="What did you like or what could be better?"
            />
          </div>

          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-3 px-2">
              <input type="checkbox" id="anon" className="w-5 h-5 rounded accent-primary" />
              <label htmlFor="anon" className="text-xs font-bold text-on-surface-variant">Submit anonymously</label>
            </div>

            <Button type="submit" className="w-full h-16 shadow-xl" disabled={rating === 0 || loading}>
              {loading ? 'Submitting...' : 'Submit Feedback'}
              <Icon name="send" />
            </Button>
          </div>
        </form>
      </Card>

      <div className="text-center">
        <button 
          onClick={() => {
            localStorage.removeItem('activeTokenId');
            navigate('/history');
          }}
          className="text-xs font-black text-on-surface-variant uppercase tracking-widest underline decoration-2 underline-offset-4 decoration-primary/20 hover:text-primary transition-colors"
        >
          Skip Feedback
        </button>
      </div>
    </div>
  );
};

export default GiveFeedback;
