'use client';

import { useEffect } from 'react';

const SmoothScroll = () => {
  useEffect(() => {
    const handleAnchorClick = (event: MouseEvent) => {
      const target = event.target as HTMLAnchorElement;

      // Check if the clicked element is an anchor with a hash href
      if (target.tagName === 'A' && target.hash) {
        const targetElement = document.querySelector(target.hash);

        if (targetElement) {
          event.preventDefault();

          // Smooth scroll to the target element
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });

          // Update the URL hash without reloading the page
          history.pushState(null, '', target.hash);
        }
      }
    };

    // Select all anchor links inside .main-content
    const links = document.querySelectorAll('.main-content a[href^="#"]');

    // Add event listeners to these links
    links.forEach((link) => {
      link.addEventListener('click', handleAnchorClick);
    });

    return () => {
      // Clean up the event listeners
      links.forEach((link) => {
        link.removeEventListener('click', handleAnchorClick);
      });
    };
  }, []);

  return null; // This component does not render anything
};

export default SmoothScroll;
