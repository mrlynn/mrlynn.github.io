import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { pageview, event, AnalyticsEvents } from '../lib/analytics';

export const useAnalytics = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Track page views
  useEffect(() => {
    if (pathname) {
      const url = pathname + searchParams.toString();
      pageview(url);
    }
  }, [pathname, searchParams]);

  // Track navigation events
  const trackNavigation = (destination) => {
    event({
      action: AnalyticsEvents.NAVIGATION,
      category: 'navigation',
      label: destination,
    });
  };

  // Track button clicks
  const trackButtonClick = (buttonName, buttonLocation) => {
    event({
      action: AnalyticsEvents.BUTTON_CLICK,
      category: 'interaction',
      label: buttonName,
      value: buttonLocation,
    });
  };

  // Track link clicks
  const trackLinkClick = (linkText, linkUrl) => {
    event({
      action: AnalyticsEvents.LINK_CLICK,
      category: 'interaction',
      label: linkText,
      value: linkUrl,
    });
  };

  // Track form submissions
  const trackFormSubmit = (formName) => {
    event({
      action: AnalyticsEvents.FORM_SUBMIT,
      category: 'form',
      label: formName,
    });
  };

  // Track search queries
  const trackSearch = (searchQuery) => {
    event({
      action: AnalyticsEvents.SEARCH,
      category: 'search',
      label: searchQuery,
    });
  };

  return {
    trackNavigation,
    trackButtonClick,
    trackLinkClick,
    trackFormSubmit,
    trackSearch,
  };
}; 