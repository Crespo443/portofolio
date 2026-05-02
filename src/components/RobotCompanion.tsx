import { useState, useEffect, useCallback, useRef, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Expression =
  | "neutral"
  | "happy"
  | "surprised"
  | "dizzy"
  | "love"
  | "excited"
  | "hopeful";

const getTimeGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 6) return "Still coding at night? 🌙";
  if (hour < 12) return "Good morning! Welcome ☀️";
  if (hour < 17) return "Good afternoon! 👋";
  if (hour < 21) return "Good evening! Welcome ✨";
  return "Late night visitor! 🦉";
};

const SECTION_MESSAGES: Record<string, string[]> = {
  home: [
    getTimeGreeting(),
    "Hey! This is my space 👋",
    "Scroll down to explore!",
  ],
  about: [
    "Want to know more about me?",
    "Here's my story!",
    "That's me right there 😄",
  ],
  experience: [
    "Here's where I've worked!",
    "Check out my journey!",
    "Level up! 🎮",
  ],
  projects: [
    "Check out what I've built!",
    "Cool stuff ahead!",
    "My best work 🔥",
  ],
  contact: [
    "Let's work together!",
    "Say hi! Don't be shy 💬",
    "Drop me a message!",
  ],
};

interface TrailLine {
  id: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

interface DustParticle {
  id: number;
  x: number;
  y: number;
  color: string;
  angle: number;
  distance: number;
}

const RobotSVG = memo(
  ({
    expression,
    isBlinking,
    showMessage,
  }: {
    expression: Expression;
    isBlinking: boolean;
    showMessage: boolean;
  }) => {
    return (
      <svg
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Outline */}
        <path d="M4 1h8v2h2v8h-2v2H4v-2H2V3h2V1z" fill="#fff" />
        {/* Base head - blush when love */}
        <path
          d="M4 2h8v2h2v8h-2v2H4v-2H2V4h2V2z"
          fill={expression === "love" ? "#fca5d0" : "#fbcfe8"}
        />
        {/* Hair */}
        <path d="M4 2h8v2h2v2H2V4h2V2z" fill="#7e22ce" />

        {/* ─── EYES ─── */}
        {expression === "dizzy" ? (
          <>
            <line
              x1="5"
              y1="7"
              x2="7"
              y2="9"
              stroke="#4c1d95"
              strokeWidth="0.6"
            />
            <line
              x1="7"
              y1="7"
              x2="5"
              y2="9"
              stroke="#4c1d95"
              strokeWidth="0.6"
            />
            <line
              x1="9"
              y1="7"
              x2="11"
              y2="9"
              stroke="#4c1d95"
              strokeWidth="0.6"
            />
            <line
              x1="11"
              y1="7"
              x2="9"
              y2="9"
              stroke="#4c1d95"
              strokeWidth="0.6"
            />
          </>
        ) : expression === "surprised" ? (
          <>
            <rect x="4.5" y="6.5" width="3" height="3" fill="#4c1d95" />
            <rect x="8.5" y="6.5" width="3" height="3" fill="#4c1d95" />
            <rect
              x="5.5"
              y="7"
              width="1"
              height="1"
              fill="#fff"
              opacity="0.9"
            />
            <rect
              x="9.5"
              y="7"
              width="1"
              height="1"
              fill="#fff"
              opacity="0.9"
            />
          </>
        ) : expression === "love" ? (
          <>
            <path
              d="M5 7.5 L5.5 7 L6 7.5 L6.5 7 L7 7.5 L6 9 Z"
              fill="#ff00cc"
            />
            <path
              d="M9 7.5 L9.5 7 L10 7.5 L10.5 7 L11 7.5 L10 9 Z"
              fill="#ff00cc"
            />
          </>
        ) : expression === "hopeful" ? (
          <>
            <rect x="4.5" y="6.5" width="3" height="3" fill="#4c1d95" />
            <rect x="8.5" y="6.5" width="3" height="3" fill="#4c1d95" />
            <rect
              x="5"
              y="7"
              width="1.2"
              height="1.2"
              fill="#fff"
              opacity="0.9"
            />
            <rect
              x="9"
              y="7"
              width="1.2"
              height="1.2"
              fill="#fff"
              opacity="0.9"
            />
            <rect
              x="6.2"
              y="7.8"
              width="0.5"
              height="0.5"
              fill="#fff"
              opacity="0.6"
            />
            <rect
              x="10.2"
              y="7.8"
              width="0.5"
              height="0.5"
              fill="#fff"
              opacity="0.6"
            />
          </>
        ) : isBlinking ? (
          <>
            <rect x="5" y="7.5" width="2" height="1" fill="#4c1d95" />
            <rect x="9" y="7.5" width="2" height="1" fill="#4c1d95" />
          </>
        ) : (
          <>
            <rect
              x="5"
              y="7"
              width="2"
              height="2"
              fill="#4c1d95"
              style={{
                transform: "translate(var(--eye-x, 0), var(--eye-y, 0))",
              }}
            />
            <rect
              x="9"
              y="7"
              width="2"
              height="2"
              fill="#4c1d95"
              style={{
                transform: "translate(var(--eye-x, 0), var(--eye-y, 0))",
              }}
            />
            <rect
              x="5.5"
              y="7.2"
              width="0.6"
              height="0.6"
              fill="#fff"
              opacity="0.8"
              style={{
                transform:
                  "translate(calc(var(--eye-x, 0) * 0.5), calc(var(--eye-y, 0) * 0.5))",
              }}
            />
            <rect
              x="9.5"
              y="7.2"
              width="0.6"
              height="0.6"
              fill="#fff"
              opacity="0.8"
              style={{
                transform:
                  "translate(calc(var(--eye-x, 0) * 0.5), calc(var(--eye-y, 0) * 0.5))",
              }}
            />
          </>
        )}

        {/* ─── MOUTH ─── */}
        {expression === "surprised" ? (
          <circle cx="8" cy="12" r="1" fill="#d946ef" />
        ) : expression === "dizzy" ? (
          <path
            d="M6 11.5 Q8 13 10 11.5"
            stroke="#d946ef"
            strokeWidth="0.6"
            fill="none"
          />
        ) : expression === "hopeful" || expression === "love" || showMessage ? (
          <>
            <rect x="6" y="11" width="1" height="1" fill="#d946ef" />
            <rect x="7" y="12" width="2" height="1" fill="#d946ef" />
            <rect x="9" y="11" width="1" height="1" fill="#d946ef" />
          </>
        ) : (
          <rect x="7" y="11" width="2" height="1" fill="#d946ef" />
        )}

        {/* Blush marks for love */}
        {expression === "love" && (
          <>
            <rect
              x="3"
              y="9"
              width="1"
              height="1"
              fill="#ff00cc"
              opacity="0.4"
            />
            <rect
              x="12"
              y="9"
              width="1"
              height="1"
              fill="#ff00cc"
              opacity="0.4"
            />
          </>
        )}
      </svg>
    );
  },
);

const RobotCompanion = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
  const [isJumping, setIsJumping] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");
  const [coords, setCoords] = useState({ x: -100, y: -100 });
  const [trails, setTrails] = useState<TrailLine[]>([]);
  const [particles, setParticles] = useState<DustParticle[]>([]);
  const [isBlinking, setIsBlinking] = useState(false);
  const [idleTilt, setIdleTilt] = useState(0);
  const [expression, setExpression] = useState<Expression>("neutral");
  const [reactionMsg, setReactionMsg] = useState("");
  const [showSurpriseBubble, setShowSurpriseBubble] = useState(false);
  const [showCoffeeCard, setShowCoffeeCard] = useState(false);

  const prevCoordsRef = useRef({ x: -100, y: -100 });
  const trailIdRef = useRef(0);
  const particleIdRef = useRef(0);
  const robotRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const expressionTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  const setTempExpression = useCallback(
    (expr: Expression, msg: string, duration = 2000) => {
      clearTimeout(expressionTimerRef.current);
      setExpression(expr);
      setReactionMsg(msg);
      expressionTimerRef.current = setTimeout(() => {
        setExpression("neutral");
        setReactionMsg("");
      }, duration);
    },
    [],
  );

  // ─── Click Detection ───
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!robotRef.current || !isVisible) return;
      const rect = robotRef.current.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      if (Math.sqrt(dx * dx + dy * dy) < 80) {
        const msgs = [
          "You clicked me! 💜",
          "Hehe that tickles! 😆",
          "I like you too! 💖",
        ];
        setTempExpression(
          "love",
          msgs[Math.floor(Math.random() * msgs.length)],
          2500,
        );
      }
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [setTempExpression, isVisible]);

  // ─── Scroll Detection ───
  useEffect(() => {
    if (!isVisible) return;
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const speed = Math.abs(window.scrollY - lastScrollY.current);
          lastScrollY.current = window.scrollY;
          if (speed > 120 && expression !== "dizzy") {
            setTempExpression("dizzy", "Woaaah slow down! 😵", 2000);
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [expression, setTempExpression, isVisible]);

  // ─── Idle Surprise ───
  useEffect(() => {
    if (!isVisible) return;
    const resetIdle = () => {
      if (showSurpriseBubble) return;
      clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => {
        if (!isJumping && !showCoffeeCard) {
          setShowSurpriseBubble(true);
        }
      }, 15000);
    };
    window.addEventListener("scroll", resetIdle, { passive: true });
    window.addEventListener("mousemove", resetIdle, { passive: true });
    resetIdle();
    return () => {
      window.removeEventListener("scroll", resetIdle);
      window.removeEventListener("mousemove", resetIdle);
      clearTimeout(idleTimerRef.current);
    };
  }, [isJumping, showCoffeeCard, showSurpriseBubble, isVisible]);

  const handleSurpriseClick = () => {
    setShowSurpriseBubble(false);
    setShowCoffeeCard(true);
    setTempExpression("hopeful", "", 60000);
  };

  // ─── Eye Tracking (CSS Vars) ───
  useEffect(() => {
    if (!isVisible) return;
    let ticking = false;
    const handleMouseMove = (e: MouseEvent) => {
      if (!robotRef.current || isJumping || expression !== "neutral") return;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          const rect = robotRef.current?.getBoundingClientRect();
          if (!rect) return;

          const robotCenterX = rect.left + rect.width / 2;
          const robotCenterY = rect.top + rect.height / 2;
          const dx = e.clientX - robotCenterX;
          const dy = e.clientY - robotCenterY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          const maxOffset = 0.8;
          const factor = Math.min(distance / 300, 1);
          const ex = (dx / (distance || 1)) * maxOffset * factor;
          const ey = (dy / (distance || 1)) * maxOffset * factor;

          robotRef.current?.style.setProperty("--eye-x", `${ex}px`);
          robotRef.current?.style.setProperty("--eye-y", `${ey}px`);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isJumping, expression, isVisible]);

  // ─── Random Blinking ───
  useEffect(() => {
    if (!isVisible) return;
    const scheduleBlink = () => {
      const delay = 2000 + Math.random() * 4000;
      return setTimeout(() => {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 150);
        blinkTimer = scheduleBlink();
      }, delay);
    };
    let blinkTimer = scheduleBlink();
    return () => clearTimeout(blinkTimer);
  }, [isVisible]);

  // ─── Idle Fidget ───
  useEffect(() => {
    if (!isVisible) return;
    const scheduleFidget = () => {
      const delay = 4000 + Math.random() * 6000;
      return setTimeout(() => {
        if (!isJumping) {
          const tilt = (Math.random() - 0.5) * 12;
          setIdleTilt(tilt);
          setTimeout(() => setIdleTilt(0), 800 + Math.random() * 600);
        }
        fidgetTimer = scheduleFidget();
      }, delay);
    };
    let fidgetTimer = scheduleFidget();
    return () => clearTimeout(fidgetTimer);
  }, [isJumping, isVisible]);

  const updateCoordinates = useCallback((sectionId: string) => {
    const el = document.querySelector(`[data-robot-target="${sectionId}"]`);
    if (!el) return;

    const rect = el.getBoundingClientRect();
    // Adjusted for 48px width (w-12) instead of 64px (w-16)
    const targetX = rect.right + window.scrollX - 48 - 10;
    const targetY = rect.top + window.scrollY - 48;

    const prev = prevCoordsRef.current;
    if (prev.x !== -100 && (prev.x !== targetX || prev.y !== targetY)) {
      const newTrailId = trailIdRef.current++;
      const centerOffset = 24; // Half of 48px
      setTrails((t) => [
        ...t,
        {
          id: newTrailId,
          x1: prev.x + centerOffset,
          y1: prev.y + centerOffset,
          x2: targetX + centerOffset,
          y2: targetY + centerOffset,
        },
      ]);

      setTimeout(() => {
        setTrails((t) => t.filter((trail) => trail.id !== newTrailId));
      }, 1200);
    }

    prevCoordsRef.current = { x: targetX, y: targetY };
    setCoords({ x: targetX, y: targetY });
  }, []);

  // ─── Landing Dust ───
  const spawnDust = useCallback((x: number, y: number) => {
    const colors = ["#00f5ff", "#ff00cc", "#ffd500", "#7e22ce", "#ffffff"];
    const newParticles: DustParticle[] = [];
    for (let i = 0; i < 8; i++) {
      newParticles.push({
        id: particleIdRef.current++,
        x: x + 24, // Centered for 48px
        y: y + 44, // Adjusted for 48px height
        color: colors[Math.floor(Math.random() * colors.length)],
        angle: Math.PI / 6 + (Math.random() * Math.PI * 2) / 3,
        distance: 15 + Math.random() * 30,
      });
    }
    setParticles((p) => [...p, ...newParticles]);
    setTimeout(() => {
      setParticles((p) =>
        p.filter((pp) => !newParticles.find((np) => np.id === pp.id)),
      );
    }, 600);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const targets = document.querySelectorAll("[data-robot-target]");
      let closestId = "home";
      let minDistance = Infinity;

      targets.forEach((target) => {
        const rect = target.getBoundingClientRect();
        const distance = Math.abs(
          rect.top + rect.height / 2 - window.innerHeight / 2,
        );
        if (distance < minDistance) {
          minDistance = distance;
          const id = target.getAttribute("data-robot-target");
          if (id) closestId = id;
        }
      });

      setActiveSection((prev) => {
        if (prev !== closestId) {
          setIsJumping(true);
          setShowMessage(false);
          const msgs = SECTION_MESSAGES[closestId] || ["..."];
          setCurrentMessage(msgs[Math.floor(Math.random() * msgs.length)]);
          updateCoordinates(closestId);
          return closestId;
        }
        return prev;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    setTimeout(handleScroll, 200);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [updateCoordinates]);

  useEffect(() => {
    const handleResize = () => updateCoordinates(activeSection);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeSection, updateCoordinates]);

  useEffect(() => {
    if (isJumping && isVisible) {
      const timer = setTimeout(() => {
        setIsJumping(false);
        setShowMessage(true);
        spawnDust(coords.x, coords.y);
        setTimeout(() => setShowMessage(false), 4000);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isJumping, coords.x, coords.y, spawnDust, isVisible]);

  if (coords.x === -100) return null;

  return (
    <>
      <div className="fixed bottom-6 right-6 z-101 pointer-events-auto">
        <button
          onClick={() => setIsVisible(!isVisible)}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-[0_0_15px_rgba(126,34,206,0.4)] border-2 ${
            isVisible
              ? "bg-[#7e22ce] border-[#581c87] text-white rotate-0"
              : "bg-[#1a0a2e] border-[#7e22ce] text-neon-magenta rotate-180"
          } hover:scale-110 active:scale-95 group`}
          title={isVisible ? "Hide Assistant" : "Show Assistant"}
        >
          {isVisible ? (
            <svg
              viewBox="0 0 24 24"
              className="w-6 h-6 fill-current"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
            </svg>
          ) : (
            <div className="w-6 h-6">
              <RobotSVG
                expression="happy"
                isBlinking={false}
                showMessage={false}
              />
            </div>
          )}
        </button>
      </div>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="contents"
          >
            <svg
              className="absolute top-0 left-0 w-full pointer-events-none z-99"
              style={{ height: document.documentElement.scrollHeight }}
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient
                  id="trail-gradient-cyan"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#00f5ff" />
                  <stop offset="100%" stopColor="#ff00cc" />
                </linearGradient>
                <filter id="trail-glow">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <AnimatePresence>
                {trails.map((trail) => (
                  <motion.g key={trail.id}>
                    <motion.line
                      x1={trail.x1}
                      y1={trail.y1}
                      x2={trail.x2}
                      y2={trail.y2}
                      stroke="url(#trail-gradient-cyan)"
                      strokeWidth="4"
                      strokeLinecap="round"
                      filter="url(#trail-glow)"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: [0, 0.9, 0.9, 0] }}
                      exit={{ opacity: 0 }}
                      transition={{
                        pathLength: { duration: 0.5, ease: "easeOut" },
                        opacity: { duration: 1.2, times: [0, 0.2, 0.6, 1] },
                      }}
                    />
                    <motion.line
                      x1={trail.x1}
                      y1={trail.y1}
                      x2={trail.x2}
                      y2={trail.y2}
                      stroke="#ffffff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 1, 0.8, 0] }}
                      exit={{ opacity: 0 }}
                      transition={{
                        opacity: { duration: 1.2, times: [0, 0.2, 0.5, 1] },
                      }}
                    />
                  </motion.g>
                ))}
              </AnimatePresence>
            </svg>

            <AnimatePresence>
              {particles.map((p) => (
                <motion.div
                  key={p.id}
                  className="absolute pointer-events-none z-101"
                  style={{
                    left: p.x,
                    top: p.y,
                    width: 4,
                    height: 4,
                    backgroundColor: p.color,
                    boxShadow: `0 0 6px ${p.color}`,
                  }}
                  initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                  animate={{
                    opacity: 0,
                    x: Math.cos(p.angle) * p.distance,
                    y: -Math.abs(Math.sin(p.angle) * p.distance),
                    scale: 0,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              ))}
            </AnimatePresence>

            <motion.div
              ref={robotRef}
              className="absolute top-0 left-0 pointer-events-none z-40 w-12 h-12"
              initial={false}
              animate={{ x: coords.x, y: coords.y }}
              transition={{ type: "spring", stiffness: 60, damping: 15, mass: 1 }}
              aria-hidden="true"
            >
              <AnimatePresence mode="wait">
                {(() => {
                  if (showSurpriseBubble && !isJumping && !showCoffeeCard) {
                    return (
                      <motion.div
                        key="surprise-bubble"
                        initial={{ opacity: 0, y: 10, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.8 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        className="absolute bottom-[calc(100%+12px)] left-1/2 -translate-x-1/2 bg-[#7e22ce] border-2 border-[#581c87] p-2 text-white font-mono text-[10px] font-bold shadow-[3px_3px_0_rgba(0,0,0,1)] w-36 text-center origin-bottom cursor-pointer pointer-events-auto hover:bg-[#6b21a8] transition-colors z-30"
                        onClick={handleSurpriseClick}
                      >
                        Hey! I have a surprise! 🎁
                        <div className="text-[9px] mt-1 text-[#d8b4fe] font-normal">
                          Click me!
                        </div>
                        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#7e22ce] border-r-2 border-b-2 border-[#581c87] transform rotate-45"></div>
                      </motion.div>
                    );
                  }
                  const bubbleText =
                    reactionMsg || (showMessage && !isJumping ? currentMessage : "");
                  if (!bubbleText) return null;
                  return (
                    <motion.div
                      key={bubbleText}
                      initial={{ opacity: 0, y: 10, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.8 }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                      className="absolute bottom-[calc(100%+12px)] left-1/2 -translate-x-1/2 bg-[#7e22ce] border-2 border-[#581c87] p-2 text-white font-mono text-[10px] font-bold shadow-[3px_3px_0_rgba(0,0,0,1)] w-max max-w-36 text-center origin-bottom z-30 leading-relaxed wrap-break-word"
                    >
                      {bubbleText}
                      <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#7e22ce] border-r-2 border-b-2 border-[#581c87] transform rotate-45"></div>
                    </motion.div>
                  );
                })()}
              </AnimatePresence>

              <motion.div
                animate={{
                  y: isJumping ? [0, -150, 0] : [0, -4, 0],
                  scaleY: isJumping ? [1, 1.2, 0.9, 1.1, 1] : [1, 0.95, 1],
                  scaleX: isJumping ? [1, 0.9, 1.1, 0.9, 1] : [1, 1.02, 1],
                  rotate: isJumping ? [0, -5, 5, 0] : idleTilt,
                }}
                transition={{
                  y: isJumping
                    ? {
                        duration: 0.8,
                        times: [0, 0.5, 1],
                        ease: ["easeOut", "easeIn"],
                      }
                    : { duration: 3, repeat: Infinity, ease: "easeInOut" },
                  scaleY: isJumping
                    ? { duration: 0.8, times: [0, 0.4, 0.8, 0.9, 1] }
                    : { duration: 3, repeat: Infinity, ease: "easeInOut" },
                  scaleX: isJumping
                    ? { duration: 0.8, times: [0, 0.4, 0.8, 0.9, 1] }
                    : { duration: 3, repeat: Infinity, ease: "easeInOut" },
                  rotate: isJumping
                    ? { duration: 0.8, times: [0, 0.3, 0.7, 1] }
                    : { duration: 0.4, ease: "easeInOut" },
                }}
                className="w-full h-full drop-shadow-[2px_2px_0_rgba(0,0,0,1)] origin-bottom"
              >
                <RobotSVG
                  expression={expression}
                  isBlinking={isBlinking}
                  showMessage={showMessage}
                />
              </motion.div>

              <motion.div
                animate={{
                  scale: isJumping ? [1, 0.3, 1] : [1, 0.8, 1],
                  opacity: isJumping ? [0.6, 0.1, 0.6] : [0.6, 0.4, 0.6],
                }}
                transition={{
                  scale: isJumping
                    ? {
                        duration: 0.8,
                        times: [0, 0.5, 1],
                        ease: ["easeOut", "easeIn"],
                      }
                    : { duration: 3, repeat: Infinity, ease: "easeInOut" },
                  opacity: isJumping
                    ? {
                        duration: 0.8,
                        times: [0, 0.5, 1],
                        ease: ["easeOut", "easeIn"],
                      }
                    : { duration: 3, repeat: Infinity, ease: "easeInOut" },
                }}
                className="w-10 h-2 bg-black/60 rounded-[100%] absolute -bottom-1 left-1/2 -translate-x-1/2 blur-[2px]"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showCoffeeCard && (
          <motion.div
            className="fixed inset-0 z-300 flex items-center justify-center bg-black/60 backdrop-blur-sm pointer-events-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setShowCoffeeCard(false);
              setExpression("neutral");
              setReactionMsg("");
            }}
          >
            <motion.div
              className="relative bg-[#1a0a2e] border-[3px] border-[#7e22ce] p-8 max-w-sm w-full mx-4 shadow-[8px_8px_0_rgba(0,0,0,1)]"
              initial={{ scale: 0.5, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.5, y: 50, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => {
                  setShowCoffeeCard(false);
                  setExpression("neutral");
                  setReactionMsg("");
                }}
                className="absolute top-3 right-3 text-gray-400 hover:text-white font-mono text-lg font-bold transition-colors"
              >
                ✕
              </button>
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 drop-shadow-[2px_2px_0_rgba(0,0,0,1)]">
                  <RobotSVG
                    expression="hopeful"
                    isBlinking={false}
                    showMessage={false}
                  />
                </div>
              </div>
              <h3 className="text-center font-['Press_Start_2P'] text-lg text-neon-yellow mb-2">
                ☕ Buy Me a Coffee
              </h3>
              <p className="text-center text-gray-300 font-mono text-xs mb-6 leading-relaxed">
                Please please! If you enjoy my work,
                <br />
                consider supporting me! 🙏✨
              </p>
              <div className="flex justify-center mb-6">
                <div className="bg-white p-3 rounded">
                  <img
                    src="https://api.dicebear.com/9.x/identicon/svg?seed=qris-coffee&size=200"
                    alt="QRIS Code"
                    className="w-48 h-48 object-contain"
                  />
                </div>
              </div>
              <p className="text-center text-neon-cyan font-mono text-xs">
                Scan QRIS to donate 💜
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default memo(RobotCompanion);
