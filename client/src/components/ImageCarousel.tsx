import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

// Import the actual images
import image1 from '../assets/images/17447a83-ace8-4db6-8dc0-ddc941d81e43.jpg';
import image2 from '../assets/images/773e5f07-d64c-463d-912f-31e42c460b09.jpg';
import image3 from '../assets/images/img.jpg';

// Image data with actual images - removed myself image
const friendImages = [
  { id: 1, src: image1, alt: 'Friend 1' },
  { id: 2, src: image2, alt: 'Friend 2' },
  { id: 3, src: image3, alt: 'Friend 3' },
];

// Different animation variants for a more professional look
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: 'spring', stiffness: 300, damping: 30 },
      opacity: { duration: 0.4 },
      scale: { duration: 0.4 }
    }
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.95,
    transition: {
      x: { type: 'spring', stiffness: 300, damping: 30 },
      opacity: { duration: 0.4 },
      scale: { duration: 0.4 }
    }
  })
};

// Add a fade effect for the content overlay
const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6
    }
  }
};

const ImageCarousel = () => {
  const [[page, direction], setPage] = useState([0, 0]);
  const [autoplay, setAutoplay] = useState(true);

  // Index for the current image
  const imageIndex = ((page % friendImages.length) + friendImages.length) % friendImages.length;

  // Paginate function using useCallback to avoid rerenders
  const paginate = useCallback((newDirection: number) => {
    setPage(([prevPage]) => [prevPage + newDirection, newDirection]);
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        paginate(-1);
      } else if (e.key === 'ArrowRight') {
        paginate(1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [paginate]);

  // Autoplay functionality - set to exactly 3 seconds (3000ms)
  useEffect(() => {
    if (!autoplay) return;
    
    const interval = setInterval(() => {
      paginate(1);
    }, 4000); // Changed to 4 seconds
    
    return () => clearInterval(interval);
  }, [autoplay, paginate]);

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          variants={fadeInVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Friends Gallery
          </h2>
          <div className="w-20 h-1 bg-blue-600 dark:bg-blue-400 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Special moments captured with amazing people in my life.
          </p>
        </motion.div>

        <div className="relative w-full max-w-4xl mx-auto h-[500px] overflow-hidden rounded-xl shadow-lg bg-gray-100 dark:bg-gray-800">
          {/* Progress bar indicating time until next slide */}
          {autoplay && (
            <motion.div 
              className="absolute top-0 left-0 h-1 bg-blue-500 z-20"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 4, ease: "linear", repeat: Infinity }}
            />
          )}
          
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={page}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute w-full h-full flex items-center justify-center p-4"
              onMouseEnter={() => setAutoplay(false)}
              onMouseLeave={() => setAutoplay(true)}
            >
              <img 
                src={friendImages[imageIndex].src}
                alt={friendImages[imageIndex].alt}
                className="max-w-full max-h-full object-contain rounded-lg shadow-md"
              />
              
              {/* Image caption overlay */}
              <motion.div 
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white p-4 rounded-b-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <h3 className="text-xl font-semibold">
                  {friendImages[imageIndex].alt}
                </h3>
                <p className="text-sm text-gray-200">
                  {imageIndex + 1} of {friendImages.length}
                </p>
              </motion.div>
            </motion.div>
          </AnimatePresence>
          
          {/* Navigation buttons with improved styling */}
          <div className="absolute top-0 bottom-0 left-0 right-0 flex justify-between items-center px-4 pointer-events-none">
            <motion.button
              className="w-12 h-12 rounded-full bg-white/70 dark:bg-black/40 flex items-center justify-center text-gray-800 dark:text-white hover:bg-white hover:dark:bg-black/60 transition-colors pointer-events-auto"
              onClick={() => paginate(-1)}
              aria-label="Previous image"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiChevronLeft className="w-6 h-6" />
            </motion.button>
            <motion.button
              className="w-12 h-12 rounded-full bg-white/70 dark:bg-black/40 flex items-center justify-center text-gray-800 dark:text-white hover:bg-white hover:dark:bg-black/60 transition-colors pointer-events-auto"
              onClick={() => paginate(1)}
              aria-label="Next image"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiChevronRight className="w-6 h-6" />
            </motion.button>
          </div>
          
          {/* Dots navigation with animations */}
          <div className="absolute bottom-16 left-0 right-0 flex justify-center space-x-3">
            {friendImages.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setPage([index, index > imageIndex ? 1 : -1])}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === imageIndex ? 'bg-blue-600 dark:bg-blue-400' : 'bg-gray-300 dark:bg-gray-600'
                }`}
                aria-label={`Go to image ${index + 1}`}
                animate={{
                  scale: index === imageIndex ? 1.2 : 1,
                  opacity: index === imageIndex ? 1 : 0.7
                }}
                whileHover={{ scale: 1.3, opacity: 1 }}
              />
            ))}
          </div>
        </div>
        
        <div className="text-center mt-8">
          <p className="text-gray-600 dark:text-gray-300">
            Images change every 4 seconds. Hover to pause autoplay.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ImageCarousel; 