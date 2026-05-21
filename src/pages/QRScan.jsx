import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import jsQR from 'jsqr';
import { Button, Icon, LoadingSpinner } from '../components/UIComponents';
import { tokenApi } from '../api';

const QRScan = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [scanning, setScanning] = useState(true);
  const [isManual, setIsManual] = useState(false);
  const [manualCode, setManualCode] = useState('COUNTER-1');
  
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const requestRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    if (!isManual && scanning) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => {
      stopCamera();
    };
  }, [isManual, scanning]);

  const startCamera = async () => {
    setError(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera API not supported');
      }
      
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "environment" } 
      });
      
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute("playsinline", true); // Required for iOS Safari
        videoRef.current.play();
        requestAnimationFrame(tick);
      }
    } catch (err) {
      console.error('Camera Error:', err);
      // Don't show error immediately to allow manual/upload fallback smoothly
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
    }
  };

  const tick = () => {
    if (!scanning || isManual || !videoRef.current) return;
    
    if (videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      if (canvas && video.videoWidth > 0) {
        // Use a fixed scanning resolution for performance
        canvas.width = 640;
        canvas.height = (video.videoHeight / video.videoWidth) * canvas.width;
        
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: "attemptBoth", // crucial for dark mode phone screens
        });

        if (code) {
          handleScan(code.data);
          return; // Stop ticking
        }
      }
    }
    
    // Scan ~5 times a second to prevent freezing the browser
    setTimeout(() => {
      if (scanning && !isManual) {
        requestRef.current = requestAnimationFrame(tick);
      }
    }, 200);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setError(null);
    stopCamera();
    setScanning(false); // Show loading spinner
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Downscale large images (like screenshots) to ensure jsQR doesn't fail
        const MAX_DIMENSION = 800;
        let width = img.width;
        let height = img.height;
        
        if (width > height && width > MAX_DIMENSION) {
          height *= MAX_DIMENSION / width;
          width = MAX_DIMENSION;
        } else if (height > MAX_DIMENSION) {
          width *= MAX_DIMENSION / height;
          height = MAX_DIMENSION;
        }
        
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        
        // Fill white background just in case of transparency
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);
        
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: "attemptBoth",
        });

        if (code) {
          handleTokenCreation(code.data);
        } else {
          setError('Could not read QR code. Please ensure the image is clear and the QR code is fully visible.');
          setScanning(true); // Re-enable scanning UI
        }
      };
      img.onerror = () => {
        setError('Failed to load image.');
        setScanning(true);
      }
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
    
    // Reset file input so the same file can be selected again if needed
    e.target.value = null;
  };

  const handleScan = (data) => {
    stopCamera();
    setScanning(false);
    handleTokenCreation(data);
  };

  const handleTokenCreation = async (qrValue) => {
    setError(null);
    try {
      const response = await tokenApi.create({
        qrCodeValue: qrValue,
        serviceType: 'general',
        source: 'app',
        priority: 'normal'
      });
      localStorage.setItem('activeTokenId', response.data.id);
      navigate('/token-generated');
    } catch (err) {
      console.error('API Error:', err);
      setError('Failed to reach server. Please check your connection.');
      setScanning(true);
    }
  };

  return (
    <div className="space-y-6 flex flex-col h-full max-w-lg mx-auto p-4">
      <header className="text-center py-2">
        <h2 className="text-3xl font-black text-primary tracking-tight">Check-in</h2>
        <p className="text-on-surface-variant font-bold text-sm tracking-wide">Select your check-in method</p>
      </header>

      <div className="relative aspect-square bg-neutral-900 rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white/50 flex items-center justify-center">
        {!isManual ? (
          <>
            {scanning ? (
              <div className="w-full h-full relative">
                {/* Native Video Tag guarantees NO double preview */}
                <video ref={videoRef} playsInline muted className="w-full h-full object-cover" />
                <canvas ref={canvasRef} className="hidden" />
                
                {/* Visual Scanner Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <div className="w-64 h-64 border-2 border-primary/40 rounded-3xl relative shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                    <div className="absolute -top-1 -left-1 w-12 h-12 border-t-4 border-l-4 border-primary rounded-tl-2xl" />
                    <div className="absolute -top-1 -right-1 w-12 h-12 border-t-4 border-r-4 border-primary rounded-tr-2xl" />
                    <div className="absolute -bottom-1 -left-1 w-12 h-12 border-b-4 border-l-4 border-primary rounded-bl-2xl" />
                    <div className="absolute -bottom-1 -right-1 w-12 h-12 border-b-4 border-r-4 border-primary rounded-br-2xl" />
                    <motion.div 
                      animate={{ top: ['0%', '100%', '0%'] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute left-0 w-full h-1 bg-primary/80 shadow-[0_0_15px_#0047a9]"
                    />
                  </div>
                  <p className="text-white/60 text-[10px] font-black uppercase tracking-[0.3em] mt-8 bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">Align QR within frame</p>
                </div>
              </div>
            ) : (
              <div className="absolute inset-0 bg-primary flex flex-col items-center justify-center text-white p-10 text-center">
                <LoadingSpinner />
                <p className="text-xl font-black mt-4 animate-pulse">Processing Data...</p>
              </div>
            )}
          </>
        ) : (
          <div className="absolute inset-0 bg-white/85 backdrop-blur-2xl p-10 flex flex-col items-center justify-center space-y-8">
            <Icon name="tag" className="!text-6xl text-primary opacity-20" />
            <div className="w-full space-y-4">
              <div className="text-center">
                <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Choose your counter</label>
                <select 
                  value={manualCode}
                  onChange={(e) => setManualCode(e.target.value)}
                  className="w-full p-5 mt-2 rounded-2xl bg-surface-container border-2 border-primary/10 font-black text-xl text-center focus:border-primary transition-all"
                >
                  <option value="COUNTER-1">Main Counter 1</option>
                  <option value="COUNTER-2">Inquiry Desk 2</option>
                  <option value="COUNTER-3">Priority Desk 3</option>
                  <option value="DEMO">Demo Mode</option>
                </select>
              </div>
              <Button className="w-full h-20 shadow-2xl text-xl font-black" onClick={() => handleTokenCreation(manualCode)}>
                Generate Token
              </Button>
            </div>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 bg-black/85 backdrop-blur-2xl flex flex-col items-center justify-center p-8 text-center text-white z-50">
            <div className="w-20 h-20 bg-error/20 rounded-full flex items-center justify-center mb-6">
              <Icon name="error_outline" className="!text-4xl text-error" />
            </div>
            <h3 className="text-xl font-black mb-2">Oops! Something went wrong</h3>
            <p className="font-bold mb-10 text-sm text-white/70 leading-relaxed">{error}</p>
            <div className="w-full flex flex-col gap-3">
              <Button variant="secondary" className="w-full h-14" onClick={() => { setError(null); setIsManual(true); }}>Use Manual Entry</Button>
              <button className="text-xs font-black uppercase tracking-widest opacity-40 hover:opacity-100" onClick={() => {setError(null); setScanning(true);}}>Try Again</button>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex p-1.5 bg-white/50 backdrop-blur-xl rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.05)] border border-white/60">
          <button 
            className={`flex-1 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all ${!isManual ? 'bg-white shadow-lg text-primary' : 'text-on-surface-variant opacity-40'}`}
            onClick={() => { setIsManual(false); setError(null); }}
          >
            Scanner
          </button>
          <button 
            className={`flex-1 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all ${isManual ? 'bg-white shadow-lg text-primary' : 'text-on-surface-variant opacity-40'}`}
            onClick={() => { setIsManual(true); setError(null); }}
          >
            Manual
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="flex-col h-20 bg-white/85 backdrop-blur-2xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:bg-white" onClick={() => fileInputRef.current.click()}>
            <Icon name="add_photo_alternate" className="text-primary mb-1" />
            <span className="text-[10px] font-black uppercase tracking-widest">Upload QR</span>
          </Button>
          <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept="image/*" className="hidden" />

          <Button variant="primary" className="flex-col h-20 shadow-xl" onClick={() => handleTokenCreation('QUEUE-SEVA-DEMO-COUNTER-1')}>
            <Icon name="rocket_launch" className="mb-1" />
            <span className="text-[10px] font-black uppercase tracking-widest">Demo Pass</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QRScan;
