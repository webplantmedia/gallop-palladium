'use client';

import { useEffect, useRef } from 'react';

const CircleAnimation = ({ id }: any) => {
  const initializedRef = useRef(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (initializedRef.current) return; // Ensure initialization only happens once

    const container = document.getElementById(id);

    if (!container) return;

    // Mark as initialized
    initializedRef.current = true;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            container.classList.add('animate-spin-slow-reverse');
          } else {
            container.classList.remove('animate-spin-slow-reverse');
          }
        });
      },
      { threshold: 0.01 } // Trigger when 50% of the element is visible
    );

    if (container) {
      observerRef.current.observe(container);
    }

    return () => {
      observerRef.current?.disconnect();
      initializedRef.current = false;
    };
  }, [id]);

  return null;
};

export default CircleAnimation;
