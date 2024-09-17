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
  const itemRef = useRef(null);
  const isItemInView = useInView(itemRef, { triggerOnce: false, threshold: 0.5 });
  

  return (
    <motion.div 
      className={styles.faqItem}
      ref={itemRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isItemInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className={styles.question}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.02 }}
      >
        <motion.h3
          className={styles.questionText}
          initial={{ width: '100%' }}
          animate={{ width: isOpen ? '90%' : '100%' }}
          transition={{ duration: 0.3 }}
        >
          {question}
        </motion.h3>
        <span className={styles.toggleIcon}>
          {isOpen ? '-' : '+'}
        </span>
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
  const isTitleInView = useInView(titleRef, { triggerOnce: false, threshold: 0.5 });

  const faqData = [
    {
      question: "MOMIFA  Fair Return  Policy",
      answer: "We want you to be completely satisfied with your purchase. If for any reason you're not, we offer a 30-day return policy. Items must be unworn, unwashed, and in their original condition with tags attached. Please refer to our returns page for more details."
    },
    {
      question: "Tracking Your Orders",
      answer: "Once your order has been dispatched, you'll receive a tracking number via email. You can use this number to track your order on our website or the carrier's website."
    },
    {
      question: "Finding Right Size",
      answer: "We provide a detailed size guide on each product page to help you find the perfect fit. If you're unsure, our customer service team is always available to assist you with any sizing questions."
    },
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
          animate={isTitleInView ? "visible" : "hidden"}
          variants={titleVariants}
        >
          Frequently Asked Questions
        </motion.h2>
      </div>
      <div className={styles.WhyMomifaBox} >
        <h1 className={styles.mTXT}>Why MOMIFA </h1>
        <p className={styles.whytext} >Choose MOMIFA for its premium quality clothing that combines trendsetting designs with timeless style, crafted from the finest materials for durability and comfort. We are committed to sustainable fashion, using eco-friendly practices and ethical manufacturing. With versatile collections that cater to all aspects of your lifestyle, MOMIFA ensures you look and feel your best while making a positive impact on the environment.</p>
      </div>
      {faqData.map((item, index) => (
        <FAQItem key={index} question={item.question} answer={item.answer} />
      ))}
    </div>
  );
};

export default FAQ;
