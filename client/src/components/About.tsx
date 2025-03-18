import { motion } from 'framer-motion';
import { FiCode, FiDatabase, FiTool, FiGlobe } from 'react-icons/fi';

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

const skills = [
  {
    name: 'Programming Languages',
    icon: <FiCode className="text-3xl text-blue-600 dark:text-blue-400" />,
    description: 'Proficient in various programming languages for efficient development.',
    technologies: ['C#.Net', 'Java', 'JavaScript'],
  },
  {
    name: 'Web Technologies',
    icon: <FiGlobe className="text-3xl text-blue-600 dark:text-blue-400" />,
    description: 'Skilled in modern web development technologies and frameworks.',
    technologies: ['Node.js', 'Express.js', 'React.js', 'ASP.NET', 'RESTful APIs', 'HTML', 'Tailwind CSS', 'Bootstrap', 'ShadCN UI'],
  },
  {
    name: 'Database',
    icon: <FiDatabase className="text-3xl text-blue-600 dark:text-blue-400" />,
    description: 'Experienced in database management and optimization.',
    technologies: ['SQL Server', 'MongoDB'],
  },
  {
    name: 'Tools & Other',
    icon: <FiTool className="text-3xl text-blue-600 dark:text-blue-400" />,
    description: 'Familiar with various development tools and environments.',
    technologies: ['Postman', 'GitHub', 'Visual Studio', 'VS Code', 'Bug Fixing', 'MS Excel', 'MS Word'],
  },
];

const About = () => {
  return (
    <section id="about" className="py-20 bg-white dark:bg-primary">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          variants={fadeIn('up', 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            About Me
          </h2>
          <div className="w-20 h-1 bg-blue-600 dark:bg-blue-400 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Experienced Software Developer with expertise in API integration, automation tool development, and full project implementation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <motion.div
            variants={fadeIn('right', 0.3)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Professional Summary
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Experienced Software Developer with expertise in API integration, automation tool development, and full project implementation. Proficient in C#, ASP.NET, Java, SQL Server, Node.js, Express.js, and cloud platforms. 
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Skilled at designing efficient solutions to optimize business workflows and improve productivity. Dedicated to delivering high-quality code, collaborating effectively with cross-functional teams, and continuously enhancing technical knowledge.
            </p>
          </motion.div>

          <motion.div
            variants={fadeIn('left', 0.3)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Education
            </h3>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                B.TECH in Computer Science and Engineering
              </h4>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                BM GROUP OF INSTITUTIONS, Gurgaon, Farukhnagar
              </p>
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <span className="font-semibold">CGPA:</span>
                <span className="ml-2">7.3</span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={fadeIn('up', 0.4)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-10 text-center">
            My Skills
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                variants={fadeIn('up', 0.1 * index)}
                className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-6 mx-auto">
                  {skill.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3 text-center">
                  {skill.name}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-center">
                  {skill.description}
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {skill.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About; 