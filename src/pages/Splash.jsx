import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button, Icon } from '../components/UIComponents';

const Splash = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col justify-end w-full overflow-hidden bg-white">
      {/* Background Image with Scrim Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          alt="Indian citizens efficiently managing queues" 
          className="w-full h-full object-cover object-center mix-blend-multiply opacity-40 grayscale-[0.5]" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBe0IBvNbBcxnWwst0A5zxfuDEWs7iW9KGbsDd9DGhky7Mb630MMnI-yX5rghhI7YfQJEiO3beqgTacBxzfrewbhhBL-fkGQlEjJ0hDFGuMUmThHuNcoGqqx1oXVqWS6felWpu3y5YLwFx8pw7WdjxGYbLoxvHTim4vOY5Zf4Edj1COnHKleACsJwJR7bF8mT6UD0UW4ybsmlbJgWVoNKjrenXfcxI5TaghZLM7a9_lFQPbiLDGLWF7afLNtiQs9nNPtyrLHn69gw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-20 w-full px-6 pb-16 md:pb-24 max-w-4xl mx-auto md:mx-0 md:pl-20">
        {/* Branding Header */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <h1 className="font-headline font-black text-6xl md:text-8xl text-white tracking-tighter drop-shadow-2xl leading-none">
            Queue सेवा
          </h1>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="h-2 bg-secondary-container mt-4 rounded-full shadow-lg"
          />
        </motion.div>

        {/* Subtitle */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mb-12 max-w-lg"
        >
          <p className="text-white text-xl md:text-2xl font-bold leading-relaxed opacity-95 drop-shadow-md">
            Queue without standing in line
          </p>
          <p className="text-blue-200 text-lg mt-2 font-black tracking-tight drop-shadow-md">
            डिजिटल लाइन में लगें, अपना समय बचाएं।
          </p>
        </motion.div>

        {/* Primary and Secondary Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center"
        >
          <Button 
            onClick={() => navigate('/home')}
            className="h-16 px-10 text-xl shadow-2xl group bg-primary border-none text-white hover:scale-105 active:scale-95 transition-all"
          >
            Get Started
            <Icon name="arrow_forward" className="group-hover:translate-x-2 transition-transform" />
          </Button>
          
          <button 
            onClick={() => navigate('/language')}
            className="h-16 px-8 rounded-xl font-bold text-lg flex items-center justify-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all active:scale-95"
          >
            <Icon name="translate" />
            Change Language
          </button>
        </motion.div>
      </div>

      {/* Bottom Informational Bar */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="relative z-20 w-full px-6 py-6 md:px-20 flex flex-wrap gap-8 items-center text-white text-sm border-t border-white/10 bg-black/40 backdrop-blur-xl"
      >
        <div className="flex items-center gap-3">
          <Icon name="verified" className="text-secondary-container" fill />
          <span className="font-bold tracking-tight">Government Authorized</span>
        </div>
        <div className="flex items-center gap-3">
          <Icon name="speed" className="text-secondary-container" fill />
          <span className="font-bold tracking-tight">Wait-time reduction: 70%</span>
        </div>
        <div className="ml-auto hidden md:block opacity-50 text-[10px] uppercase font-black tracking-[0.3em]">
          A Digital India Initiative
        </div>
      </motion.div>

      {/* Side Decoration */}
      <div className="fixed left-0 top-0 bottom-0 w-1 bg-secondary-container/30 z-30 hidden md:block" />
    </div>
  );
};

export default Splash;
