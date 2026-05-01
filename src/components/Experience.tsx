import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import AnimatedBackground from './AnimatedBackground';

const Experience = () => {
  const experiences = [
    {
      id: 1,
      role: 'Senior Cloud Engineer',
      company: 'Cyberdyne Systems',
      location: 'Neo-Tokyo, JP',
      date: '2024 - Present',
      description: [
        'Architected serverless microservices using AWS Lambda and API Gateway, reducing operational costs by 40%.',
        'Implemented automated CI/CD pipelines with GitHub Actions and Terraform.',
        'Led a team of 5 engineers in migrating legacy monolithic application to Kubernetes.',
      ],
      color: '#ffd500',
    },
    {
      id: 2,
      role: 'AI Developer',
      company: 'OmniCorp',
      location: 'Detroit, MI',
      date: '2021 - 2024',
      description: [
        'Developed computer vision models using PyTorch for real-time defect detection in manufacturing.',
        'Optimized model inference time by 60% using TensorRT.',
        'Created a unified MLOps pipeline for automated model training and deployment.',
      ],
      color: '#00f5ff',
    },
    {
      id: 3,
      role: 'Full Stack Engineer',
      company: 'Stark Industries',
      location: 'Remote',
      date: '2019 - 2021',
      description: [
        'Built enterprise web applications using React, Node.js, and PostgreSQL.',
        'Designed and implemented secure RESTful APIs with high throughput.',
        'Mentored junior developers and conducted code reviews.',
      ],
      color: '#ff00cc',
    },
  ];

  return (
    <section id="experience" className="py-20 relative z-10 overflow-hidden">
      <AnimatedBackground />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="font-['Press_Start_2P'] text-2xl md:text-4xl text-white mb-4">
            <span className="text-[#ffd500]">*</span> EXPERIENCE
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#ffd500] to-[#00f5ff] box-glow-cyan"></div>
        </motion.div>

        <div className="relative border-l-2 border-white/20 ml-3 md:ml-6 space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative pl-8 md:pl-12"
            >
              {/* Timeline Dot */}
              <div 
                className="absolute w-6 h-6 rounded-full -left-[13px] top-1 flex items-center justify-center bg-black border-2 z-10"
                style={{ borderColor: exp.color, boxShadow: `0 0 10px ${exp.color}` }}
              >
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: exp.color }}></div>
              </div>

              <div className="retro-pixel-border p-6 sm:p-8 hover:bg-white/5 transition-colors group relative overflow-hidden">
                <div 
                  className="absolute top-0 left-0 w-1 h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ backgroundColor: exp.color, boxShadow: `0 0 15px ${exp.color}` }}
                ></div>

                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4 gap-4">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold font-mono group-hover:text-glow-cyan transition-colors drop-shadow-[0_0_8px_currentColor]" style={{ color: exp.color }}>
                      {exp.role}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-300 mt-2 font-mono text-sm">
                      <Briefcase size={16} className="text-gray-500" />
                      <span className="font-bold">{exp.company}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2 font-mono text-xs text-gray-300">
                    <div className="flex items-center gap-2 md:justify-end">
                      <Calendar size={14} className="text-gray-500" />
                      <span>{exp.date}</span>
                    </div>
                    <div className="flex items-center gap-2 md:justify-end">
                      <MapPin size={14} className="text-gray-500" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>

                <ul className="space-y-3 mt-6">
                  {exp.description.map((item, i) => (
                    <li key={i} className="flex gap-3 text-gray-300 font-mono text-sm leading-loose">
                      <span className="text-xl leading-none mt-1" style={{ color: exp.color }}>›</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
