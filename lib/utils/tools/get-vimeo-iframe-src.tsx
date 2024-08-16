export function getVimeoIframeSrc(vimeoUrl: string): string {
  // Basic URL validation
  if (!vimeoUrl || !vimeoUrl.startsWith('http')) {
    return '';
  }

  let url: URL;

  try {
    url = new URL(vimeoUrl);
  } catch {
    return '';
  }

  // Check if the URL is a valid Vimeo URL
  if (url.hostname !== 'vimeo.com') {
    return '';
  }

  const pathParts = url.pathname.split('/').filter(Boolean);

  // Check if the path has the correct structure
  if (pathParts.length === 0 || !pathParts[0].match(/^\d+$/)) {
    return '';
  }

  // Extract the video ID and hash (if present)
  const videoId = pathParts[0];
  const hash = pathParts[1] || '';

  // Construct the iframe src URL
  let embedUrl = `https://player.vimeo.com/video/${videoId}`;
  if (hash) {
    embedUrl += `?h=${hash}`;
  }

  return embedUrl;
}
