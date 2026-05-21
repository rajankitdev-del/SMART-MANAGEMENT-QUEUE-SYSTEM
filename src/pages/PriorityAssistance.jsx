import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, Icon, Button } from '../components/UIComponents';
import { tokenApi } from '../api';

const PriorityAssistance = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tokenId = localStorage.getItem('activeTokenId');
    if (!tokenId) return;

    setLoading(true);
    try {
      await tokenApi.updatePriority(tokenId, 'high');
      setSubmitted(true);
      setTimeout(() => navigate('/live-tracking'), 2000);
    } catch (err) {
      console.error('Error updating priority:', err);
      alert('Failed to update priority. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { id: 'elderly', label: 'Senior Citizen', icon: 'elderly' },
    { id: 'disabled', label: 'Disability', icon: 'accessible' },
    { id: 'pregnant', label: 'Expectant Mother', icon: 'pregnant_woman' },
    { id: 'emergency', label: 'Emergency', icon: 'emergency' },
  ];

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-3xl font-black text-primary tracking-tight">Priority Assistance</h2>
        <p className="text-on-surface-variant font-bold">Request help for special needs</p>
      </header>

      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-2 gap-4">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setReason(cat.id)}
                    className={`p-6 rounded-2xl flex flex-col items-center gap-3 border-2 transition-all shadow-sm ${
                      reason === cat.id 
                        ? 'bg-secondary-container text-on-secondary-container border-secondary' 
                        : 'bg-white border-transparent text-on-surface hover:border-secondary/20'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      reason === cat.id ? 'bg-white/20' : 'bg-surface-container'
                    }`}>
                      <Icon name={cat.icon} className="!text-3xl" />
                    </div>
                    <span className="text-sm font-black text-center">{cat.label}</span>
                  </button>
                ))}
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant px-2">Additional Details (Optional)</label>
                <textarea 
                  className="w-full bg-white/80 backdrop-blur-sm border border-outline-variant/30 rounded-2xl p-4 min-h-[120px] focus:ring-2 focus:ring-primary focus:outline-none font-bold placeholder:opacity-50"
                  placeholder="Tell us how we can help you..."
                />
              </div>

              <div className="bg-orange-50 p-4 rounded-2xl border border-orange-200 flex gap-4 items-start">
                <Icon name="warning" className="text-secondary" />
                <p className="text-xs font-bold text-on-secondary-container leading-tight">
                  False priority requests may lead to token cancellation. Please use this service only if you genuinely need assistance.
                </p>
              </div>

              <Button type="submit" className="w-full h-16 shadow-xl" disabled={!reason || loading}>
                {loading ? 'Processing...' : 'Request Assistance'}
                <Icon name="send" />
              </Button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12 space-y-6"
          >
            <div className="w-24 h-24 bg-tertiary text-white rounded-full flex items-center justify-center mx-auto shadow-2xl">
              <Icon name="check" className="!text-5xl" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-on-surface">Request Sent</h3>
              <p className="text-on-surface-variant font-bold max-w-xs mx-auto">
                A staff member has been notified. They will approach you shortly or call you to a priority counter.
              </p>
            </div>
            <div className="flex justify-center gap-2">
              <div className="w-2 h-2 bg-tertiary rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-tertiary rounded-full animate-bounce delay-100" />
              <div className="w-2 h-2 bg-tertiary rounded-full animate-bounce delay-200" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PriorityAssistance;
