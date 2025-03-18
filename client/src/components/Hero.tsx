import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiArrowDown } from 'react-icons/fi';
import { scrollToSection } from '../utils/scrollUtils';
// Import the user's image
import myselfImage from '../assets/images/myself.jpg';

// Add the CSS as a separate imported stylesheet
const avatarStyles = `
  .fancy-avatar {
    position: relative;
    z-index: 10;
  }
  
  .magic-avatar {
    position: relative;
    z-index: 10;
  }
  
  .magic-avatar::before {
    content: '';
    position: absolute;
    inset: -10px;
    border-radius: 50%;
    background: conic-gradient(
      from 0deg, 
      rgba(59, 130, 246, 0), 
      rgba(59, 130, 246, 0.8), 
      rgba(59, 130, 246, 0)
    );
    animation: spin 4s linear infinite;
    z-index: -1;
  }
  
  .magic-avatar::after {
    content: '';
    position: absolute;
    inset: -5px;
    border-radius: 50%;
    background: radial-gradient(
      circle at center,
      rgba(59, 130, 246, 0.2) 0%,
      rgba(59, 130, 246, 0) 70%
    );
    animation: pulse 3s ease-in-out infinite;
    z-index: -1;
  }
  
  .fire-accent {
    position: absolute;
    left: 50%;
    bottom: -5px;
    transform: translateX(-50%);
    width: 50%;
    height: 40px;
    background: linear-gradient(to top, 
      #ff3c00, 
      #ff8a00 40%, 
      #ffb700 70%, 
      #fffae0);
    filter: blur(10px);
    border-radius: 40% 40% 20% 20% / 60% 60% 30% 30%;
    opacity: 0.5;
    z-index: -2;
    animation: fireFlicker 4s ease-in-out infinite;
  }
  
  .blue-sparkle {
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #3b82f6;
    filter: blur(1px);
    opacity: 0;
    z-index: -1;
    animation: sparkleFloat 3s linear infinite;
  }
  
  .star-sparkle {
    position: absolute;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 10px solid #60a5fa;
    transform-origin: center;
    opacity: 0;
    z-index: 1;
    animation: starTwinkle 4s ease-in-out infinite;
  }
  
  .star-sparkle::after {
    content: '';
    position: absolute;
    top: 3px;
    left: -5px;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 10px solid #60a5fa;
  }
  
  .glow-effect {
    position: absolute;
    inset: -30px;
    background: radial-gradient(circle at center, 
      rgba(59, 130, 246, 0.3) 0%,
      rgba(37, 99, 235, 0.2) 30%,
      rgba(29, 78, 216, 0.1) 60%,
      rgba(30, 64, 175, 0) 100%);
    border-radius: 50%;
    z-index: -2;
    animation: glowPulse 4s ease-in-out infinite;
  }
  
  .shine-effect {
    position: absolute;
    overflow: hidden;
    inset: 0;
    border-radius: 50%;
    z-index: 5;
  }
  
  .shine-effect::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 50%;
    height: 100%;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.3) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    transform: skewX(-25deg);
    animation: shine 6s ease-in-out infinite;
  }
  
  @keyframes shine {
    0%, 100% {
      left: -100%;
    }
    20%, 80% {
      left: 150%;
    }
  }
  
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  
  @keyframes pulse {
    0%, 100% {
      opacity: 0.2;
      transform: scale(1);
    }
    50% {
      opacity: 0.8;
      transform: scale(1.2);
    }
  }
  
  @keyframes sparkleFloat {
    0% {
      transform: translate(0, 0) scale(0.2);
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    50% {
      transform: translate(var(--tx, 0), var(--ty, -50px)) scale(1);
      opacity: 0.7;
    }
    100% {
      transform: translate(var(--tx, 0), var(--ty, -100px)) scale(0.2);
      opacity: 0;
    }
  }
  
  @keyframes fireFlicker {
    0%, 100% {
      opacity: 0.5;
      transform: translateX(-50%) scale(1) translateY(0);
    }
    25% {
      opacity: 0.7;
      transform: translateX(-50%) scale(1.1, 1.05) translateY(-2px);
    }
    50% {
      opacity: 0.5;
      transform: translateX(-50%) scale(0.9, 1) translateY(1px);
    }
    75% {
      opacity: 0.6;
      transform: translateX(-50%) scale(1.05, 0.95) translateY(-1px);
    }
  }
  
  @keyframes glowPulse {
    0%, 100% {
      opacity: 0.3;
      transform: scale(1);
    }
    50% {
      opacity: 0.5;
      transform: scale(1.1);
    }
  }
  
  @keyframes starTwinkle {
    0% {
      transform: scale(0.5) rotate(0deg);
      opacity: 0;
    }
    25% {
      opacity: 0.8;
    }
    50% {
      transform: scale(1.2) rotate(180deg);
      opacity: 1;
    }
    75% {
      opacity: 0.6;
    }
    100% {
      transform: scale(0.5) rotate(360deg);
      opacity: 0;
    }
  }
  
  @media (prefers-reduced-motion: reduce) {
    .magic-avatar::before,
    .magic-avatar::after,
    .fire-accent,
    .blue-sparkle,
    .star-sparkle,
    .glow-effect,
    .shine-effect::before {
      animation: none;
    }
  }
`;

const Hero = () => {
  // Text elements that will be animated
  const jobTitle = "Software Developer";
  const greeting = "Hi, I'm ";
  const name = "Ritik Kumar";
  const description = "Software Developer with expertise in API integration and full-stack development";
  
  // State to control the typing animation
  const [jobTitleTyped, setJobTitleTyped] = useState("");
  const [greetingTyped, setGreetingTyped] = useState("");
  const [nameTyped, setNameTyped] = useState("");
  const [descriptionTyped, setDescriptionTyped] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [sparkles, setSparkles] = useState<{id: number, style: React.CSSProperties, type?: string}[]>([]);

  // Function to create random sparkles for the animation
  useEffect(() => {
    if (!isComplete) return;
    
    // Function to create static sparkles around the avatar
    const createStaticSparkles = () => {
      const staticSparkles: {id: number, style: React.CSSProperties, type: string}[] = [];
      
      // Create 8 evenly spaced sparkles around the avatar
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const distance = 110; // Fixed distance from center
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        
        staticSparkles.push({
          id: Date.now() + 1000 + i,
          type: 'star-sparkle',
          style: {
            position: 'absolute',
            left: `calc(50% + ${tx}px)`,
            top: `calc(50% + ${ty}px)`,
            opacity: 0.7,
            animationDuration: `${3 + i % 3}s`,
            animationDelay: `${i * 0.5}s`,
            zIndex: 2,
          } as React.CSSProperties,
        });
      }
      
      setSparkles(prev => [...prev, ...staticSparkles]);
    };
    
    // Function to create random sparkles
    const generateSparkles = () => {
      const newSparkles: {id: number, style: React.CSSProperties, type?: string}[] = [];
      const sparkleCount = Math.floor(Math.random() * 5) + 3; // 3-7 sparkles at a time (more sparkles)
      
      for (let i = 0; i < sparkleCount; i++) {
        // Calculate random values for more natural movement
        const randomAngle = Math.random() * Math.PI * 2; // 0 to 2π
        const randomDistance = 70 + Math.random() * 60; // 70 to 130 (closer to profile)
        const tx = Math.cos(randomAngle) * randomDistance;
        const ty = Math.sin(randomAngle) * randomDistance * -1; // Negative to move upwards
        const size = 4 + Math.random() * 12; // 4 to 16px (varied sizes)
        const duration = 2 + Math.random() * 2; // 2 to 4 seconds
        
        // Randomly pick sparkle type
        const sparkleType = Math.random() > 0.7 ? 'star-sparkle' : 'blue-sparkle';
        
        // Different blue shades
        const blueColors = [
          '#3b82f6', // blue-500
          '#2563eb', // blue-600
          '#60a5fa', // blue-400
          '#93c5fd', // blue-300
          '#1d4ed8', // blue-700
          '#dbeafe', // blue-100 (lighter blue)
        ];
        const color = blueColors[Math.floor(Math.random() * blueColors.length)];
        
        newSparkles.push({
          id: Date.now() + i,
          type: sparkleType,
          style: {
            left: `calc(50% + ${tx * 0.6}px)`, // Position relative to center
            top: `calc(50% + ${ty * 0.6}px)`,  // Position relative to center
            width: sparkleType === 'blue-sparkle' ? `${size}px` : undefined,
            height: sparkleType === 'blue-sparkle' ? `${size}px` : undefined,
            opacity: 0,
            animationDuration: `${duration}s`,
            animationDelay: `${Math.random() * 0.5}s`,
            backgroundColor: sparkleType === 'blue-sparkle' ? color : undefined,
            boxShadow: sparkleType === 'blue-sparkle' ? `0 0 ${size/2}px ${color}` : undefined,
            filter: sparkleType === 'blue-sparkle' ? `blur(${1 + Math.random()}px)` : undefined,
            '--tx': `${tx}px`,
            '--ty': `${ty}px`,
            position: 'absolute',  // Absolute positioning
            borderRadius: sparkleType === 'blue-sparkle' ? (Math.random() > 0.7 ? '50%' : Math.random() > 0.5 ? '0%' : '50% 0%') : undefined, // Mix of shapes
            transform: Math.random() > 0.5 ? `rotate(${Math.random() * 45}deg)` : '', // Random rotation
          } as React.CSSProperties,
        });
      }
      
      setSparkles(prev => [...prev, ...newSparkles]);
      
      // Remove old sparkles to prevent too many elements
      setTimeout(() => {
        setSparkles(prev => prev.filter(sparkle => sparkle.id !== newSparkles[0]?.id));
      }, 4000);
    };
    
    // Create some initial sparkles
    createStaticSparkles();
    generateSparkles();
    generateSparkles();
    
    const sparkleInterval = setInterval(generateSparkles, 200);  // More frequent generation
    return () => clearInterval(sparkleInterval);
  }, [isComplete]);

  // Function to create a typing effect
  useEffect(() => {
    let jobTitleTimer: ReturnType<typeof setTimeout>;
    let greetingTimer: ReturnType<typeof setTimeout>;
    let nameTimer: ReturnType<typeof setTimeout>;
    let descriptionTimer: ReturnType<typeof setTimeout>;
    
    // Type job title first
    let i = 0;
    jobTitleTimer = setInterval(() => {
      setJobTitleTyped(jobTitle.substring(0, i));
      i++;
      if (i > jobTitle.length) {
        clearInterval(jobTitleTimer);
        
        // Then type greeting
        let j = 0;
        greetingTimer = setInterval(() => {
          setGreetingTyped(greeting.substring(0, j));
          j++;
          if (j > greeting.length) {
            clearInterval(greetingTimer);
            
            // Then type name
            let k = 0;
            nameTimer = setInterval(() => {
              setNameTyped(name.substring(0, k));
              k++;
              if (k > name.length) {
                clearInterval(nameTimer);
                
                // Finally type description
                let l = 0;
                descriptionTimer = setInterval(() => {
                  setDescriptionTyped(description.substring(0, l));
                  l++;
                  if (l > description.length) {
                    clearInterval(descriptionTimer);
                    setIsComplete(true);
                  }
                }, 30);
              }
            }, 80);
          }
        }, 50);
      }
    }, 50);
    
    // Create blinking cursor effect
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    
    return () => {
      clearInterval(jobTitleTimer);
      clearInterval(greetingTimer);
      clearInterval(nameTimer);
      clearInterval(descriptionTimer);
      clearInterval(cursorInterval);
    };
  }, []);

  // Add styles to the document when component mounts
  useEffect(() => {
    // Create style element
    const styleElement = document.createElement('style');
    styleElement.textContent = avatarStyles;
    document.head.appendChild(styleElement);
    
    // Clean up when component unmounts
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  return (
    <section id="home" className="relative min-h-screen bg-blue-50 dark:bg-gray-900 pt-32 pb-20">
      <div className="container mx-auto px-4 md:px-6 h-full flex flex-col justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="order-2 md:order-1 text-center md:text-left">
            <p className="text-lg md:text-xl text-blue-600 dark:text-blue-400 font-medium mb-3 h-7">
              {jobTitleTyped}
              {!isComplete && jobTitleTyped === jobTitle && <span className={`ml-0.5 text-blue-500 dark:text-blue-300 ${showCursor ? 'opacity-100' : 'opacity-0'}`}>|</span>}
            </p>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4 h-20">
              {greetingTyped}
              <span className="text-blue-600 dark:text-blue-400">{nameTyped}</span>
              {!isComplete && greetingTyped === greeting && nameTyped === name && <span className={`ml-0.5 text-blue-500 dark:text-blue-300 ${showCursor ? 'opacity-100' : 'opacity-0'}`}>|</span>}
            </h1>
            
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 min-h-[4rem]">
              {descriptionTyped}
              {!isComplete && <span className={`ml-0.5 text-gray-500 dark:text-gray-400 ${showCursor ? 'opacity-100' : 'opacity-0'}`}>|</span>}
            </p>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: isComplete ? 1 : 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap gap-4 justify-center md:justify-start"
            >
              <button
                onClick={() => scrollToSection('projects')}
                className="px-8 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
              >
                View My Work
              </button>
              
              <button
                onClick={() => scrollToSection('contact')}
                className="px-8 py-3 rounded-lg bg-transparent border border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 font-medium transition-colors"
              >
                Contact Me
              </button>
            </motion.div>
          </div>
          
          {/* Right - Profile picture with blue sparkles and small fire animation */}
          <div className="order-1 md:order-2 flex justify-center">
            <div className="profile-container relative">
              {/* Blue glow effect */}
              <div className="glow-effect"></div>
              
              {/* Dynamic blue sparkles */}
              {sparkles.map(sparkle => (
                <div 
                  key={sparkle.id} 
                  className={sparkle.type || 'blue-sparkle'}
                  style={sparkle.style}
                ></div>
              ))}
              
              {/* Magic animated avatar */}
              <div className="magic-avatar relative w-64 h-64 md:w-80 md:h-80">
                {/* Small fire accent at bottom */}
                <div className="fire-accent"></div>
                
                <motion.div
                  className="relative w-full h-full rounded-full overflow-hidden border-4 border-blue-600 dark:border-blue-400 cursor-pointer"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 0 25px rgba(59, 130, 246, 0.5)" 
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  {/* Shine effect overlay */}
                  <div className="shine-effect"></div>
                  
                  <img 
                    src={myselfImage} 
                    alt="Ritik Kumar" 
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                
                {/* Background label that stays in place when image scales */}
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 px-6 py-2 rounded-full shadow-lg whitespace-nowrap z-10">
                  <p className="text-gray-900 dark:text-white font-medium">Software Developer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll down button */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: isComplete ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer"
          onClick={() => scrollToSection('about')}
        >
          <p className="text-gray-600 dark:text-gray-300 mb-2">Scroll Down</p>
          <FiArrowDown className="animate-bounce text-blue-600 dark:text-blue-400 w-6 h-6" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero; 