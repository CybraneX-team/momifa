"use client"

import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import imageDp from "./media/image.png"

import "./scroll.css"

const IconScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);

  useEffect(() => {
    if (containerRef.current) {
      const images = containerRef.current.querySelectorAll('img');
      const containerWidth = containerRef.current.offsetWidth;
      const imageWidth = containerWidth / 12; // 4 full images + 2 half images
      images.forEach((img) => {
        img.style.width = `${imageWidth}px`;
        img.style.height = 'auto';
      });
    }
  }, []);

  return (
    <div className="icon-scroll-container overflow-hidden w-full">
      <motion.div 
        className="flex icon-scroll" 
        ref={containerRef}
        style={{ x }}
      >
        {[...Array(8)].map((_, index) => (
          <Image 
            key={index}
            src={imageDp}
            alt={`Scrolling Image ${index + 1}`} 
            className="scroll-image flex-shrink-0"
          />
        ))}
      </motion.div>
    </div>
  );
};

export default IconScroll;