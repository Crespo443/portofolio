import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, ChevronRight, MapPin } from 'lucide-react';

const Hero = () => {
  const roles = ["Backend Engineer", "AI Developer", "System Architect"];
  const [text, setText] = useState('');
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
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(500); // Pause before next word
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-20 w-full">
        
        {/* Left Side: Text Content */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-6">
            {/* <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00f5ff]/30 bg-[#00f5ff]/10 text-[#00f5ff] font-mono text-sm backdrop-blur-sm box-glow-cyan"
            >
              <Terminal size={16} />
              <span>System.out.println("Hello World");</span>
            </motion.div>
             */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00f5ff]/30 bg-[#00f5ff]/10 text-[#00ff9d] font-mono text-sm backdrop-blur-sm shadow-[0_0_10px_rgba(0,255,157,0.3)]"
            >
              <MapPin size={16} />
              <span>Sikka, East Nusa Tenggara, Indonesia</span>
            </motion.div>
          </div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="font-['Press_Start_2P'] text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-6 leading-tight text-white"
          >
            HI, I'M <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f5ff] to-[#ff00cc] text-glow-cyan">
              CRSPO
            </span>
          </motion.h1>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-xl md:text-2xl text-gray-300 font-mono mb-10 max-w-2xl h-8 flex justify-center lg:justify-start items-center"
          >
            &gt; <span className="text-[#ffd500] ml-2">{text}</span>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="inline-block w-3 h-6 bg-[#00f5ff] ml-1 align-middle"
            />
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto"
          >
            <a href="#projects" className="group relative px-8 py-4 bg-[#00f5ff]/10 border border-[#00f5ff] text-[#00f5ff] font-mono font-bold uppercase tracking-wider overflow-hidden hover:bg-[#00f5ff]/20 transition-colors box-glow-cyan">
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-[#00f5ff]/30 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
              <span className="relative flex items-center justify-center gap-2">
                View Projects <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
            
            <a href="#contact" className="group px-8 py-4 border border-[#ff00cc] text-[#ff00cc] font-mono font-bold uppercase tracking-wider hover:bg-[#ff00cc]/10 transition-colors box-glow-magenta flex items-center justify-center gap-2">
              Contact Me <Terminal className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            </a>
          </motion.div>
        </div>

        {/* Right Side: Profile Picture */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6, type: "spring" }}
          className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 flex-shrink-0 mt-10 lg:mt-0"
        >
          {/* Cyberpunk styled frame using the retro dotted border */}
          <div className="absolute inset-0 retro-pixel-border z-10 flex items-center justify-center bg-[#0f051c] group">
            <img 
              src="crespoprofile.jpg" 
              alt="Profile" 
              className="w-full h-full object-cover opacity-80 mix-blend-luminosity group-hover:mix-blend-normal group-hover:opacity-100 transition-all duration-500"
            />
            {/* Cyberpunk color overlay to tint the image */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#ff00cc]/30 to-[#00f5ff]/30 pointer-events-none mix-blend-overlay group-hover:opacity-50 transition-opacity duration-500"></div>
          </div>
          
          {/* Decorative tech rings */}
          <div className="absolute -inset-4 border border-[#00f5ff]/30 border-dashed animate-[spin_20s_linear_infinite] z-0" style={{ clipPath: 'polygon(10px 0, calc(100% - 10px) 0, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0 calc(100% - 10px), 0 10px)' }}></div>
          <div className="absolute -inset-8 border border-[#ff00cc]/20 animate-[spin_30s_linear_infinite_reverse] z-0" style={{ clipPath: 'polygon(15px 0, calc(100% - 15px) 0, 100% 15px, 100% calc(100% - 15px), calc(100% - 15px) 100%, 15px 100%, 0 calc(100% - 15px), 0 15px)' }}></div>
          
          {/* Decorative corner pixels */}
          <div className="absolute top-[-10px] right-[-10px] w-4 h-4 bg-[#00f5ff] box-glow-cyan z-20"></div>
          <div className="absolute bottom-[-10px] left-[-10px] w-4 h-4 bg-[#ff00cc] box-glow-magenta z-20"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
