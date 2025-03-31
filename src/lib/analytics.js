// Google Analytics 4 Configuration
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

// Pageview tracking
export const pageview = (url) => {
  if (typeof window.gtag === 'function') {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
      send_page_view: true,
      page_title: document.title,
      page_location: window.location.href,
      page_referrer: document.referrer,
    });
  }
};

// Event tracking
export const event = ({ action, category, label, value, custom_parameters = {} }) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
      ...custom_parameters,
    });
  }
};

// Custom event types
export const AnalyticsEvents = {
  // Navigation events
  PAGE_VIEW: 'page_view',
  NAVIGATION: 'navigation',
  
  // Content interaction events
  BLOG_POST_VIEW: 'blog_post_view',
  PROJECT_VIEW: 'project_view',
  VIDEO_PLAY: 'video_play',
  PODCAST_PLAY: 'podcast_play',
  
  // User interaction events
  BUTTON_CLICK: 'button_click',
  LINK_CLICK: 'link_click',
  FORM_SUBMIT: 'form_submit',
  
  // Search events
  SEARCH: 'search',
  
  // Error events
  ERROR: 'error',
};

// Helper function to track content views
export const trackContentView = (contentType, contentId, contentTitle) => {
  event({
    action: contentType === 'blog' ? AnalyticsEvents.BLOG_POST_VIEW : AnalyticsEvents.PROJECT_VIEW,
    category: 'content',
    label: contentTitle,
    value: contentId,
    custom_parameters: {
      content_type: contentType,
      content_id: contentId,
      content_title: contentTitle,
    },
  });
};

// Helper function to track video plays
export const trackVideoPlay = (videoId, videoTitle, platform) => {
  event({
    action: AnalyticsEvents.VIDEO_PLAY,
    category: 'video',
    label: videoTitle,
    value: videoId,
    custom_parameters: {
      platform,
      video_id: videoId,
      video_title: videoTitle,
    },
  });
};

// Helper function to track podcast plays
export const trackPodcastPlay = (podcastId, podcastTitle, platform) => {
  event({
    action: AnalyticsEvents.PODCAST_PLAY,
    category: 'podcast',
    label: podcastTitle,
    value: podcastId,
    custom_parameters: {
      platform,
      podcast_id: podcastId,
      podcast_title: podcastTitle,
    },
  });
};

// Helper function to track errors
export const trackError = (errorType, errorMessage, errorStack) => {
  event({
    action: AnalyticsEvents.ERROR,
    category: 'error',
    label: errorMessage,
    value: errorType,
    custom_parameters: {
      stack: errorStack,
      error_type: errorType,
      error_message: errorMessage,
    },
  });
}; 