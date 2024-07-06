import { useEffect } from 'react';
import { state } from '@state';

// ----------------------------------------------------------------------

export default function useWindowHeight() {
  useEffect(() => {
    function handleResize() {
      const doc = document.documentElement;
      state.windowHeight = window.innerHeight;
      doc.style.setProperty('--app-height', `${state.windowHeight}px`);
    }

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return true;
}
