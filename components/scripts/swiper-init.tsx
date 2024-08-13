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

  useEffect(() => {
    if (initializedRef.current) return;

    const swiper = new Swiper(`#${swiperId}`, {
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
  }, [swiperId]);

  return null;
};

export default SwiperInit;
