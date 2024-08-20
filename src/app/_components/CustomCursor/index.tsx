"use client"

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (!cursor || !follower) return;

    let posX = 0,
        posY = 0,
        mouseX = 0,
        mouseY = 0;

    gsap.to({}, 0.016, {
      repeat: -1,
      onRepeat: function() {
        posX += (mouseX - posX) / 9;
        posY += (mouseY - posY) / 9;
        
        gsap.set(follower, {
          css: {
            left: posX - 12,
            top: posY - 12
          }
        });
        gsap.set(cursor, {
          css: {
            left: mouseX,
            top: mouseY
          }
        });
      }
    });

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    document.addEventListener('mousemove', onMouseMove);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  useEffect(() => {
    const links = document.querySelectorAll('a');
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    links.forEach(link => {
      link.addEventListener('mouseenter', () => {
        cursor?.classList.add('active');
        follower?.classList.add('active');
      });
      link.addEventListener('mouseleave', () => {
        cursor?.classList.remove('active');
        follower?.classList.remove('active');
      });
    });
  }, []);

  return (
    <>
      <div ref={cursorRef} className="cursor"></div>
      <div ref={followerRef} className="cursor-follower"></div>
    </>
  );
};

export default CustomCursor;