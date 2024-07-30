// hooks/useVimeoInView.js
import { useEffect, useState } from 'react';

const useVimeoInView = () => {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const iframe = entry.target;
          const player = new window.Vimeo.Player(iframe);

          if (entry.isIntersecting) {
            setInView(true);
            player.play();
          } else {
            setInView(false);
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
  }, []);

  return inView;
};

export default useVimeoInView;
