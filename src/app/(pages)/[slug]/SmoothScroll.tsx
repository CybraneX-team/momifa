'use client';

import { useEffect } from 'react';

export default function SmoothScroll() {
  useEffect(() => {
    const handleSmoothScroll = (event: WheelEvent) => {
      event.preventDefault();
      const delta = event.deltaY;
      window.scrollBy({
        top: delta,
        behavior: 'smooth'
      });
    };

    window.addEventListener('wheel', handleSmoothScroll, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleSmoothScroll);
    };
  }, []);

  return null;
}