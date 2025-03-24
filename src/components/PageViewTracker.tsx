'use client';

import { usePageTracking } from '@/hooks/usePageTracking';

export function PageViewTracker() {
  // This hook will track page views as the user navigates
  usePageTracking();
  
  // This component doesn't render anything
  return null;
}
