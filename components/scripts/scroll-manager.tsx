'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export function ScrollManager() {
  const pathname = usePathname();

  useEffect(() => {
    // Explicitly prevent scroll
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
