'use client';

import { useEffect, useRef } from 'react';
import Swiper from 'swiper';
import { Autoplay, Navigation, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
// import 'swiper/css/navigation';

const SwiperCarouselInit = ({ swiperId }: any) => {
  const initializedRef = useRef(false);
  const swiperInstanceRef = useRef<Swiper | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (initializedRef.current) return; // Ensure initialization only happens once

    const swiperContainer = document.getElementById(swiperId);

    if (!swiperContainer) return;

    // Initialize Swiper
    swiperInstanceRef.current = new Swiper(swiperContainer, {
      modules: [Autoplay, Navigation, Keyboard],
      spaceBetween: 20,
      autoHeight: true,
      loop: false,
      autoplay: {
        delay: 3000,
        pauseOnMouseEnter: true,
        disableOnInteraction: true,
      },
      navigation: {
        prevEl: '.swiper-button-prev',
        nextEl: '.swiper-button-next',
      },
      keyboard: {
        enabled: true, // Enable keyboard navigation
        onlyInViewport: true, // Only activate when Swiper is in the viewport
      },
      breakpoints: {
        // When window width is >= 1024px (Desktop)
        1024: {
          slidesPerView: 3,
        },
        // When window width is >= 768px (Tablet)
        768: {
          slidesPerView: 2,
        },
        // When window width is <= 767px (Mobile)
        0: {
          slidesPerView: 1,
        },
      },
      // freeMode: true,
    });

    swiperContainer.classList.remove('!hidden');

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

export default SwiperCarouselInit;
