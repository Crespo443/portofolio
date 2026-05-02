import Terminal from "lucide-react/dist/esm/icons/terminal.mjs";

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-black/60 relative z-10 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-3">
        <div className="flex items-center gap-2">
          <Terminal className="text-neon-cyan w-5 h-5" />
          <span className="font-['Press_Start_2P'] text-sm tracking-tighter text-white">
            APR<span className="text-neon-magenta">_CRSPO</span>
          </span>
        </div>

        <p className="text-gray-500 font-mono text-xs text-center">
          &copy; {new Date().getFullYear()} Crespo. All systems operational.
        </p>

        <div className="flex gap-4 font-mono text-xs text-gray-500">
          <span>v1.0.0</span>
          <span>//</span>
          <span className="text-neon-cyan">ONLINE</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
