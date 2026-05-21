import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, Icon, Button } from '../components/UIComponents';

const languages = [
  { id: 'en', name: 'English', native: 'English' },
  { id: 'hi', name: 'Hindi', native: 'हिन्दी' },
  { id: 'mr', name: 'Marathi', native: 'मराठी' },
  { id: 'gu', name: 'Gujarati', native: 'ગુજરાતી' },
  { id: 'ta', name: 'Tamil', native: 'தமிழ்' },
  { id: 'bn', name: 'Bengali', native: 'বাংলা' },
];

const LanguageSelection = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(localStorage.getItem('language') || 'en');

  const handleSelect = (id) => {
    setSelected(id);
    localStorage.setItem('language', id);
    // In a real app, we would trigger a translation reload here
    setTimeout(() => navigate('/home'), 500);
  };

  return (
    <div className="space-y-8">
      <header className="text-center pt-4">
        <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Icon name="language" className="!text-3xl" />
        </div>
        <h2 className="text-3xl font-black text-primary tracking-tight">Select Language</h2>
        <p className="text-on-surface-variant font-bold mt-1">अपनी भाषा चुनें</p>
      </header>

      <div className="grid grid-cols-2 gap-4">
        {languages.map((lang) => (
          <motion.button
            key={lang.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSelect(lang.id)}
            className={`p-6 rounded-2xl flex flex-col items-center gap-2 border-2 transition-all shadow-sm ${
              selected === lang.id 
                ? 'bg-primary-container text-white border-primary shadow-[0_8px_30px_rgb(0,0,0,0.15)] scale-105 z-10' 
                : 'bg-white/85 backdrop-blur-2xl border-white/60 text-on-surface hover:bg-white shadow-[0_8px_30px_rgb(0,0,0,0.08)]'
            }`}
          >
            <span className="text-xl font-black">{lang.native}</span>
            <span className={`text-xs font-bold uppercase tracking-widest ${selected === lang.id ? 'opacity-80' : 'text-on-surface-variant'}`}>
              {lang.name}
            </span>
            {selected === lang.id && (
              <motion.div layoutId="active-check" className="mt-1">
                <Icon name="check_circle" className="text-white" fill />
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>

      <div className="pt-8 text-center">
        <p className="text-xs text-on-surface-variant font-bold uppercase tracking-widest opacity-60">
          More languages coming soon
        </p>
      </div>
    </div>
  );
};

export default LanguageSelection;
