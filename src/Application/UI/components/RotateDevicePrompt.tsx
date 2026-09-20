import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, RotateCw, ArrowRight, X } from 'lucide-react';
import EventBus from '../EventBus';

export const RotateDevicePrompt: React.FC = () => {
  const [isPortrait, setIsPortrait] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const dismissedRef = useRef(false);

  useEffect(() => {
    const checkOrientation = () => {
      const isTouch =
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(pointer: coarse)').matches;

      // Check if viewport is in portrait (height > width)
      const portrait =
        window.innerHeight > window.innerWidth && (window.innerWidth < 960 || isTouch);

      setIsPortrait(portrait);

      // If user rotates to landscape, reset dismissed flag so it can prompt again if rotated back
      if (!portrait) {
        dismissedRef.current = false;
        setDismissed(false);
      }
    };

    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);

    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

  const handleDismiss = (e?: React.MouseEvent | React.TouchEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    dismissedRef.current = true;
    setDismissed(true);
    // Focus smoothly on the complete monitor screen
    EventBus.dispatch('setZoomLevel', 1);
  };

  if (!isPortrait || dismissed || dismissedRef.current) return null;

  return (
    <AnimatePresence>
      <motion.div
        id="prevent-click"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[999999] flex flex-col items-center justify-center p-6 bg-black/90 backdrop-blur-2xl text-white select-none text-center font-sans pointer-events-auto"
        style={{ pointerEvents: 'auto' }}
      >
        {/* Top-Right Quick Close Button */}
        <button
          id="prevent-click"
          onClick={handleDismiss}
          onTouchEnd={handleDismiss}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 text-slate-300 hover:text-white transition-colors cursor-pointer pointer-events-auto z-20"
          title="Close overlay"
          style={{ pointerEvents: 'auto' }}
        >
          <X size={20} />
        </button>

        {/* Animated Rotating Smartphone Graphic */}
        <div className="relative mb-6 flex items-center justify-center pointer-events-none">
          {/* Outer Pulsing Glow */}
          <div className="absolute w-36 h-36 rounded-full bg-cyan-500/20 blur-2xl animate-pulse" />

          {/* Rotating Device Container */}
          <motion.div
            animate={{
              rotate: [0, 0, -90, -90, 0],
              scale: [1, 1, 1.08, 1.08, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 3.5,
              ease: 'easeInOut',
            }}
            className="relative z-10 w-20 h-36 rounded-2xl border-4 border-white/90 bg-gradient-to-b from-slate-900 to-slate-950 p-2 shadow-2xl flex flex-col justify-between items-center"
          >
            {/* Phone Speaker Notch */}
            <div className="w-6 h-1.5 rounded-full bg-white/40" />

            {/* Screen Content Preview */}
            <div className="w-full flex-1 my-1.5 rounded-lg bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center">
              <RotateCw size={24} className="text-cyan-400 animate-spin" style={{ animationDuration: '4s' }} />
            </div>

            {/* Home Indicator */}
            <div className="w-8 h-1 rounded-full bg-white/40" />
          </motion.div>

          {/* Curved Arrow Orbit */}
          <div className="absolute -inset-4 pointer-events-none flex items-center justify-center">
            <div className="w-48 h-48 rounded-full border border-dashed border-cyan-400/30 animate-spin" style={{ animationDuration: '14s' }} />
          </div>
        </div>

        {/* Text Instructions */}
        <div className="max-w-sm space-y-3 mb-8 pointer-events-none">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
            <Smartphone size={14} /> Full Experience Available
          </div>

          <h2 className="text-2xl font-bold text-white tracking-tight">
            Please Rotate Your Phone
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed px-2">
            For the optimal 3D architectural workstation and complete interactive Windows 11 desktop, please turn your device to landscape mode.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 w-full max-w-xs pointer-events-auto" style={{ pointerEvents: 'auto' }}>
          <button
            id="prevent-click"
            type="button"
            onClick={handleDismiss}
            onTouchEnd={handleDismiss}
            className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 active:bg-cyan-500/40 border border-cyan-400/40 text-sm font-semibold text-cyan-200 transition-all cursor-pointer pointer-events-auto shadow-lg active:scale-98"
            style={{ pointerEvents: 'auto' }}
          >
            <span>Continue in Portrait Anyway</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default RotateDevicePrompt;
