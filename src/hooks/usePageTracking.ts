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
    if (process.env.NODE_ENV === 'production' && typeof window.gtag === 'function') {
      // Track page view
      window.gtag('config', 'G-29QR8H8K8S', {
        page_path: pathname,
        page_title: document.title,
      });
    }
  }, [pathname]);
};
