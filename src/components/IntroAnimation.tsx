import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface IntroAnimationProps {
  onComplete?: () => void;
}

/**
 * IntroAnimation Component
 * 
 * Plays a cinematic fullscreen video introduction once per visit.
 * Optimized for zero-stutter startup:
 * - Pre-buffers before revealing (smooth fade-in on 'playing' event)
 * - Idempotent playback invocation preventing React StrictMode double-play race
 * - Hardware acceleration (GPU composition layer)
 * - Page scroll locking during playback
 * - Glassmorphic cyberpunk "Skip Intro ->" button appearing after 2 seconds
 * - Terminal launch glitch & fade transition on video end
 * - Session-based single play with '?intro=true' URL override
 */
export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playTriggeredRef = useRef<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showSkip, setShowSkip] = useState<boolean>(false);
  const [isGlitching, setIsGlitching] = useState<boolean>(false);
  const [isExiting, setIsExiting] = useState<boolean>(false);
  const [terminalText, setTerminalText] = useState<string>('');

  // Lock scrolling while intro is active
  useEffect(() => {
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
    };
  }, []);

  // Show skip button after 2 seconds
  useEffect(() => {
    const skipTimer = setTimeout(() => {
      setShowSkip(true);
    }, 2000);

    return () => clearTimeout(skipTimer);
  }, []);

  // Optimized video initialization: sets strict muted attributes and initiates playback once
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Enforce muted property on DOM node to satisfy browser autoplay policies unconditionally
    video.muted = true;
    video.defaultMuted = true;

    const startPlayback = () => {
      if (playTriggeredRef.current) return;
      playTriggeredRef.current = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Playback started smoothly
          })
          .catch(() => {
            // Autoplay blocked by browser policy; allow immediate skip
            setShowSkip(true);
          });
      }
    };

    // If video has already buffered enough data
    if (video.readyState >= 3) {
      startPlayback();
    } else {
      video.addEventListener('canplay', startPlayback, { once: true });
    }

    const fallbackTimer = setTimeout(startPlayback, 400);

    return () => {
      video.removeEventListener('canplay', startPlayback);
      clearTimeout(fallbackTimer);
    };
  }, []);

  // Finish intro and notify parent
  const handleFinish = () => {
    try {
      sessionStorage.setItem('portfolio_intro_seen', 'true');
    } catch {
      // Ignore storage errors (incognito mode restrictions, etc.)
    }
    if (onComplete) {
      onComplete();
    }
  };

  // Skip intro immediately with smooth fade
  const handleSkip = () => {
    setIsExiting(true);
    setTimeout(() => {
      handleFinish();
    }, 400);
  };

  // Trigger terminal glitch transition when video ends
  const handleVideoEnded = () => {
    setIsGlitching(true);
    setTerminalText('> INITIALIZING CORE SYSTEMS...');

    setTimeout(() => {
      setTerminalText('> SYSTEM.INIT [OK] -> LAUNCHING PORTFOLIO');
    }, 300);

    setTimeout(() => {
      setIsExiting(true);
    }, 700);

    setTimeout(() => {
      handleFinish();
    }, 1200);
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          key="intro-overlay"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.02,
            filter: 'blur(6px)',
            transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
          }}
          className={`fixed inset-0 z-[99999] bg-black flex items-center justify-center overflow-hidden select-none ${
            isGlitching ? 'glitch-anim' : ''
          }`}
          style={{ cursor: 'default' }}
        >
          {/* Fullscreen Video with Hardware Acceleration & Smooth First-Frame Fade */}
          <video
            ref={videoRef}
            src={`${import.meta.env.BASE_URL}videos/portfolio-intro.mp4`}
            preload="auto"
            muted
            playsInline
            disablePictureInPicture
            controlsList="nodownload nofullscreen noremoteplayback"
            onPlaying={() => setIsPlaying(true)}
            onEnded={handleVideoEnded}
            onError={handleSkip}
            style={{
              transform: 'translate3d(0, 0, 0)',
              willChange: 'transform, opacity',
              backfaceVisibility: 'hidden',
            }}
            className={`w-full h-full object-cover transition-opacity duration-500 ease-out pointer-events-none ${
              !isPlaying
                ? 'opacity-0'
                : isGlitching
                ? 'opacity-90 contrast-125 saturate-150'
                : 'opacity-100'
            }`}
          />

          {/* Terminal Scanline overlay (subtle CRT feel) */}
          <div className="absolute inset-0 pointer-events-none terminal-scanlines opacity-40 mix-blend-overlay" />

          {/* Subtle Cyberpunk Vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 60%, rgba(0, 0, 0, 0.8) 100%)',
            }}
          />

          {/* Terminal Glitch Launch Banner */}
          {isGlitching && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-10 left-6 md:bottom-12 md:left-12 z-20 font-mono text-xs md:text-sm tracking-widest text-[#00ff66] flex items-center gap-2 drop-shadow-[0_0_8px_rgba(0,255,102,0.8)]"
            >
              <span>{terminalText}</span>
              <span className="inline-block w-2 h-4 bg-[#00ff66] animate-[terminal-cursor-blink_0.8s_infinite]" />
            </motion.div>
          )}

          {/* Skip Intro Button */}
          {showSkip && !isGlitching && (
            <motion.button
              type="button"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              onClick={handleSkip}
              className="group absolute top-6 right-6 md:top-8 md:right-8 z-30 flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs md:text-sm tracking-wider uppercase border border-[#00ff66]/40 text-[#00ff66] bg-black/60 backdrop-blur-md transition-all duration-300 hover:border-[#00ff66] hover:bg-[#00ff66]/10 hover:shadow-[0_0_20px_rgba(0,255,102,0.4)] active:scale-95 cursor-pointer"
              style={{ cursor: 'pointer' }}
            >
              <span>Skip Intro</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1 text-[#00ff66]">
                &rarr;
              </span>
            </motion.button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
