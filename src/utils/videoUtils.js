export const getVideoUrl = (videoId, platform = 'youtube') => {
  switch (platform.toLowerCase()) {
    case 'youtube':
      return `https://www.youtube.com/watch?v=${videoId}`;
    case 'tiktok':
      return `https://www.tiktok.com/@fitbodymike/video/${videoId}`;
    case 'vimeo':
      return `https://player.vimeo.com/video/${videoId}`;
    default:
      return `https://www.youtube.com/watch?v=${videoId}`;
  }
};

export const getVideoEmbedUrl = (videoId, platform = 'youtube') => {
  switch (platform.toLowerCase()) {
    case 'youtube':
      return `https://www.youtube.com/embed/${videoId}`;
    case 'vimeo':
      return `https://player.vimeo.com/video/${videoId}`;
    default:
      return `https://www.youtube.com/embed/${videoId}`;
  }
}; 