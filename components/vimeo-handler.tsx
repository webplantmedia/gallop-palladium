'use client';

import { useEffect } from 'react';
import { useVimeoPlayerScript } from '@hooks';

const VimeoHandler = () => {
  const isVimeoPlayerLoaded = useVimeoPlayerScript();

  useEffect(() => {
    if (!isVimeoPlayerLoaded) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const iframe = entry.target as HTMLIFrameElement;
          const player = new window.Vimeo.Player(iframe);

          if (entry.isIntersecting) {
            player.play();
          } else {
            player.pause();
          }
        });
      },
      {
        threshold: 0.1, // Adjust the threshold as needed
      }
    );
    const iframes = document.querySelectorAll('iframe[src*="vimeo.com"]');

    iframes.forEach((iframe) => {
      observer.observe(iframe);
    });

    return () => {
      iframes.forEach((iframe) => {
        observer.unobserve(iframe);
      });
    };
  }, [isVimeoPlayerLoaded]);

  return <></>;
};

export default VimeoHandler;
