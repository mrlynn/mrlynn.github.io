'use client';

import { useEffect, useRef } from 'react';
import {
  trackBlogPostView,
  trackBlogScrollDepth,
  trackBlogReadComplete,
} from '../../lib/analytics';

const SCROLL_MILESTONES = [25, 50, 75, 90, 100];
const READ_COMPLETE_MIN_SECONDS = 45;
const READ_COMPLETE_MIN_SCROLL = 75;

export default function BlogEngagementTracker({ slug, title }) {
  const firedScrollRef = useRef(new Set());
  const readCompleteFiredRef = useRef(false);
  const startTimeRef = useRef(null);
  const maxScrollRef = useRef(0);

  useEffect(() => {
    if (!slug || !title) {
      return undefined;
    }

    startTimeRef.current = Date.now();
    trackBlogPostView(slug, title);

    const getScrollPercent = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop;
      const scrollHeight = doc.scrollHeight - doc.clientHeight;
      if (scrollHeight <= 0) {
        return 100;
      }
      return Math.min(100, Math.round((scrollTop / scrollHeight) * 100));
    };

    const maybeFireReadComplete = () => {
      if (readCompleteFiredRef.current) {
        return;
      }

      const elapsedSeconds = (Date.now() - startTimeRef.current) / 1000;
      if (
        maxScrollRef.current >= READ_COMPLETE_MIN_SCROLL &&
        elapsedSeconds >= READ_COMPLETE_MIN_SECONDS
      ) {
        readCompleteFiredRef.current = true;
        trackBlogReadComplete(slug, title, {
          scroll_depth: maxScrollRef.current,
          time_on_page_seconds: Math.round(elapsedSeconds),
        });
      }
    };

    const onScroll = () => {
      const percent = getScrollPercent();
      maxScrollRef.current = Math.max(maxScrollRef.current, percent);

      SCROLL_MILESTONES.forEach((milestone) => {
        if (
          percent >= milestone &&
          !firedScrollRef.current.has(milestone)
        ) {
          firedScrollRef.current.add(milestone);
          trackBlogScrollDepth(slug, title, milestone);
        }
      });

      maybeFireReadComplete();
    };

    const interval = window.setInterval(maybeFireReadComplete, 5000);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.clearInterval(interval);
    };
  }, [slug, title]);

  return null;
}
