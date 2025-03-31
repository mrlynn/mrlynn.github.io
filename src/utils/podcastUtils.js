const APPLE_PODCAST_API = 'https://itunes.apple.com/lookup';

export const fetchPodcastData = async (feedUrl) => {
  try {
    const response = await fetch(feedUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch podcast feed');
    }
    
    const feedData = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(feedData, 'text/xml');
    
    // Extract podcast info
    const channel = xmlDoc.getElementsByTagName('channel')[0];
    const podcast = {
      title: channel.getElementsByTagName('title')[0]?.textContent || '',
      description: channel.getElementsByTagName('description')[0]?.textContent || '',
      author: channel.getElementsByTagName('itunes:author')[0]?.textContent || '',
      imageUrl: channel.getElementsByTagName('image')[0]?.getElementsByTagName('url')[0]?.textContent || '',
      categories: Array.from(channel.getElementsByTagName('itunes:category')).map(cat => cat.getAttribute('text')),
      language: channel.getElementsByTagName('language')[0]?.textContent || '',
      lastBuildDate: channel.getElementsByTagName('lastBuildDate')[0]?.textContent || '',
    };

    // Extract episodes
    const episodes = Array.from(xmlDoc.getElementsByTagName('item')).map(item => ({
      title: item.getElementsByTagName('title')[0]?.textContent || '',
      description: item.getElementsByTagName('description')[0]?.textContent || '',
      pubDate: item.getElementsByTagName('pubDate')[0]?.textContent || '',
      duration: item.getElementsByTagName('itunes:duration')[0]?.textContent || '',
      audioUrl: item.getElementsByTagName('enclosure')[0]?.getAttribute('url') || '',
      episodeNumber: item.getElementsByTagName('itunes:episode')[0]?.textContent || '',
      seasonNumber: item.getElementsByTagName('itunes:season')[0]?.textContent || '',
      guid: item.getElementsByTagName('guid')[0]?.textContent || '',
      link: item.getElementsByTagName('link')[0]?.textContent || '',
    }));

    return {
      podcast,
      episodes,
    };
  } catch (error) {
    console.error('Error fetching podcast data:', error);
    throw error;
  }
};

const fetchApplePodcast = async (podcastId) => {
  const response = await fetch(`${APPLE_PODCAST_API}?id=${podcastId}&entity=podcast`);
  const data = await response.json();
  
  if (!data.results || data.results.length === 0) {
    throw new Error('Podcast not found');
  }

  const podcast = data.results[0];
  
  // Fetch episodes using the feed URL
  const feedResponse = await fetch(podcast.feedUrl);
  const feedData = await feedResponse.text();
  
  // Parse the XML feed
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(feedData, 'text/xml');
  
  // Extract episodes
  const episodes = Array.from(xmlDoc.getElementsByTagName('item')).map(item => ({
    title: item.getElementsByTagName('title')[0]?.textContent || '',
    description: item.getElementsByTagName('description')[0]?.textContent || '',
    pubDate: item.getElementsByTagName('pubDate')[0]?.textContent || '',
    duration: item.getElementsByTagName('itunes:duration')[0]?.textContent || '',
    audioUrl: item.getElementsByTagName('enclosure')[0]?.getAttribute('url') || '',
    episodeNumber: item.getElementsByTagName('itunes:episode')[0]?.textContent || '',
    seasonNumber: item.getElementsByTagName('itunes:season')[0]?.textContent || '',
  }));

  return {
    podcast: {
      title: podcast.trackName,
      description: podcast.description,
      author: podcast.artistName,
      imageUrl: podcast.artworkUrl600,
      feedUrl: podcast.feedUrl,
      categories: podcast.genres,
      rating: podcast.averageUserRating,
      ratingCount: podcast.userRatingCount,
      platform: 'apple',
    },
    episodes,
  };
};

export const formatDuration = (duration) => {
  if (!duration) return '';
  
  // Convert duration to seconds if it's in HH:MM:SS format
  let seconds = duration;
  if (duration.includes(':')) {
    const [hours, minutes, secs] = duration.split(':').map(Number);
    seconds = hours * 3600 + minutes * 60 + secs;
  }
  
  // Format duration
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
}; 