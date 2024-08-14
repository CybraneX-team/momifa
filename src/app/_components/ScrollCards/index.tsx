"use client"

import React, { useRef, useEffect, useState } from 'react';
import styles from './ScrollCards.module.scss';

interface Card {
  title: string;
  subtitle: string;
  image: string;
}

interface ScrollCardsProps {
  cards?: Card[];
}

const Card: React.FC<Card> = ({ title, subtitle, image }) => (
  <div className={styles.card}>
    <img src={image} alt={title} />
    <h3>{title}</h3>
    <p>{subtitle}</p>
  </div>
);

const ScrollCards: React.FC<ScrollCardsProps> = ({ cards = [] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const handleWheel = (e: WheelEvent) => {
        if (container.contains(e.target as Node)) {
          e.preventDefault();
          if (e.deltaY > 0 && currentCardIndex < cards.length - 1) {
            setCurrentCardIndex(prev => prev + 1);
          } else if (e.deltaY < 0 && currentCardIndex > 0) {
            setCurrentCardIndex(prev => prev - 1);
          }
        }
      };

      window.addEventListener('wheel', handleWheel, { passive: false });
      return () => window.removeEventListener('wheel', handleWheel);
    }
  }, [currentCardIndex, cards.length]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.transform = `translateX(-${currentCardIndex * 100}%)`;
    }
  }, [currentCardIndex]);

  if (cards.length === 0) {
    return <div>No cards to display</div>;
  }

  return (
    <div className={styles.scrollContainer} ref={containerRef}>
      {cards.map((card, index) => (
        <Card key={index} {...card} />
      ))}
    </div>
  );
};

export default ScrollCards;