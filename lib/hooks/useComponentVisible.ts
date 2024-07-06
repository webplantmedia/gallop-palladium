import { useState, useEffect, useRef } from 'react';

export default function useComponentVisible(
  initialIsVisible: any,
  handleClose: VoidFunction
) {
  const [isComponentVisible, setIsComponentVisible] =
    useState(initialIsVisible);
  const ref = useRef<any>(null);
  const clickRef = useRef<any>(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current) {
        if (
          !ref.current.contains(event.target) &&
          !clickRef.current.contains(event.target)
        ) {
          setIsComponentVisible(false);
          handleClose();
        }
      }
    };

    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [handleClose]);

  return { ref, clickRef, isComponentVisible, setIsComponentVisible };
}
