'use client';

import { useEffect } from 'react';
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

const SwiperInit = ({ swiperId }) => {
  useEffect(() => {
    new Swiper(`#${swiperId}`, {
      modules: [Navigation, Pagination, Autoplay],
      spaceBetween: 30,
      loop: true,
      centeredSlides: false,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      pagination: {
        el: `#${swiperId} .swiper-pagination`,
        clickable: true,
      },
      navigation: {
        nextEl: `#${swiperId} .swiper-button-next`,
        prevEl: `#${swiperId} .swiper-button-prev`,
      },
    });
  }, []);

  return null;
};

export default SwiperInit;
