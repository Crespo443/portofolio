import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

export default function CyberCat() {
  const [isCatVisible, setIsCatVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [catProps, setCatProps] = useState({ side: 'left', top: 50, duration: 10 });
  const [showBubble, setShowBubble] = useState(false);
  const [walkProgress, setWalkProgress] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Animation loop for walk
  useEffect(() => {
    if (!isCatVisible) return;
    
    const start = Date.now();
    let frameId: number;
    
    const step = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / (catProps.duration * 1000), 1);
      setWalkProgress(progress);
      
      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      } else {
        setIsCatVisible(false); // Done walking
      }
    };
    
    frameId = requestAnimationFrame(step);
    
    return () => cancelAnimationFrame(frameId);
  }, [isCatVisible, catProps.duration]);

  // Spawn logic
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const spawnCat = () => {
      if (isModalOpen) return;
      const side = Math.random() > 0.5 ? 'left' : 'right';
      // Keep it away from absolute top and bottom to ensure visibility
      const top = Math.floor(Math.random() * 60) + 20; 
      // 10 to 18 seconds to walk across
      const duration = Math.floor(Math.random() * 8) + 10; 
      
      setCatProps({ side, top, duration });
      setWalkProgress(0);
      setIsCatVisible(true);
      setShowBubble(false);

      // Random bubble timings
      setTimeout(() => setShowBubble(true), 1500);
      setTimeout(() => setShowBubble(false), (duration * 1000) - 2500);
    };

    const scheduleNextSpawn = () => {
      if (isModalOpen) return;
      const nextSpawnTime = Math.floor(Math.random() * 20000) + 20000; // 20s to 40s
      timeoutId = setTimeout(spawnCat, nextSpawnTime);
    };

    if (!isModalOpen && !isCatVisible) {
      scheduleNextSpawn();
    }

    return () => clearTimeout(timeoutId);
  }, [isModalOpen, isCatVisible]);

  // Audio and Video control on modal toggle
  useEffect(() => {
    const rootEl = document.getElementById('root');
    if (isModalOpen) {
      if (rootEl) {
        rootEl.style.transition = 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
        rootEl.style.transform = 'scale(0.99)';
        rootEl.style.filter = 'blur(2px) brightness(0.7)';
        rootEl.style.pointerEvents = 'none';
      }
      if (audioRef.current) {
        audioRef.current.play().catch(console.error);
      }
      if (videoRef.current) {
        videoRef.current.play().catch(console.error);
      }
    } else {
      if (rootEl) {
        rootEl.style.transform = '';
        rootEl.style.filter = '';
        rootEl.style.pointerEvents = '';
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }

    return () => {
      if (rootEl) {
        rootEl.style.transform = '';
        rootEl.style.filter = '';
        rootEl.style.pointerEvents = '';
      }
    };
  }, [isModalOpen]);

  // Handle green screen removal using Canvas
  useEffect(() => {
    if (!isModalOpen || !videoRef.current || !canvasRef.current) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    let animationFrameId: number;

    const processFrame = () => {
      if (video.paused || video.ended || !ctx) return;
      
      // Ensure canvas matches video dimensions
      if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
      }

      // Draw the current video frame to the canvas
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Process chroma key
      if (canvas.width > 0 && canvas.height > 0) {
        const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const l = frame.data.length / 4;
        
        for (let i = 0; i < l; i++) {
          const r = frame.data[i * 4 + 0];
          const g = frame.data[i * 4 + 1];
          const b = frame.data[i * 4 + 2];
          
          // Green screen threshold
          if (g > 100 && r < g - 30 && b < g - 30) {
            frame.data[i * 4 + 3] = 0; // Make transparent
          }
          // Black background threshold (common for overlay videos)
          else if (r < 30 && g < 30 && b < 30) {
            frame.data[i * 4 + 3] = 0; // Make transparent
          }
        }
        ctx.putImageData(frame, 0, 0);
      }
      
      animationFrameId = requestAnimationFrame(processFrame);
    };

    const startProcessing = () => {
      animationFrameId = requestAnimationFrame(processFrame);
    };

    video.addEventListener('play', startProcessing);
    
    return () => {
      video.removeEventListener('play', startProcessing);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isModalOpen]);

  const handleCatClick = () => {
    setIsCatVisible(false);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const isLeft = catProps.side === 'left';
  const startX = -100;
  const endX = typeof window !== 'undefined' ? window.innerWidth + 100 : 2000;
  const currentX = startX + (endX - startX) * walkProgress;
  // Bouncing effect: sine wave based on progress
  const currentY = Math.sin(walkProgress * Math.PI * 15) * 10;

  return (
    <>
      {/* Walking Cat */}
      {isCatVisible && (
        <div
          className="fixed z-[60] cursor-pointer group hover:scale-125 transition-transform duration-300 ease-out p-8 -m-8"
          style={{
            top: `${catProps.top}%`,
            [isLeft ? 'left' : 'right']: '0px',
            transform: `translate(${isLeft ? currentX : -currentX}px, ${currentY}px)`,
          }}
          onClick={handleCatClick}
        >
          {/* Cyberpunk Glitch Effect on Spawn - only for the first ~5% of the walk */}
          <div className={`relative ${walkProgress < 0.05 ? 'animate-pulse drop-shadow-[0_0_15px_rgba(0,255,255,0.8)]' : ''}`}>
            
            {/* Chat Bubble */}
            <div 
              className={`absolute -top-12 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-sm border border-cyan-500/80 text-cyan-400 px-3 py-1 rounded-full text-xs font-mono whitespace-nowrap transition-all duration-500 transform ${showBubble ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-2'} pointer-events-none`}
              style={{ boxShadow: '0 0 15px rgba(0, 255, 255, 0.3)' }}
            >
              Catch me!
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-black/80 border-b border-r border-cyan-500/80 rotate-45"></div>
            </div>

            {/* The Cat Image */}
            <div 
              className={`filter drop-shadow-[0_0_8px_rgba(255,0,255,0.6)] ${isLeft ? '' : '-scale-x-100'} transition-all`}
            >
                <img src="/cat-face.svg" alt="CyberCat" className="w-14 h-14 object-contain drop-shadow-[0_0_10px_rgba(0,255,255,0.8)]" />
            </div>
          </div>
        </div>
      )}

      {/* Theater Mode Modal */}
      {isModalOpen && typeof document !== 'undefined' && createPortal(
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-auto cursor-pointer"
          onClick={closeModal}
        >
          <style>{`
            @keyframes flash-bang {
              0% { opacity: 0.8; background-color: #0ff; }
              100% { opacity: 0; background-color: transparent; }
            }
            @keyframes extreme-pop {
              0% { transform: scale(0.1) rotate(-15deg); opacity: 0; filter: blur(20px); }
              50% { transform: scale(1.1) rotate(5deg); opacity: 1; filter: blur(0px); }
              75% { transform: scale(0.95) rotate(-2deg); }
              100% { transform: scale(1) rotate(0deg); }
            }
            @keyframes screen-shake {
              0%, 100% { transform: translate(0, 0); }
              10%, 30%, 50%, 70%, 90% { transform: translate(-10px, 5px); }
              20%, 40%, 60%, 80% { transform: translate(10px, -5px); }
            }
          `}</style>
          
          {/* Flash overlay */}
          <div 
            className="absolute inset-0 pointer-events-none mix-blend-screen z-0" 
            style={{ animation: 'flash-bang 0.6s ease-out forwards' }} 
          />
          
          {/* Screen shake wrapper */}
          <div className="absolute inset-0 pointer-events-none" style={{ animation: 'screen-shake 0.4s ease-out forwards' }} />

          <audio ref={audioRef} src="/kicaumania.m4a" onEnded={closeModal} />
          
          <div 
            className="relative w-full max-w-4xl aspect-video mx-4 flex justify-center items-center pointer-events-none z-10"
            onClick={(e) => e.stopPropagation()}
            style={{ animation: 'extreme-pop 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
          >
            <button 
              onClick={closeModal}
              className="absolute -top-4 -right-4 pointer-events-auto text-white hover:text-neon-magenta transition-all z-50 p-2 rounded-full bg-black/80 border border-neon-magenta/50 shadow-[0_0_25px_rgba(255,0,255,0.5)] hover:bg-black hover:rotate-90 hover:scale-110 duration-300"
            >
              <X size={24} />
            </button>

            {/* The hidden original video */}
            <video 
              ref={videoRef} 
              src="/cat.mp4" 
              className="absolute opacity-0 pointer-events-none w-1 h-1"
              autoPlay
              loop
              playsInline
              crossOrigin="anonymous"
              muted
            />
            {/* The canvas that renders the chroma-keyed video */}
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full object-contain filter drop-shadow-[0_0_30px_rgba(0,255,255,0.6)]"
            />
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
