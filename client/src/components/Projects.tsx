import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink, FiCode, FiLayers, FiDatabase, FiServer } from 'react-icons/fi';

const fadeIn = (direction: string, delay: number) => {
  return {
    hidden: {
      y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
      x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
      opacity: 0,
    },
    show: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        duration: 1.25,
        delay,
      },
    },
  };
};

// Sample project data
const projectsData = [
  {
    id: 1,
    title: 'Hotel Booking Web Application',
    description: 'A full-featured hotel booking application that enables users to view and book hotels. The project includes secure user authentication, location-based search with Google Maps API, and CRUD operations for managing hotel listings and bookings.',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80',
    tags: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Express.js', 'MongoDB', 'Bootstrap'],
    features: [
      'Implemented secure user authentication and authorization with login and registration functionalities',
      'Integrated Google Maps API for location-based search and hotel mapping',
      'Enabled CRUD operations for managing hotel listings, user reviews, and booking details',
      'Designed a responsive, user-friendly interface using Bootstrap for cross-device compatibility',
      'Built efficient data storage and retrieval using MongoDB for user and booking data'
    ],
    demoLink: '#',
    githubLink: '#',
  }
];

const Projects = () => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [filteredProjects, setFilteredProjects] = useState(projectsData);

  // Get all unique tags from the projects
  const allTags = Array.from(
    new Set(projectsData.flatMap((project) => project.tags))
  );

  useEffect(() => {
    if (selectedTag) {
      setFilteredProjects(
        projectsData.filter((project) => project.tags.includes(selectedTag))
      );
    } else {
      setFilteredProjects(projectsData);
    }
  }, [selectedTag]);

  return (
    <section id="projects" className="py-20 bg-white dark:bg-primary">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          variants={fadeIn('up', 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Projects
          </h2>
          <div className="w-20 h-1 bg-blue-600 dark:bg-blue-400 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Showcasing my skills through practical applications and real-world solutions.
          </p>
        </motion.div>

        {/* Filter Tags */}
        <motion.div
          variants={fadeIn('up', 0.3)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedTag === null
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedTag === tag
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {tag}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence>
          <div className="grid grid-cols-1 gap-10">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={fadeIn('up', 0.4 + index * 0.1)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                className="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Project Image */}
                  <div className="h-64 md:h-auto overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  
                  {/* Project Details */}
                  <div className="p-6 md:p-8 flex flex-col">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      {project.description}
                    </p>
                    
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        Key Features:
                      </h4>
                      <ul className="space-y-2">
                        {project.features.map((feature, i) => (
                          <li key={i} className="flex items-start text-gray-600 dark:text-gray-300">
                            <span className="mr-2 text-blue-600 dark:text-blue-400">•</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex gap-4">
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-lg flex items-center transition-colors"
                      >
                        <FiGithub className="mr-2" />
                        Code
                      </a>
                      <a
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center transition-colors"
                      >
                        <FiExternalLink className="mr-2" />
                        Live Demo
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>

        {/* Technology Icons */}
        <motion.div
          variants={fadeIn('up', 0.6)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="mt-20 text-center"
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-10">
            Technologies I Work With
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
                <FiCode className="w-8 h-8" />
              </div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                Frontend
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                HTML, CSS, JavaScript, React, Bootstrap
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
                <FiServer className="w-8 h-8" />
              </div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                Backend
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Node.js, Express.js, ASP.NET, C#
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
                <FiDatabase className="w-8 h-8" />
              </div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                Database
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                MongoDB, SQL Server
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
                <FiLayers className="w-8 h-8" />
              </div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                Other Skills
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                API Integration, REST APIs, Responsive Design
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects; 