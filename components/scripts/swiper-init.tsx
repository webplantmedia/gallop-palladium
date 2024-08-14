'use client';

import { useEffect, useRef } from 'react';
import Swiper from 'swiper';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
// import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';

const SwiperInit = ({ swiperId }) => {
  const initializedRef = useRef(false);
  const swiperInstanceRef = useRef<Swiper | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (initializedRef.current) return;

    const swiperContainer = document.getElementById(swiperId);

    if (!swiperContainer) return;

    swiperInstanceRef.current = new Swiper(swiperContainer, {
      modules: [Pagination, Autoplay, EffectFade],
      spaceBetween: 30,
      loop: true,
      effect: 'fade', // Use fade effect
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

    initializedRef.current = true;

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
      // Cleanup the observer and destroy the Swiper instance
      observerRef.current?.disconnect();
      // swiperInstanceRef.current?.destroy();
    };
  }, [swiperId]);

  return null;
};

export default SwiperInit;
