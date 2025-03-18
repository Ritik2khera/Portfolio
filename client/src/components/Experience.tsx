import { motion } from 'framer-motion';
import { FiBriefcase, FiCalendar } from 'react-icons/fi';

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

const experiences = [
  {
    title: 'Software Developer',
    company: 'BuyNxt Pvt. Ltd.',
    location: 'Gurgaon, India',
    period: 'Present',
    description: [
      'Integrated WhatsApp API, resolving critical bugs and ensuring smooth customer communication.',
      'Developed and integrated Commerce APIs for the Indian government\'s ONDC initiative.',
      'Built automation tools that converted 10,000+ images into various formats within minutes, improving workflow efficiency.',
      'Created a PDF reader utility and integrated Meta APIs for catalog automation.',
      'Worked on Shopify and WooCommerce projects using Node.js and Express.js, developing custom applications and automation workflows.',
      'Designed and implemented development dashboards, enhancing analytics and operational efficiency.',
      'Automated Merchant Lifecycle Management (MLCM) and Lead Management System (LMS) by integrating with WhatsApp APIs.',
      'Contributed to web scraping projects, helping onboard sellers and increase business value.'
    ]
  }
];

const certificates = [
  {
    title: 'Full-Stack Web Development (MERN Stack)',
    institution: 'Apna College',
    description: 'Completed an in-depth course covering MongoDB, Express.js, React.js, and Node.js, gaining hands-on experience in building modern web applications.'
  },
  {
    title: 'Java Programming & Data Structures and Algorithms (DSA)',
    institution: 'Apna College',
    description: 'Mastered core Java concepts and advanced data structures and algorithms, including arrays, linked lists, trees, graphs, and problem-solving techniques.'
  }
];

const Experience = () => {
  return (
    <section id="experience" className="py-20 bg-gray-50 dark:bg-black-100">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          variants={fadeIn('up', 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Experience & Certifications
          </h2>
          <div className="w-20 h-1 bg-blue-600 dark:bg-blue-400 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            My professional journey and continuous learning path in software development.
          </p>
        </motion.div>

        <div className="mb-20">
          <motion.h3
            variants={fadeIn('up', 0.3)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="text-2xl font-bold text-gray-900 dark:text-white mb-10 text-center"
          >
            Work Experience
          </motion.h3>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={`${exp.company}-${index}`}
                variants={fadeIn('up', 0.4 + index * 0.1)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                className="bg-white dark:bg-tertiary rounded-xl shadow-lg overflow-hidden"
              >
                <div className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                        {exp.title}
                      </h4>
                      <p className="text-blue-600 dark:text-blue-400 font-medium">
                        {exp.company}
                      </p>
                      <p className="text-gray-500 dark:text-gray-400 mt-1">
                        {exp.location}
                      </p>
                    </div>
                    <div className="mt-2 md:mt-0 flex items-center text-gray-500 dark:text-gray-400">
                      <FiCalendar className="mr-2" />
                      <span>{exp.period}</span>
                    </div>
                  </div>
                  <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                    {exp.description.map((item, i) => (
                      <li key={i} className="flex">
                        <span className="mr-2">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.h3
          variants={fadeIn('up', 0.7)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="text-2xl font-bold text-gray-900 dark:text-white mb-10 text-center"
        >
          Certifications
        </motion.h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {certificates.map((cert, index) => (
            <motion.div
              key={index}
              variants={fadeIn(index % 2 === 0 ? 'right' : 'left', 0.8 + index * 0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              className="bg-white dark:bg-tertiary rounded-xl shadow-lg p-6"
            >
              <div className="flex items-start mb-4">
                <div className="mr-4 p-3 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400">
                  <FiBriefcase className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                    {cert.title}
                  </h4>
                  <p className="text-blue-600 dark:text-blue-400">
                    {cert.institution}
                  </p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 ml-[3.25rem]">
                {cert.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience; 