'use client';

import { motion } from 'framer-motion';
import { ReactNode, Children, isValidElement } from 'react';

interface AnimatedContainerProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  staggerDelay?: number;
}

const AnimatedContainer = ({ 
  children, 
  className = '', 
  delay = 0,
  staggerDelay = 0.1 
}: AnimatedContainerProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay,
        staggerChildren: staggerDelay,
        delayChildren: delay
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {Children.map(children, (child, index) => {
        if (isValidElement(child)) {
          return (
            <motion.div 
              key={index} 
              variants={itemVariants}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {child}
            </motion.div>
          );
        }
        return (
          <motion.div 
            key={index} 
            variants={itemVariants}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {child}
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default AnimatedContainer;
