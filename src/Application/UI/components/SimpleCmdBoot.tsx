import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EventBus from '../EventBus';

export const SimpleCmdBoot: React.FC = () => {
  const [lines, setLines] = useState<string[]>([]);
  const [isDone, setIsDone] = useState(false);
  const [visible, setVisible] = useState(true);

  const cmdLogs = [
    'ASAD_OS(R) UEFI BIOS v4.20.94 - Power-On Self Test OK',
    'CPU: AMD Ryzen 9 7950X 16-Core Processor @ 4.50GHz',
    'RAM: 64GB DDR5-6000 High-Speed Memory Channel OK',
    'GPU: NVIDIA GeForce RTX 4090 [24GB VRAM] - CUDA Initialized',
    'STORAGE: 2048GB PCIe Gen4 NVMe M.2 SSD Mounted at /dev/nvme0n1',
    'SYSTEM: Initializing Muhammad Asadullah Sohail AI Workspace...',
    '[OK] Loading PyTorch 2.3 & OpenCV GPU Vision Pipeline',
    '[OK] Mounting Windows 11 Desktop Subsystem (Asad OS)...',
    '[OK] Initializing 16:9 Studio Display & WebGL Depth Shaders...',
    '[OK] Calibrating 3D Spatial Audio & Haptic Hardware Engine...',
    '[OK] Loading Architectural Lighting, Shadow Maps & Glass Sheen...',
    '[OK] Network Interfaces Active. Cloud Services Synchronized.',
    'C:\\ASAD\\WORKSPACE> launch_workstation.exe --fullscreen --interactive',
    'System Ready. Entering 3D Workspace...',
  ];

  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < cmdLogs.length) {
        setLines((prev) => [...prev, cmdLogs[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
        // Automatically open without any button
        setTimeout(() => {
          setIsDone(true);
          EventBus.dispatch('bootDone');
          setTimeout(() => {
            setVisible(false);
            const uiElem = document.getElementById('ui');
            if (uiElem) {
              uiElem.style.pointerEvents = 'none';
            }
          }, 700);
        }, 500);
      }
    }, 220);

    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 bg-black text-emerald-400 z-50 flex flex-col justify-start p-6 md:p-12 font-mono text-xs md:text-sm select-none pointer-events-auto"
        >
          <div className="space-y-1.5 max-w-3xl">
            {lines.map((line, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="opacity-90">{line}</span>
              </div>
            ))}
            <div className="flex items-center gap-1 text-slate-400 pt-1">
              <span>_</span>
              <span className="w-2 h-4 bg-emerald-400 animate-pulse" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

