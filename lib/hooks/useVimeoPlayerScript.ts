import { useState, useEffect } from 'react';

const useVimeoPlayerScript = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (document.getElementById('vimeo-player-script')) {
      setIsLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.id = 'vimeo-player-script';
    script.src = 'https://player.vimeo.com/api/player.js';
    script.onload = () => setIsLoaded(true);
    document.body.appendChild(script);

    return () => {
      if (document.getElementById('vimeo-player-script')) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return isLoaded;
};

export default useVimeoPlayerScript;
