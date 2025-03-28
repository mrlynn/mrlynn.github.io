export const cleanImagePath = (src) => {
  if (!src) return '';
  
  // Handle markdown image syntax [path]
  if (src.startsWith('[') && src.endsWith(']')) {
    src = src.slice(1, -1);
  }
  
  // Handle relative paths
  if (src.startsWith('./')) {
    src = src.substring(2);
  }
  
  // Handle absolute paths starting with /
  if (src.startsWith('/')) {
    src = src.substring(1);
  }

  return src;
}; 