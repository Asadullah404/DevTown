import React, { useState, useEffect, useRef, useCallback } from 'react';
import EventBus from '../EventBus';

const NAME_TARGET = 'Muhammad Asadullah Sohail';
const TITLE_TARGET = 'AI Engineer & Full-Stack Developer';

export const InfoOverlay: React.FC = () => {
  const [nameText, setNameText] = useState('');
  const [titleText, setTitleText] = useState('');
  const [timeText, setTimeText] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(false);

  const formatCurrentTime = () => {
    return new Date()
      .toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      })
      .toLowerCase();
  };

  const [currentTime, setCurrentTime] = useState(formatCurrentTime());
  const timeRef = useRef(currentTime);
  const hasTypedRef = useRef(false);

  // Typewriter animation
  const typeText = (
    text: string,
    onChar: (textSoFar: string) => void,
    onComplete: () => void,
    speed = 35
  ) => {
    let index = 0;
    const interval = setInterval(() => {
      index++;
      onChar(text.slice(0, index));
      if (index >= text.length) {
        clearInterval(interval);
        setTimeout(onComplete, 120);
      }
    }, speed);
  };

  const startTypewriter = useCallback(() => {
    if (hasTypedRef.current) return;
    hasTypedRef.current = true;

    // 1. Type Name
    typeText(NAME_TARGET, setNameText, () => {
      // 2. Type Title
      typeText(TITLE_TARGET, setTitleText, () => {
        // 3. Type Initial Time
        const initialTime = formatCurrentTime();
        typeText(initialTime, setTimeText, () => {
          setControlsVisible(true);
        }, 30);
      });
    });
  }, []);

  useEffect(() => {
    EventBus.on('bootDone', () => {
      setVisible(true);
      setTimeout(() => {
        startTypewriter();
      }, 250);
    });

    const timer = setInterval(() => {
      const now = formatCurrentTime();
      setCurrentTime(now);
      timeRef.current = now;
      if (controlsVisible) {
        setTimeText(now);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [startTypewriter, controlsVisible]);

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const next = !isMuted;
    setIsMuted(next);
    EventBus.dispatch('muteToggle', next);
  };

  if (!visible) return null;

  return (
    <div
      id="prevent-click"
      className="fixed top-6 left-6 z-30 flex flex-col items-start select-none font-mono text-xs md:text-sm pointer-events-auto"
      style={{ fontFamily: "'Courier New', Courier, monospace" }}
    >
      {/* Row 1: Name Badge */}
      {nameText !== '' && (
        <div
          id="prevent-click"
          className="bg-black text-white px-3 py-1 mb-1 inline-flex items-center text-[13px] md:text-[14px] leading-tight tracking-normal font-normal shadow-sm"
        >
          <span>{nameText}</span>
        </div>
      )}

      {/* Row 2: Title Badge */}
      {titleText !== '' && (
        <div
          id="prevent-click"
          className="bg-black text-white px-3 py-1 mb-1 inline-flex items-center text-[13px] md:text-[14px] leading-tight tracking-normal font-normal shadow-sm"
        >
          <span>{titleText}</span>
        </div>
      )}

      {/* Row 3: Live Time and Speaker Button */}
      {timeText !== '' && (
        <div id="prevent-click" className="flex items-center gap-1">
          {/* Time Badge */}
          <div
            id="prevent-click"
            className="bg-black text-white px-3 py-1 inline-flex items-center text-[13px] md:text-[14px] leading-tight font-normal shadow-sm"
          >
            <span>{timeText}</span>
          </div>

          {/* Speaker / Mute Toggle Button */}
          {controlsVisible && (
            <button
              id="prevent-click"
              onClick={handleToggleMute}
              title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
              className="bg-black text-white px-2.5 py-1 inline-flex items-center justify-center cursor-pointer hover:opacity-80 active:opacity-50 transition-opacity border-none outline-none h-[25px] min-w-[28px]"
            >
              <img
                id="prevent-click"
                src={isMuted ? '/icons/volume_off.svg' : '/icons/volume_on.svg'}
                alt={isMuted ? 'Muted' : 'Sound On'}
                className="w-3.5 h-3 object-contain pointer-events-none"
              />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default InfoOverlay;
