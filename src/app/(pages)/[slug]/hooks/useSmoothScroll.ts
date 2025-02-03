// hooks/useSmoothScroll.ts
import { useCallback } from 'react';

export const smoothScroll = (target: string | number, offset = 0) => {
  let elementPosition: number;

  if (typeof target === 'string') {
    const element = document.querySelector(target);
    if (!element) return;
    elementPosition = element.getBoundingClientRect().top + window.pageYOffset + offset;
  } else {
    elementPosition = target + offset;
  }

  window.scrollTo({
    top: elementPosition,
    behavior: 'smooth'
  });
};

export const useSmoothScroll = () => {
  const scrollTo = useCallback((target: string | number, offset = 0) => {
    smoothScroll(target, offset);
  }, []);

  return { scrollTo };
};