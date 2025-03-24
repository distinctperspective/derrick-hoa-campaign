'use client';

// Utility functions for Google Analytics tracking

/**
 * Track a custom event in Google Analytics
 */
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, any>
) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, eventParams);
  }
};

/**
 * Track when a user clicks on a link
 */
export const trackLinkClick = (linkName: string, linkUrl: string) => {
  trackEvent('link_click', {
    link_name: linkName,
    link_url: linkUrl
  });
};

/**
 * Track when a user interacts with a button
 */
export const trackButtonClick = (buttonName: string) => {
  trackEvent('button_click', {
    button_name: buttonName
  });
};

/**
 * Track when a user views a specific section
 */
export const trackSectionView = (sectionName: string) => {
  trackEvent('section_view', {
    section_name: sectionName
  });
};
