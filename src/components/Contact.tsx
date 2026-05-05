import { useState, memo } from "react";
import { motion } from "framer-motion";
import Mail from "lucide-react/dist/esm/icons/mail.mjs";
import Send from "lucide-react/dist/esm/icons/send.mjs";
import Terminal from "lucide-react/dist/esm/icons/terminal.mjs";
import ParticleBackground from "./ParticleBackground";

const GithubIcon = ({ size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.18-.35 6.5-1.5 6.5-7.1a5.4 5.4 0 0 0-1.5-3.8c.15-.38.65-1.8-.15-3.8 0 0-1.2-.38-3.9 1.5a13.38 13.38 0 0 0-7 0C6.2 1.6 5 2 5 2c-.8 2-.3 3.4-.15 3.8A5.4 5.4 0 0 0 3 9.6c0 5.6 3.3 6.75 6.5 7.1a4.8 4.8 0 0 0-1 3.02v4" />
    <path d="M9 20c-3 1-5-1-5-3" />
  </svg>
);

const LinkedinIcon = ({ size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// ⚠️ Replace with your Web3Forms access key from https://web3forms.com
const WEB3FORMS_ACCESS_KEY = "b90770bd-b981-40db-85b6-ae021284604c";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `Portfolio Contact: ${formData.name}`,
          from_name: "Portfolio Contact Form",
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus({
          type: "success",
          message: "Message transmitted to mainframe successfully.",
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus({
          type: "error",
          message: "Transmission failed. Please try again.",
        });
      }
    } catch {
      setStatus({
        type: "error",
        message: "Network error. Check your connection and retry.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section
      id="contact"
      className="py-16 relative z-10 bg-black/40 overflow-hidden"
    >
      <ParticleBackground />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="font-['Press_Start_2P'] text-xl md:text-3xl text-white mb-3">
            <span className="text-neon-cyan">@</span> CONTACT
          </h2>
          <div className="w-24 h-1 bg-linear-to-r from-neon-cyan to-neon-magenta mx-auto box-glow-magenta"></div>
          <p className="mt-5 text-gray-300 font-mono text-sm max-w-2xl mx-auto leading-loose">
            Ready to initiate a new project protocol? Establish a connection.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Social Links & Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col justify-center space-y-8"
          >
            <div>
              <h3 className="text-lg text-white font-mono mb-3 font-bold">
                Network Relays
              </h3>
              <p className="text-gray-200 font-mono text-sm leading-loose mb-5">
                You can also find my signal broadcasted on these frequencies. I
                am currently open for new opportunities and collaborations.
              </p>

              <div className="space-y-4">
                <a
                  href="https://github.com/Crespo443"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-gray-300 hover:text-neon-cyan hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-neon-cyan transition-all font-mono group p-3 glass-panel hover:bg-white/5"
                >
                  <GithubIcon
                    size={24}
                    className="group-hover:text-glow-cyan"
                  />
                  <span>github.com/Crespo344</span>
                </a>

                <a
                  href="https://www.linkedin.com/in/apriliano-crespo-982b1526a/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-gray-300 hover:text-neon-magenta hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-neon-magenta transition-all font-mono group p-3 glass-panel hover:bg-white/5"
                >
                  <LinkedinIcon
                    size={24}
                    className="group-hover:text-glow-magenta"
                  />
                  <span>linkedin.com/in/apriliano-crespo</span>
                </a>

                <a
                  href="mailto:aprilianocrespo27@gmail.com"
                  className="flex items-center gap-4 text-gray-300 hover:text-neon-yellow hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-neon-yellow transition-all font-mono group p-3 glass-panel hover:bg-white/5"
                >
                  <Mail
                    size={24}
                    className="drop-shadow-[0_0_5px_rgba(255,213,0,0.8)]"
                  />
                  <span>aprilianocrespo27@gmail.com</span>
                </a>
              </div>
            </div>
          </motion.div>
          {/* Contact Form */}
          <div className="relative">
            <div
              data-robot-target="contact"
              className="absolute top-0 right-7 w-1 h-1 pointer-events-none"
            />
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-panel p-6 sm:p-8 h-full"
            >
              <div className="flex items-center gap-2 mb-5 text-neon-cyan font-mono text-sm">
                <Terminal size={16} />
                <span>root@portfolio:~/contact# ./send_message.sh</span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot field for spam protection */}
                <input
                  type="checkbox"
                  name="botcheck"
                  className="hidden"
                  style={{ display: "none" }}
                />
                <div>
                  <label
                    htmlFor="name"
                    className="block text-neon-cyan font-mono text-sm mb-2"
                  >
                    Name=
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-black/50 border border-gray-600 rounded p-2.5 text-white font-mono focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-all"
                    placeholder='"John Doe"'
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-neon-magenta font-mono text-sm mb-2"
                  >
                    Email=
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-black/50 border border-gray-600 rounded p-2.5 text-white font-mono focus:outline-none focus:border-neon-magenta focus:ring-1 focus:ring-neon-magenta transition-all"
                    placeholder='"john@example.com"'
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-neon-yellow font-mono text-sm mb-2"
                  >
                    Message=
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full bg-black/50 border border-gray-600 rounded p-2.5 text-white font-mono focus:outline-none focus:border-neon-yellow focus:ring-1 focus:ring-neon-yellow transition-all resize-none"
                    placeholder='"Let&apos;s build something awesome..."'
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 border border-neon-cyan text-neon-cyan font-mono font-bold uppercase tracking-wider hover:bg-neon-cyan/10 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:ring-offset-2 focus:ring-offset-black transition-all box-glow-cyan flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:translate-y-0"
                >
                  {isSubmitting ? (
                    <span className="animate-pulse">TRANSMITTING...</span>
                  ) : (
                    <>
                      <span>EXECUTE</span>
                      <Send size={18} />
                    </>
                  )}
                </button>

                {status && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-3 rounded font-mono text-sm text-center border ${
                      status.type === "success"
                        ? "border-neon-cyan text-neon-cyan bg-neon-cyan/5"
                        : "border-red-500 text-red-400 bg-red-500/5"
                    }`}
                  >
                    {status.type === "success" ? "✓" : "✗"} {status.message}
                  </motion.div>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(Contact);
