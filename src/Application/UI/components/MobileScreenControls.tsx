import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Monitor, ZoomOut } from 'lucide-react';
import EventBus from '../EventBus';

export const MobileScreenControls: React.FC = () => {
  const [currentZoom, setCurrentZoom] = useState<number>(3);
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice(
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.innerWidth < 1024
      );
    };
    checkTouch();
    window.addEventListener('resize', checkTouch);

    EventBus.on('zoomLevelChanged', (level: number) => {
      setCurrentZoom(level);
    });

    return () => {
      window.removeEventListener('resize', checkTouch);
    };
  }, []);

  if (!isTouchDevice) return null;

  return (
    <div id="prevent-click" className="fixed top-4 right-4 z-40 flex items-center gap-2 select-none">
      <AnimatePresence mode="wait">
        {currentZoom === 1 ? (
          <motion.button
            key="exit-screen"
            id="prevent-click"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={(e) => {
              e.stopPropagation();
              EventBus.dispatch('setZoomLevel', 2);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/90 text-cyan-400 border border-cyan-500/30 text-xs font-semibold shadow-lg backdrop-blur-md cursor-pointer active:scale-95 transition-transform"
          >
            <ZoomOut size={14} />
            <span>Exit Screen</span>
          </motion.button>
        ) : (
          <motion.button
            key="focus-screen"
            id="prevent-click"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={(e) => {
              e.stopPropagation();
              EventBus.dispatch('setZoomLevel', 1);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/90 text-white border border-white/20 text-xs font-semibold shadow-lg backdrop-blur-md cursor-pointer active:scale-95 transition-transform"
          >
            <Monitor size={14} className="text-cyan-400" />
            <span>Focus Screen</span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileScreenControls;

