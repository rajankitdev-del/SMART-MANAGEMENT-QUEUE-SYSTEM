import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, Icon, Button } from '../components/UIComponents';
import { supportApi } from '../api';

const HelpSupport = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [issueType, setIssueType] = useState('Technical Issue');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tokenId = localStorage.getItem('activeTokenId');
    
    setLoading(true);
    try {
      await supportApi.createRequest({
        tokenId: tokenId ? parseInt(tokenId) : null,
        issueType,
        message
      });
      setSubmitted(true);
      setTimeout(() => navigate('/home'), 2000);
    } catch (err) {
      console.error('Error creating support request:', err);
      alert('Failed to send request.');
    } finally {
      setLoading(false);
    }
  };

  const faqs = [
    { q: 'How to scan QR?', a: 'Locate the QR code at the desk, open the "Scan QR" screen in this app, and point your camera at it.' },
    { q: 'Where is my token?', a: 'Go to the "My Token" tab in the bottom navigation bar to view your active token.' },
    { q: 'Can I cancel my token?', a: 'Yes, you can cancel your token from the tracking screen if you no longer need the service.' },
  ];

  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-3xl font-black text-primary tracking-tight">Help & Support</h2>
        <p className="text-on-surface-variant font-bold">We are here to assist you</p>
      </header>

      {/* FAQ Section */}
      <section className="space-y-4">
        <h3 className="text-sm font-black uppercase tracking-widest text-on-surface-variant px-2">Common Questions</h3>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <details key={i} className="group bg-white/85 backdrop-blur-2xl rounded-2xl border border-white/60 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
              <summary className="list-none p-5 flex justify-between items-center cursor-pointer font-bold text-on-surface">
                {faq.q}
                <Icon name="expand_more" className="group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-5 pb-5 text-sm text-on-surface-variant font-medium leading-relaxed border-t border-white/20 pt-4">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* Support Form */}
      <Card className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center">
            <Icon name="mail" />
          </div>
          <div>
            <h4 className="font-black text-on-surface">Message Support</h4>
            <p className="text-xs text-on-surface-variant font-bold">Expected response: 5-10 mins</p>
          </div>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant px-1">Subject</label>
              <select 
                value={issueType}
                onChange={(e) => setIssueType(e.target.value)}
                className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl p-3 font-bold focus:ring-2 focus:ring-primary focus:outline-none"
              >
                <option>Technical Issue</option>
                <option>Token Problem</option>
                <option>Facility Feedback</option>
                <option>Other</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant px-1">Message</label>
              <textarea 
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl p-4 min-h-[100px] focus:ring-2 focus:ring-primary focus:outline-none font-bold"
                placeholder="How can we help?"
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Sending...' : 'Send Message'}
              <Icon name="send" />
            </Button>
          </form>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-4 text-tertiary font-black"
          >
            <Icon name="check_circle" className="mb-2 !text-3xl" />
            <p>Support ticket created!</p>
          </motion.div>
        )}
      </Card>

      <div className="flex justify-center gap-6 pt-4">
        <button className="flex flex-col items-center gap-2 group">
          <div className="w-14 h-14 bg-white/85 backdrop-blur-2xl rounded-full flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white/60 group-active:scale-90 transition-transform">
            <Icon name="call" className="text-primary" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Call Desk</span>
        </button>
        <button className="flex flex-col items-center gap-2 group">
          <div className="w-14 h-14 bg-white/85 backdrop-blur-2xl rounded-full flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white/60 group-active:scale-90 transition-transform">
            <Icon name="chat" className="text-primary" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Live Chat</span>
        </button>
      </div>
    </div>
  );
};

export default HelpSupport;
