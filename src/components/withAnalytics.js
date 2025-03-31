import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { pageview, event, AnalyticsEvents } from '../lib/analytics';

export const withAnalytics = (WrappedComponent) => {
  return function WithAnalyticsComponent(props) {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
      if (pathname) {
        const url = pathname + searchParams.toString();
        pageview(url);
        
        // Track additional page-specific events
        if (pathname.includes('/blog/')) {
          event({
            action: AnalyticsEvents.BLOG_POST_VIEW,
            category: 'content',
            label: pathname.split('/').pop(),
          });
        } else if (pathname.includes('/podcasts/')) {
          event({
            action: AnalyticsEvents.PROJECT_VIEW,
            category: 'podcast',
            label: pathname.split('/').pop(),
          });
        } else if (pathname.includes('/videos/')) {
          event({
            action: AnalyticsEvents.PROJECT_VIEW,
            category: 'video',
            label: pathname.split('/').pop(),
          });
        }
      }
    }, [pathname, searchParams]);

    return <WrappedComponent {...props} />;
  };
}; 