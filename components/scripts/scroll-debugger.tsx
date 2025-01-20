'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export function ScrollDebugger() {
  const pathname = usePathname();

  useEffect(() => {
    console.log('Current scroll position:', window.scrollY);
    console.log('Current pathname:', pathname);
  }, [pathname]);

  return null;
}
