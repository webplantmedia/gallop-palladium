'use client';

import { useEffect } from 'react';

const SmoothScroll = () => {
  useEffect(() => {
    const handleAnchorClick = (event: MouseEvent) => {
      event.preventDefault(); // Prevent the default anchor behavior
      const anchor = event.currentTarget as HTMLAnchorElement; // Safe type assertion
      const hash = anchor.hash; // Get the hash from the anchor
      const targetElement = document.querySelector(hash);

      if (targetElement) {
        // Smooth scroll to the target element
        window.scrollTo({
          top: targetElement.getBoundingClientRect().top + window.scrollY - 100, // Adjust for fixed header
          behavior: 'smooth',
        });

        // Update the URL hash without reloading the page
        history.pushState(null, '', hash);
      }
    };

    // Select all anchor links inside .main-content
    const links = document.querySelectorAll<HTMLAnchorElement>(
      '.main-content a[href^="#"]:not(.breadcrumbs-popover)'
    );

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
