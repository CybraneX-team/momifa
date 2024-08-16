"use client"

import React, { useEffect, useRef } from 'react';
import styles from './index.module.scss';

interface FeedbackItem {
  id: number;
  name: string;
  company: string;
  image: string;
  text: string;
}

const feedbackData: FeedbackItem[] = [
  {
    id: 1,
    name: "Michael Johnson",
    company: "CEO, BRIGHTSUN",
    image: "/path-to-image1.jpg",
    text: "Working with Celestial Solutions has been a game-changer for our business. Their tailored strategies and deep expertise in digital marketing have propelled our brand to new heights. Their commitment to transparency and communication has made them a true partner in our success. We couldn't be happier with the results!"
  },
  {
    id: 2,
    name: "S. Power",
    company: "BLUESKY VENTURES",
    image: "/path-to-image2.jpg",
    text: "Another great feedback example here..."
  },
  {
    id: 3,
    name: "S. Power",
    company: "BLUESKY VENTURES",
    image: "/path-to-image2.jpg",
    text: "Another great feedback example here..."
  },
  {
    id: 4,
    name: "S. Power",
    company: "BLUESKY VENTURES",
    image: "/path-to-image2.jpg",
    text: "Another great feedback example here..."
  },
  {
    id: 5,
    name: "S. Power",
    company: "BLUESKY VENTURES",
    image: "/path-to-image2.jpg",
    text: "Another great feedback example here..."
  },
  // Add more feedback items as needed
];

const Feedback: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      const scrollHeight = scrollContainer.scrollHeight;
      let scrollTop = 0;

      const scroll = () => {
        scrollTop += 0.5;
        if (scrollTop >= scrollHeight / 2) {
          scrollTop = 0;
        }
        scrollContainer.style.transform = `translateY(-${scrollTop}px)`;
        requestAnimationFrame(scroll);
      };

      requestAnimationFrame(scroll);
    }
  }, []);

  return (
    <div className={styles.feedbackContainer}>
      <h1 className={styles.backgroundText}>FEEDBACKS</h1>
      <div className={styles.cardWrapper}>
        <div className={styles.cardContainer} ref={scrollRef}>
          {[...feedbackData, ...feedbackData].map((item, index) => (
            <div key={`${item.id}-${index}`} className={styles.card}>
              <div className={styles.cardHeader}>
                <img src={item.image} alt={item.name} className={styles.profilePic} />
                <div className={styles.headerInfo}>
                  <h3 className={styles.name}>{item.name}</h3>
                  <p className={styles.company}>{item.company}</p>
                </div>
              </div>
              <div className={styles.stars}>★★★★★</div>
              <p className={styles.feedbackText}>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feedback;