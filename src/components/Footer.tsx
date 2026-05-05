import { useEffect, useState, useRef } from "react";
import Terminal from "lucide-react/dist/esm/icons/terminal.mjs";
import Eye from "lucide-react/dist/esm/icons/eye.mjs";

const COUNTER_NAMESPACE = "crespo-portfolio";
const COUNTER_KEY = "visitors";
const API_BASE = "https://abacus.jasoncameron.dev";

const Footer = () => {
  const [visitorCount, setVisitorCount] = useState<number | null>(null);
  const [displayCount, setDisplayCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const hasHit = useRef(false);

  useEffect(() => {
    const fetchVisitorCount = async () => {
      try {
        // Only increment once per session to avoid inflating counts
        const alreadyCounted = sessionStorage.getItem("visitor_counted");

        if (!alreadyCounted && !hasHit.current) {
          hasHit.current = true;
          // Hit endpoint: increments by 1 and returns new value
          const res = await fetch(`${API_BASE}/hit/${COUNTER_NAMESPACE}/${COUNTER_KEY}`);
          const data = await res.json();
          setVisitorCount(data.value);
          sessionStorage.setItem("visitor_counted", "true");
        } else {
          // Already counted this session, just get current value
          const res = await fetch(`${API_BASE}/get/${COUNTER_NAMESPACE}/${COUNTER_KEY}`);
          const data = await res.json();
          setVisitorCount(data.value);
        }
      } catch {
        // Silently fail — counter is non-critical
        setVisitorCount(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVisitorCount();
  }, []);

  // Animated count-up effect
  useEffect(() => {
    if (visitorCount === null) return;

    const duration = 1500; // ms
    const startTime = performance.now();
    const startVal = 0;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic for smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(startVal + (visitorCount - startVal) * eased);

      setDisplayCount(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [visitorCount]);

  const formatCount = (count: number): string => {
    return count.toString().padStart(6, "0");
  };

  return (
    <footer className="border-t border-white/10 bg-black/60 relative z-10 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Terminal className="text-neon-cyan w-5 h-5" />
          <span className="font-['Press_Start_2P'] text-sm tracking-tighter text-white">
            APR<span className="text-neon-magenta">_CRSPO</span>
          </span>
        </div>

        {/* Visitor Counter */}
        <div className="flex items-center gap-3">
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded border border-white/10 bg-white/5"
            title="Total site visitors"
          >
            <Eye className="w-3.5 h-3.5 text-neon-magenta" style={{ filter: "drop-shadow(0 0 4px rgba(255, 0, 204, 0.6))" }} />
            <div className="flex items-center gap-1.5">
              {isLoading ? (
                <span className="font-mono text-xs text-gray-500 animate-pulse">
                  ------
                </span>
              ) : visitorCount !== null ? (
                <>
                  <span
                    className="font-mono text-xs tracking-widest text-neon-cyan"
                    style={{ textShadow: "0 0 6px rgba(0, 245, 255, 0.5)" }}
                  >
                    {formatCount(displayCount)}
                  </span>
                  <span className="text-gray-500 font-mono text-[10px] uppercase">
                    visitors
                  </span>
                </>
              ) : (
                <span className="font-mono text-xs text-gray-600">
                  offline
                </span>
              )}
            </div>
            {/* Pulsing live indicator */}
            {visitorCount !== null && !isLoading && (
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-cyan"></span>
              </span>
            )}
          </div>
        </div>

        {/* Copyright + Status */}
        <div className="flex flex-col items-center md:items-end gap-1">
          <p className="text-gray-500 font-mono text-xs text-center">
            &copy; {new Date().getFullYear()} Crespo. All systems operational.
          </p>
          <div className="flex gap-4 font-mono text-xs text-gray-500">
            <span>v1.0.0</span>
            <span>//</span>
            <span className="text-neon-cyan">ONLINE</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
