import { motion } from 'framer-motion';
import { ExternalLink, FolderGit2 } from 'lucide-react';

const GithubIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.18-.35 6.5-1.5 6.5-7.1a5.4 5.4 0 0 0-1.5-3.8c.15-.38.65-1.8-.15-3.8 0 0-1.2-.38-3.9 1.5a13.38 13.38 0 0 0-7 0C6.2 1.6 5 2 5 2c-.8 2-.3 3.4-.15 3.8A5.4 5.4 0 0 0 3 9.6c0 5.6 3.3 6.75 6.5 7.1a4.8 4.8 0 0 0-1 3.02v4"/>
    <path d="M9 20c-3 1-5-1-5-3"/>
  </svg>
);

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: 'Neon Nexus',
      description: 'A cyberpunk-themed social network for developers to share snippets and pair program in real-time. Features WebSockets and decentralized auth.',
      techStack: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
      githubLink: '#',
      liveLink: '#',
      color: '#00f5ff',
    },
    {
      id: 2,
      title: 'SynthWave AI',
      description: 'Generative AI platform that creates retro 80s synthwave music tracks based on text prompts. Powered by a custom PyTorch model.',
      techStack: ['Python', 'PyTorch', 'FastAPI', 'Vue.js'],
      githubLink: '#',
      liveLink: '#',
      color: '#ff00cc',
    },
    {
      id: 3,
      title: 'Quantum Grid',
      description: 'A cloud infrastructure management tool visualizing Kubernetes clusters in a 3D grid layout for easier monitoring and debugging.',
      techStack: ['TypeScript', 'Three.js', 'Go', 'Kubernetes'],
      githubLink: '#',
      liveLink: '#',
      color: '#ffd500',
    },
    {
      id: 4,
      title: 'HoloDesk',
      description: 'Augmented reality workspace application that integrates with GitHub and Jira to project tasks and code reviews into your physical space.',
      techStack: ['Unity', 'C#', 'GraphQL', 'AWS'],
      githubLink: '#',
      liveLink: '#',
      color: '#00f5ff',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="projects" className="py-20 relative z-10 bg-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="font-['Press_Start_2P'] text-2xl md:text-4xl text-white mb-4">
            <span className="text-[#ff00cc]">_</span>PROJECTS
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#ff00cc] to-[#ffd500] mx-auto box-glow-magenta"></div>
          <p className="mt-6 text-gray-300 font-mono text-sm max-w-2xl mx-auto leading-loose">
            A selection of my recent works. Exploring the intersection of design, data, and performance.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="pixel-card p-8 sm:p-10 relative group transition-all duration-300 z-10 hover:z-20 focus-within:ring-2 focus-within:ring-current focus-within:ring-offset-4 focus-within:ring-offset-black"
              style={{ color: project.color }}
            >
              {/* Hover Glow Effect */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none rounded-xl"
                style={{ backgroundColor: project.color }}
              />
              <div 
                className="absolute -inset-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md pointer-events-none z-[-1]"
                style={{ backgroundColor: project.color, opacity: 0.15 }}
              />

              <div className="flex justify-between items-start mb-6">
                <FolderGit2 size={40} style={{ color: project.color }} className="opacity-80" />
                <div className="flex gap-4">
                  <a href={project.githubLink} className="text-gray-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white rounded">
                    <GithubIcon size={24} />
                  </a>
                  <a href={project.liveLink} className="text-gray-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white rounded">
                    <ExternalLink size={24} />
                  </a>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3 font-mono group-hover:text-glow-cyan transition-all" style={{ textShadow: `0 0 10px ${project.color}40` }}>
                {project.title}
              </h3>
              
              <p className="text-gray-200 text-sm mb-6 font-mono leading-loose min-h-[80px]">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 text-xs font-mono rounded bg-black/50 text-gray-300 border border-white/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-16 text-center">
          <a href="#" className="inline-flex items-center gap-2 font-mono text-[#00f5ff] hover:text-white hover:text-glow-cyan transition-all border-b border-transparent hover:border-[#00f5ff] pb-1">
            View Archive <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
