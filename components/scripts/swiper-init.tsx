'use client';

import { useEffect } from 'react';
import Swiper from 'swiper';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
// import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';

const SwiperInit = ({ swiperId }) => {
  useEffect(() => {
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
          return `<span class="${className}">0${index + 1}</span>`;
        },
      },
    });
  }, [swiperId]);

  return null;
};

export default SwiperInit;
