import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, Icon, Button } from '../components/UIComponents';
import { tokenApi } from '../api';

const ConfirmService = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    const tokenId = localStorage.getItem('activeTokenId');
    if (!tokenId) {
      navigate('/home');
      return;
    }

    setLoading(true);
    try {
      await tokenApi.confirmService(tokenId);
      navigate('/feedback');
    } catch (err) {
      console.error('Error confirming service:', err);
      alert('Failed to confirm service completion.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col justify-center space-y-12 py-8">
      <div className="text-center space-y-4">
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          className="w-32 h-32 bg-primary text-white rounded-3xl flex items-center justify-center mx-auto shadow-2xl shadow-primary/40 mb-8"
        >
          <Icon name="verified" className="!text-6xl" fill />
        </motion.div>
        <h2 className="text-4xl font-black text-primary tracking-tight">Service Complete?</h2>
        <p className="text-on-surface-variant font-bold max-w-xs mx-auto">
          Please confirm if your visit is finished. This helps us serve the next citizen.
        </p>
      </div>

      <div className="space-y-4 max-w-sm mx-auto w-full">
        <Button 
          className="w-full h-16 shadow-xl"
          onClick={handleConfirm}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Yes, I\'m Done'}
          <Icon name="done_all" />
        </Button>
        <Button 
          variant="outline" 
          className="w-full h-16"
          onClick={() => navigate('/live-tracking')}
          disabled={loading}
        >
          <Icon name="close" />
          Not Yet, Take Me Back
        </Button>
      </div>

      <div className="bg-white/85 backdrop-blur-2xl p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white/60 flex gap-4 items-center max-w-sm mx-auto">
        <Icon name="volunteer_activism" className="text-primary/40" />
        <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant leading-relaxed">
          Your feedback helps us improve public services for every citizen of India.
        </p>
      </div>
    </div>
  );
};

export default ConfirmService;
