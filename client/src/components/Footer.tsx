import { motion } from 'framer-motion';
import { FiGithub, FiTwitter, FiLinkedin, FiInstagram, FiMail } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/yourusername',
      icon: <FiGithub />,
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/yourusername',
      icon: <FiTwitter />,
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/yourusername',
      icon: <FiLinkedin />,
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com/yourusername',
      icon: <FiInstagram />,
    },
    {
      name: 'Email',
      url: 'mailto:your.email@example.com',
      icon: <FiMail />,
    },
  ];

  return (
    <footer className="bg-white dark:bg-primary py-12 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Your<span className="text-blue-600 dark:text-blue-400">Name</span>
            </h2>
          </motion.div>

          {/* Social Links */}
          <div className="flex space-x-6 mb-8">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.1 }}
                aria-label={link.name}
              >
                <span className="text-xl">{link.icon}</span>
              </motion.a>
            ))}
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-8 text-sm">
            {['Home', 'About', 'Experience', 'Projects', 'Contact'].map((item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
              >
                {item}
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="text-center text-sm text-gray-500 dark:text-gray-400"
          >
            <p>
              &copy; {currentYear} Your Name. All rights reserved.
            </p>
            <p className="mt-2">
              Designed and built with ❤️ using React, TypeScript, and Tailwind CSS
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;