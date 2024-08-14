'use client';

import { useEffect, useRef } from 'react';
import Swiper from 'swiper';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';

const SwiperInit = ({ swiperId }) => {
  const initializedRef = useRef(false);
  const swiperInstanceRef = useRef<Swiper | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (initializedRef.current) return; // Ensure initialization only happens once

    const swiperContainer = document.getElementById(swiperId);

    if (!swiperContainer) return;

    // Initialize Swiper
    swiperInstanceRef.current = new Swiper(swiperContainer, {
      modules: [Pagination, Autoplay, EffectFade],
      spaceBetween: 30,
      loop: true,
      effect: 'fade',
      fadeEffect: { crossFade: true },
      autoplay: {
        delay: 4500,
        pauseOnMouseEnter: false,
        disableOnInteraction: false,
      },
      pagination: {
        el: `#${swiperId} .swiper-pagination`,
        clickable: true,
        renderBullet: (index: number, className: string) => {
          return `<span class="${className}"><span>0${index + 1}</span></span>`;
        },
      },
    });

    // Mark as initialized
    initializedRef.current = true;

    // Setup IntersectionObserver
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            swiperInstanceRef.current?.autoplay.start();
          } else {
            swiperInstanceRef.current?.autoplay.stop();
          }
        });
      },
      {
        threshold: 0.1, // 10% of the swiper container should be visible
      }
    );

    if (swiperContainer) {
      observerRef.current.observe(swiperContainer);
    }

    return () => {
      observerRef.current?.disconnect();
      swiperInstanceRef.current?.destroy();
      initializedRef.current = false;
    };
  }, [swiperId]);

  return null;
};

export default SwiperInit;
