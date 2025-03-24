'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

declare global {
  interface Window {
    gtag: (
      command: string,
      action: string,
      params?: Record<string, any>
    ) => void;
    dataLayer: Record<string, any>[];
  }
}

export const usePageTracking = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window.gtag === 'function') {
      // Track page view
      window.gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: pathname,
      });
    }
  }, [pathname]);
};
