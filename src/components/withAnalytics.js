'use client';

import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { pageview, event, AnalyticsEvents } from '../lib/analytics';
import { CircularProgress, Box } from '@mui/material';

function AnalyticsWrapper({ children }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Track pageview
    pageview(pathname);

    // Track specific events based on URL
    if (pathname.startsWith('/blog/')) {
      const slug = pathname.split('/').pop();
      event(AnalyticsEvents.BLOG_POST_VIEW, { slug });
    } else if (pathname.startsWith('/podcasts/')) {
      const slug = pathname.split('/').pop();
      event(AnalyticsEvents.PODCAST_VIEW, { slug });
    } else if (pathname.startsWith('/videos/')) {
      const videoId = pathname.split('/').pop();
      event(AnalyticsEvents.VIDEO_VIEW, { videoId });
    }
  }, [pathname, searchParams]);

  return children;
}

export function withAnalytics(WrappedComponent) {
  return function WithAnalyticsComponent(props) {
    return (
      <Suspense fallback={
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress />
        </Box>
      }>
        <AnalyticsWrapper>
          <WrappedComponent {...props} />
        </AnalyticsWrapper>
      </Suspense>
    );
  };
} 