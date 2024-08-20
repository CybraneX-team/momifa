"use client"

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import styles from './index.module.scss';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      className={styles.faqItem}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className={styles.question}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.02 }}
      >
        <motion.span 
          className={styles.toggleIcon}
          animate={{ rotate: isOpen ? 45 : 0 }}
        >
          {isOpen ? '-' : '+'}
        </motion.span>
        <motion.h3
          className={styles.questionText}
          initial={{ width: '100%' }}
          animate={{ width: isOpen ? '90%' : '100%' }}
          transition={{ duration: 0.3 }}
        >
          {question}
        </motion.h3>
      </motion.div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.answer}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p>{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQ: React.FC = () => {
    const titleRef = useRef(null);
    const isInView = useInView(titleRef, { once: true, amount: 0.5 });
  
  const faqData = [
    {
      question: "Sample Sample Sample Sample Sample ",
      answer: "sjgcsjfgxmfjdxhcghjbnfgxjrs"
    },
    {
      question: "Sample Sample Sample Sample Sample ",
      answer: "sjgcsjfgxmfjdxhcghjbnfgxjrs"
    },
    {
      question: "Sample Sample Sample Sample Sample ",
      answer: "sjgcsjfgxmfjdxhcghjbnfgxjrs"
    }
  ];

  const titleVariants = {
    hidden: { 
      opacity: 0, 
      y: 50 // Start 50 pixels below its final position
    },
    visible: { 
      opacity: 1, 
      y: 0, // Move to its final position
      transition: { 
        duration: 0.8, 
        ease: "easeOut" 
      } 
    }
  };

  return (
    <div className={styles.faqContainer}>
      <div className={styles.faqTitleContainer} ref={titleRef}>
        <motion.h2 
          className={styles.faqTitle}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={titleVariants}
        >
          Frequently Asked Questions
        </motion.h2>
      </div>
      {faqData.map((item, index) => (
        <FAQItem key={index} question={item.question} answer={item.answer} />
      ))}
    </div>
  );
};

export default FAQ;