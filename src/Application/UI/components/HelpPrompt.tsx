import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MousePointerClick } from 'lucide-react';
import EventBus from '../EventBus';

export const HelpPrompt: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    EventBus.on('bootDone', () => {
      setTimeout(() => {
        setVisible(true);
      }, 1500);
    });

    const handleDismiss = () => {
      setDismissed(true);
      setVisible(false);
    };

    window.addEventListener('mousedown', handleDismiss);
    window.addEventListener('touchstart', handleDismiss, { passive: true });
    EventBus.on('enterMonitor', handleDismiss);

    return () => {
      window.removeEventListener('mousedown', handleDismiss);
      window.removeEventListener('touchstart', handleDismiss);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && !dismissed && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 15 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-30 pointer-events-none"
        >
          <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#0e1118]/85 backdrop-blur-md border border-white/10 text-slate-300 text-xs shadow-2xl font-sans text-center whitespace-nowrap">
            <MousePointerClick size={15} className="text-cyan-400 animate-bounce shrink-0" />
            <span>Click or tap monitor to explore <strong>Windows 11</strong></span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

