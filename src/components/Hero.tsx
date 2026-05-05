import { useState, useEffect, memo } from "react";
import { motion } from "framer-motion";
import Terminal from "lucide-react/dist/esm/icons/terminal.mjs";
import ChevronRight from "lucide-react/dist/esm/icons/chevron-right.mjs";
import MapPin from "lucide-react/dist/esm/icons/map-pin.mjs";

const roles = ["Backend Engineer", "AI Developer", "System Architect"];

const TypingText = memo(() => {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const i = loopNum % roles.length;
    const fullText = roles[i];

    const handleTyping = () => {
      if (isDeleting) {
        setText(fullText.substring(0, text.length - 1));
        setTypingSpeed(50);
      } else {
        setText(fullText.substring(0, text.length + 1));
        setTypingSpeed(100);
      }

      if (!isDeleting && text === fullText) {
        setTypingSpeed(2000); // Pause before deleting
        setIsDeleting(true);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(500); // Pause before next word
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  return (
    <div className="text-lg md:text-xl text-gray-300 font-mono mb-8 max-w-2xl h-7 flex justify-center lg:justify-start items-center">
      &gt; <span className="text-neon-yellow ml-2">{text}</span>
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1, repeat: Infinity }}
        className="inline-block w-3 h-6 bg-neon-cyan ml-1 align-middle"
      />
    </div>
  );
});

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-svh flex items-center justify-center overflow-hidden pt-20 pb-10 md:pt-24"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse lg:flex-row items-center justify-between gap-8 lg:gap-12 w-full">
        {/* Left Side: Text Content */}
        <div className="flex-1 w-full flex flex-col items-center lg:items-start text-center lg:text-left lg:ml-12 lg:translate-x-4">
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-neon-cyan/30 bg-neon-cyan/10 text-[#00ff9d] font-mono text-xs sm:text-sm backdrop-blur-sm shadow-[0_0_10px_rgba(0,255,157,0.3)] max-w-full"
              data-robot-target="home"
            >
              <MapPin size={16} className="shrink-0" />
              <span className="hidden sm:inline">Sikka, East Nusa Tenggara, Indonesia</span>
              <span className="sm:hidden">Sikka, NTT, ID</span>
            </motion.div>
          </div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="font-['Press_Start_2P'] text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-5 leading-tight text-white"
          >
            HI,I'M <br className="md:hidden" />
            <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-neon-cyan to-neon-magenta text-glow-cyan">
              CRSPO
            </span>
          </motion.h1>

          <TypingText />

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <a
              href="#projects"
              className="group relative px-4 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-base bg-neon-cyan/10 border border-neon-cyan text-neon-cyan font-mono font-bold uppercase tracking-wider overflow-hidden hover:bg-neon-cyan/20 transition-colors box-glow-cyan"
            >
              <div className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-neon-cyan/30 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
              <span className="relative flex items-center justify-center gap-2">
                View Projects{" "}
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>

            <a
              href="#contact"
              className="group px-4 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-base border border-neon-magenta text-neon-magenta font-mono font-bold uppercase tracking-wider hover:bg-neon-magenta/10 transition-colors box-glow-magenta flex items-center justify-center gap-2"
            >
              Contact Me{" "}
              <Terminal className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform" />
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6, type: "spring" }}
          className="relative w-full max-w-40 sm:max-w-48 md:max-w-64 lg:max-w-72 xl:max-w-80 aspect-square flex-1 mt-8 lg:mt-0 mx-auto lg:mx-0 lg:mr-20 lg:-translate-x-4 group"
        >
          {/* Smooth Neon Flow Border */}
          <div className="absolute inset-0 neon-flow-frame z-10">
            <div className="relative w-full h-full overflow-hidden glitch-image">
              <img
                src="crespo.jpeg"
                alt="Profile"
                loading="eager"
                className="w-full h-full object-cover opacity-80 mix-blend-luminosity group-hover:mix-blend-normal group-hover:opacity-100 transition-all duration-500"
              />

              {/* Eye Glow Effects (Adjust top/left/right to match your image) */}
              <div className="eye-glow eye-cyan top-[32%] left-[6%] w-[2.5%] h-[2.5%] z-30 animate-eye-pulse"></div>
              <div className="eye-glow eye-magenta top-[33%] left-[20%] w-[2.5%] h-[2.5%] z-30 animate-eye-pulse"></div>

              {/* Corner Brackets */}
              <div className="scanning-corner corner-tl z-20"></div>
              <div className="scanning-corner corner-tr z-20"></div>
              <div className="scanning-corner corner-bl z-20"></div>
              <div className="scanning-corner corner-br z-20"></div>

              {/* Cyberpunk color overlay to tint the image */}
              <div className="absolute inset-0 bg-linear-to-tr from-neon-magenta/30 to-neon-cyan/30 pointer-events-none mix-blend-overlay group-hover:opacity-50 transition-opacity duration-500 z-10"></div>
            </div>
          </div>

          {/* Decorative tech rings */}
          <div
            className="absolute -inset-4 border border-neon-cyan/30 border-dashed animate-[spin_20s_linear_infinite] z-0"
            style={{
              clipPath:
                "polygon(10px 0, calc(100% - 10px) 0, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0 calc(100% - 10px), 0 10px)",
            }}
          ></div>
          <div
            className="absolute -inset-8 border border-neon-magenta/20 animate-[spin_30s_linear_infinite_reverse] z-0"
            style={{
              clipPath:
                "polygon(15px 0, calc(100% - 15px) 0, 100% 15px, 100% calc(100% - 15px), calc(100% - 15px) 100%, 15px 100%, 0 calc(100% - 15px), 0 15px)",
            }}
          ></div>

          {/* Decorative corner pixels */}
          <div className="absolute -top-2.5 -right-2.5 w-2 h-2 bg-neon-cyan box-glow-cyan z-20"></div>
          <div className="absolute -bottom-2.5 -left-2.5 w-2 h-2 bg-neon-magenta box-glow-magenta z-20"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
