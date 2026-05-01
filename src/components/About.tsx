import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Cpu, Database, Globe, Layout, Server, Star, Terminal, Palette, GitBranch, MonitorSmartphone, Box, Layers, Network, Zap, LayoutList, Cloud, Wind, GitCommit, Command, Shield } from 'lucide-react';

const About = () => {
  const allSkills = [
    { name: 'Frontend React/Vue', level: 90, icon: Layout, color: '#00f5ff' },
    { name: 'Backend Node/Python', level: 85, icon: Server, color: '#ff00cc' },
    { name: 'Cloud Architecture', level: 80, icon: Globe, color: '#ffd500' },
    { name: 'Database SQL/NoSQL', level: 85, icon: Database, color: '#00f5ff' },
    { name: 'Machine Learning', level: 70, icon: Cpu, color: '#ff00cc' },
    { name: 'System Design', level: 75, icon: Code2, color: '#ffd500' },
    { name: 'TypeScript/JS', level: 95, icon: Terminal, color: '#b026ff' },
    { name: 'UI/UX Design', level: 85, icon: Palette, color: '#00f5ff' },
    { name: 'DevOps/CI-CD', level: 80, icon: GitBranch, color: '#ff00cc' },
    { name: 'Responsive Web', level: 90, icon: MonitorSmartphone, color: '#ffd500' },
    { name: 'Docker/K8s', level: 75, icon: Box, color: '#b026ff' },
    { name: 'Microservices', level: 80, icon: Layers, color: '#00f5ff' },
    { name: 'GraphQL/REST', level: 85, icon: Network, color: '#ff00cc' },
    { name: 'Next.js/Vite', level: 90, icon: Zap, color: '#ffd500' },
    { name: 'Agile/Scrum', level: 80, icon: LayoutList, color: '#00f5ff' },
    { name: 'Serverless', level: 75, icon: Cloud, color: '#b026ff' },
    { name: 'Tailwind/CSS', level: 95, icon: Wind, color: '#00f5ff' },
    { name: 'Git/Version', level: 90, icon: GitCommit, color: '#ffd500' },
    { name: 'Linux/Bash', level: 85, icon: Command, color: '#ff00cc' },
    { name: 'Cyber Security', level: 70, icon: Shield, color: '#b026ff' },
  ];
  
  const row1Skills = allSkills.slice(0, 10);
  const row2Skills = allSkills.slice(10, 20);
  return (
    <section id="about" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="font-['Press_Start_2P'] text-2xl md:text-4xl text-white mb-4">
            <span className="text-[#00f5ff]">&gt;</span> ABOUT_ME
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#00f5ff] to-[#ff00cc] box-glow-cyan"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-panel p-8 relative overflow-hidden"
            data-robot-target="about"
          >
            {/* Decorative circuit lines */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CiAgPGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9IiMwMGY1ZmYiLz4KPC9zdmc+')] opacity-20"></div>
            
            <h3 className="text-xl text-[#00f5ff] font-mono mb-6 font-bold border-b border-[#00f5ff]/30 pb-2 inline-block">System Log</h3>
            
            <div className="space-y-8 mb-8">
              {/* User Message */}
              <div className="flex items-end justify-start gap-3">
                {/* Pixel Avatar SVG */}
                <div className="w-12 h-12 flex-shrink-0 drop-shadow-[2px_2px_0_rgba(0,0,0,1)]">
                  <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    {/* Outline */}
                    <path d="M4 1h8v2h2v8h-2v2H4v-2H2V3h2V1z" fill="#fff" />
                    {/* Base head */}
                    <path d="M4 2h8v2h2v8h-2v2H4v-2H2V4h2V2z" fill="#fbcfe8" />
                    {/* Hair */}
                    <path d="M4 2h8v2h2v2H2V4h2V2z" fill="#7e22ce" />
                    {/* Eyes */}
                    <rect x="5" y="7" width="2" height="2" fill="#4c1d95" />
                    <rect x="9" y="7" width="2" height="2" fill="#4c1d95" />
                    {/* Mouth */}
                    <rect x="7" y="11" width="2" height="1" fill="#d946ef" />
                  </svg>
                </div>
                <div className="relative max-w-[75%]">
                  {/* Solid shadow */}
                  
                  <div className="absolute inset-0 translate-x-2 translate-y-2 bg-[#3b0764]"></div>
                  <div className="relative bg-[#7e22ce] border-[3px] border-[#581c87] p-3 text-white font-mono text-sm font-bold">
                    Who is you?
                  </div>
                </div>
              </div>
              {/* System Message */}
              <div className="relative max-w-[95%]">
                {/* Dotted shadow */}
                <div className="absolute inset-0 translate-x-3 translate-y-3 bg-[radial-gradient(#a855f7_1px,transparent_1px)] bg-[length:3px_3px]"></div>
                
                <div className="relative bg-[#fdf2f8] border-[3px] border-[#fbcfe8] p-5 font-mono text-black">
                  <p className="font-bold mb-4 text-base">Here is my profile:</p>
                  <p className="text-sm mb-4 leading-relaxed font-medium">
                    I plan to architect resilient microservices and craft highly scalable front-end interfaces for your upcoming projects.
                  </p>
                  <p className="text-sm mb-6 leading-relaxed font-medium">
                    When not coding, I explore generative AI and upgrade custom mechanical keyboards.
                  </p>
                  <div className="bg-white border-2 border-[#fbcfe8] p-3 flex justify-between items-center text-sm font-bold cursor-pointer hover:bg-gray-50 transition-colors">
                    <span>Deploy 50+ Projects</span>
                    <span className="text-[#fbcfe8]">▼</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 flex gap-4">
              <div className="flex flex-col items-center justify-center p-4 bg-black/30 border border-[#ff00cc]/30 rounded box-glow-magenta w-24">
                <span className="font-['Press_Start_2P'] text-[#ff00cc] text-xl mb-2">4+</span>
                <span className="font-mono text-xs text-center text-gray-300">Years Exp</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-black/30 border border-[#ffd500]/30 rounded shadow-[0_0_15px_rgba(255,213,0,0.2)] w-24">
                <span className="font-['Press_Start_2P'] text-[#ffd500] text-xl mb-2">10+</span>
                <span className="font-mono text-xs text-center text-gray-300">Projects</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-6"
          >
            <h3 className="text-xl text-[#ff00cc] font-mono mb-6 font-bold border-b border-[#ff00cc]/30 pb-2 inline-block">Core Capabilities</h3>
            
            <div className="relative overflow-hidden w-full py-4 flex flex-col gap-y-6">
              {/* Left Gradient Shadow */}
              <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#1a0033] to-transparent z-10 pointer-events-none"></div>
              
              {/* Row 1: Scrolling Left */}
              <motion.div
                className="flex gap-x-4 items-center w-max pr-4"
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                  duration: 70,
                  ease: "linear",
                  repeat: Infinity,
                }}
              >
                {[...row1Skills, ...row1Skills].map((skill, index) => {
                  const neonColors = ['bg-[#ff00cc]', 'bg-[#00f5ff]', 'bg-[#ffd500]', 'bg-[#b026ff]'];
                  const originalIndex = index % row1Skills.length;
                  const bgColor = neonColors[originalIndex % neonColors.length];
                  
                  return (
                    <React.Fragment key={`row1-${skill.name}-${index}`}>
                      <motion.div 
                        whileHover={{ x: -2, y: -2, boxShadow: '6px 6px 0px 0px rgba(0,0,0,1)' }}
                        className={`px-3 py-2 ${bgColor} text-black font-mono font-bold text-sm md:text-base 
                                   border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
                                   transition-all cursor-crosshair flex items-center gap-2 uppercase tracking-tight whitespace-nowrap flex-shrink-0`}
                      >
                        <skill.icon size={18} className="text-black stroke-[2.5]" />
                        <span>{skill.name}</span>
                      </motion.div>
                      
                      <Star size={20} className="text-transparent stroke-[#b026ff] stroke-[2.5] drop-shadow-[0_0_8px_rgba(176,38,255,0.9)] flex-shrink-0" />
                    </React.Fragment>
                  );
                })}
              </motion.div>

              {/* Row 2: Scrolling Right */}
              <motion.div
                className="flex gap-x-4 items-center w-max pr-4"
                animate={{ x: ["-50%", "0%"] }}
                transition={{
                  duration: 70,
                  ease: "linear",
                  repeat: Infinity,
                }}
              >
                {[...row2Skills, ...row2Skills].map((skill, index) => {
                  const neonColors = ['bg-[#ffd500]', 'bg-[#b026ff]', 'bg-[#ff00cc]', 'bg-[#00f5ff]']; // Different color order
                  const originalIndex = index % row2Skills.length;
                  const bgColor = neonColors[originalIndex % neonColors.length];
                  
                  return (
                    <React.Fragment key={`row2-${skill.name}-${index}`}>
                      <motion.div 
                        whileHover={{ x: -2, y: -2, boxShadow: '6px 6px 0px 0px rgba(0,0,0,1)' }}
                        className={`px-3 py-2 ${bgColor} text-black font-mono font-bold text-sm md:text-base 
                                   border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
                                   transition-all cursor-crosshair flex items-center gap-2 uppercase tracking-tight whitespace-nowrap flex-shrink-0`}
                      >
                        <skill.icon size={18} className="text-black stroke-[2.5]" />
                        <span>{skill.name}</span>
                      </motion.div>
                      
                      <Star size={20} className="text-transparent stroke-[#00f5ff] stroke-[2.5] drop-shadow-[0_0_8px_rgba(0,245,255,0.9)] flex-shrink-0" />
                    </React.Fragment>
                  );
                })}
              </motion.div>

              {/* Right Gradient Shadow */}
              <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#1a0033] to-transparent z-10 pointer-events-none"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
export default About;
