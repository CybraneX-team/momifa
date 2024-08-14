import React from 'react';
import styles from './Card.module.scss';

interface CardProps {
  title: string;
  subtitle: string;
  image: string;
}

const Card: React.FC<CardProps> = ({ title, subtitle, image }) => {
  return (
    <div className={styles.card}>
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p>{subtitle}</p>
    </div>
  );
};

export default Card;